var UICtrl = require('./UIController');
var budgetCtrl = require('./BudgetController');
/*TODO List
Event Handler -> Checkbox
Get input values 
add the new item to our data structure 
Add the new item to the UI 
Calculate Budget 
Update UI
*/

/*UI Modules 
Get input values 
Add the new item to the UI 

//DATA Modules
add the new item to our data structure 
Calculate Budget 

//CONTROLLER Modules
Update UI*/

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem); 

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    var updateBudget = function(){
        //TODOS
        //1. Calculate the budget
        budgetCtrl.calculateBudget();
        //2. Return the budget
        var budget = budgetCtrl.getBudget();
        //3. Display the updated UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function() {
        //TODOS
        //1. Calc Percentages
        budgetCtrl.calculatePercentages();
        //2. Read Percentages from Budget Controller
        var percentages = budgetCtrl.getPercentages();
        //3. Update Percentages on UI
        UICtrl.displayPercentages(percentages);
    }

    var ctrlAddItem = function(){
        var input, newItem;
        //TODOS
        //1. Get the field input data
        input = UICtrl.getInput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
            //2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            //4. Clear Fields
            UICtrl.clearFields();
        }

        //5. Calc and Update Budget
        updateBudget();
        //6. Calc and update Percentages
        updatePercentages();
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, id;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID) {

            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);

            //1. Delete Item from Data structure
            budgetCtrl.deleteItem(type, id);
            //2. Delete Item from UI
            UICtrl.deleteListItem(itemID);
            //3. Update & show new budget
            updateBudget();
             //4. Calc and update Percentages
            updatePercentages();
        }
    }

    //Public Function that will start app
    return {
        init: function(){
            const resetBudget = {
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentage: 0
            }
            UICtrl.displayMonth();
            UICtrl.displayBudget(resetBudget);
            setupEventListeners();
        }
    }
})(budgetCtrl, UICtrl);


controller.init();