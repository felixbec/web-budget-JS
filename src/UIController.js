//UI APP CONTROLLER
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
    }

    var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++){
            callback(list[i], i);
        }
    };

    var formatNumber = function(num, type) {
        var numSplit, int, dec, type;

        //TODOS
        //1. Use 2 Decimal Points
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');
        int = numSplit[0];

        //2. Comma Separating Thousands
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3,3);
        }

        dec = numSplit[1];

        //3. - or + for Income or Expense
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    return {
        getInput: function(){
            return { 
                type : document.querySelector(DOMstrings.inputType).value, //Return either inc or exp
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTMl String with Placebolder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            //Insert new html values into HTML
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
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

        displayBudget: function(obj) {
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome,'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExpenses, 'exp');
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '--%';
            }
        },

        displayPercentages: function(percentages) {
            var fields;

            fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);

            nodeListForEach(fields, function(current, index) {

                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '--%';
                }
            });
            
        },

        displayMonth: function() {
            var now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();

module.exports = UIController;