const form = document.getElementById("expense-form");

console.log("javascript is working");
console.log("form found:", form);




const TotalAmount = document.getElementById("total-amount");

let total= 0;
let expenses = JSON.parse(localStorage.getItem("expense")) || [];

function saveExpenses() {
    localStorage.setItem("expense", JSON.stringify(expenses));

}





function displayExpenses() {
        const expenseList = document.getElementById("expense-list");


        expenseList.innerHTML = "";
        total = 0;

        expenses.forEach(function (expense , index) {
            total += expense.amount;

            const newExpenseItem = document.createElement("li");
            newExpenseItem.textContent = expense.name + "- ₹" + expense.amount;

            expenseList.appendChild(newExpenseItem);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function (){

            expenses.splice(index , 1);
            saveExpenses();
            displayExpenses();
            

        });

    newExpenseItem.appendChild(deleteButton);
    });
    


        TotalAmount.textContent = total.toFixed(2);
    }



form.addEventListener("submit", function (event) {
    event.preventDefault();

    

    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = document.getElementById("expense-amount").value;
    const amount = Number(expenseAmount);
    total += amount;
    TotalAmount.textContent = total.toFixed(2);
    const expense = {
        name : expenseName,
        amount : amount
    };

    expenses.push(expense);
    localStorage.setItem("expense", JSON.stringify(expenses));

    

                
    console.log("Expense Name:", expenseName);
    console.log("Expense Amount:", expenseAmount);

saveExpenses();
displayExpenses();


    
    form.reset();
});

displayExpenses();

