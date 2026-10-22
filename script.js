const form = document.getElementById("expense-form");

console.log("javascript is working");
console.log("form found:", form);




const TotalAmount = document.getElementById("total-amount");

let total= 0;


form.addEventListener("submit", function (event) {
    event.preventDefault();

    

    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = document.getElementById("expense-amount").value;
    const amount = Number(expenseAmount);
    total += amount;
    TotalAmount.textContent = total.toFixed(2);


    
    console.log("Expense Name:", expenseName);
    console.log("Expense Amount:", expenseAmount);

    const expenseList = document.getElementById("expense-list");
    const expenseitem = document.getElementById("list-item");

    const newExpenseItem = document.createElement("li");
    newExpenseItem.textContent = expenseName + "- ₹" + expenseAmount;
    expenseList.appendChild(newExpenseItem);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    newExpenseItem.appendChild(deleteButton);

    
    form.reset();
});
