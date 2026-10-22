const form = document.getElementById("expense-form");

console.log("javascript is working");
console.log("form found:", form);

form.addEventListener("submit", function (event) {
    event.preventDefault();

    

    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = document.getElementById("expense-amount").value;
    
    console.log("Expense Name:", expenseName);
    console.log("Expense Amount:", expenseAmount);

    const expenseList = document.getElementById("expense-list");
    const expenseitem = document.getElementById("list-item");

    const newExpenseItem = document.createElement("li");
    newExpenseItem.textContent = expenseName;

    


});
