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

//LOGIC APP CONTROLLER
var budgetController = (function(){
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var allExpenses = [];
    var allIncomes = [];
    var totalExpenses = 0;

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem;
            //Creating new ID
            if( data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Creating new items based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        }
    };
})();

//UI APP CONTROLLER
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }
    return {
        getInput: function(){
            return { 
                type : document.querySelector(DOMstrings.inputType).value, //Return either inc or exp
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value
            }
        },
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTMl String with Placebolder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert new html values into HTML
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();

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
    };

    var ctrlAddItem = function(){
        var input, newItem;
        //TODOS
        //1. Get the field input data
        input = UICtrl.getInput();
        //2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //3. add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        //4. Clear Fields
        UICtrl.clearFields();
        //5. Calculate the budget

        //6. Display the updated UI
    };

    //Public Function that will start app
    return {
        init: function(){
            setupEventListeners();
        }
    }
})(budgetController, UIController);


controller.init();