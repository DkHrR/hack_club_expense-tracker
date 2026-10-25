const form = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const formError = document.getElementById("form-error");

const categoryfilter = document.getElementById("category-filter");
const startDateFilter = document.getElementById("start-date-filter");
const endDateFilter = document.getElementById("end-date-filter");


expenseNameInput.addEventListener("input", function () {
    formError.textContent = "";
});




console.log("javascript is working");
console.log("form found:", form);




const TotalAmount = document.getElementById("total-amount");

let total= 0;
let expenses = JSON.parse(localStorage.getItem("expense")) || [];
let selectedCategory = "All";
let editingIndex= null;

const cancelEditButton = document.getElementById("cancel-edit-button");

cancelEditButton.addEventListener("click", function () {
    editingIndex = null;
    form.reset();

    document.getElementById("submit-button").textContent = "Add Expense";
    cancelEditButton.hidden = true;
});



function saveExpenses() {
    localStorage.setItem("expense", JSON.stringify(expenses));

}



function applyFilters() {
    selectedCategory = categoryfilter.value;
    displayExpenses();
    displaySummary();
    displayMonthlySummary();

}


function displayExpenses() {
        const expenseList = document.getElementById("expense-list");


        expenseList.innerHTML = "";
        total = 0;

        const startDate = startDateFilter.value;
        const endDate = endDateFilter.value;


        const filteredExpenses = expenses
        .map(function (expense, index) {
            return { expense, index };
        })
        .filter(function (item) {
            const expense = item.expense;

            const matchesCategory =
                selectedCategory === "All" ||
                expense.category === selectedCategory;

            const matchesStartDate = 
            startDate === "" || expense.date >= startDate;

            const matchesEndDate =
            endDate === "" || expense.date <= endDate;

            return matchesCategory && matchesStartDate && matchesEndDate;


        });

        filteredExpenses.forEach(function (item) {
            const expense = item.expense;
            const index = item.index;
            total += expense.amount;

            const newExpenseItem = document.createElement("li");
            const formattedDate = expense.date
                ? new Date(expense.date + "T00:00:00").toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"


                })
                : "";

            newExpenseItem.textContent = 
            expense.name + " - ₹" + expense.amount +
            " (" + expense.category + ") - " + 
            (formattedDate ? "-" + formattedDate : "");



            expenseList.appendChild(newExpenseItem);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit-button");

            editButton.addEventListener("click", function () {
                editingIndex = index;
                cancelEditButton.hidden = false;
                document.getElementById("submit-button").textContent = "Update Expense";


                document.getElementById("expense-name").value = expense.name;
                document.getElementById("expense-amount").value = expense.amount;
                document.getElementById("expense-category").value = expense.category;
                document.getElementById("expense-date").value = expense.date || "";


                document.getElementById("expense-name").focus();


            });
            
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.textContent = "Delete";
            

            deleteButton.addEventListener("click", function (){

                expenses.splice(index, 1);

                if (editingIndex === index) {
                    editingIndex = null;
                    form.reset();
                    document.getElementById("submit-button").textContent = "Add Expense";
                    cancelEditButton.hidden = true;

                } else if (editingIndex !== null && editingIndex > index) {
                    editingIndex--;

                }

                saveExpenses();
                displayExpenses();
                displaySummary();
                displayMonthlySummary();

            });
            
            

        

          newExpenseItem.appendChild(editButton);    
          newExpenseItem.appendChild(deleteButton);
    });
    


        TotalAmount.textContent = total.toFixed(2);
    }


    function displayMonthlySummary() {
        const monthlySummary = document.getElementById("monthly-summary");
        monthlySummary.innerHTML = "";

        const monthlyTotals = {};

        expenses.forEach(function (expense) {
            if (!expense.date) {
                return;

            }

            const month = expense.date.slice(0, 7);

            if (monthlyTotals[month] === undefined) {
                monthlyTotals[month] = 0;

            }

            monthlyTotals[month] += Number(expense.amount);

        });

        for (const month in monthlyTotals) {
            const summaryItem = document.createElement("p");

            summaryItem.textContent =
            month + ": ₹" + monthlyTotals[month].toFixed(2);

            monthlySummary.appendChild(summaryItem);

        }

    }

    function displaySummary() {
        const summary = document.getElementById("category-summary");
        summary.innerHTML = "";

        const categoryTotals = {};


        const startDate = startDateFilter.value;
        const endDate = endDateFilter.value;

        const filteredExpenses = expenses.filter(function (expense) {
            const matchesCategory = 
            selectedCategory === "All" || 
            expense.category === selectedCategory;

            const matchesStartDate =
              startDate === "" || expense.date >= startDateFilter.value;

            const matchesEndDate = 
            endDate === "" || expense.date <= endDateFilter.value;

            return matchesCategory && matchesStartDate && matchesEndDate;





        });

        

        filteredExpenses.forEach(function (expense) {

            const category = expense.category || "Other";

            if (categoryTotals[category] === undefined) {
                categoryTotals[category] = 0;
            }

            const amount = Number(expense.amount);
            categoryTotals[category]+= amount;

            console.log("Category", category, "Amount:", amount);
            


        });

        for (const category in categoryTotals) {
            const summaryItem = document.createElement("p");
            summaryItem.textContent = 
            category + ": ₹" + categoryTotals[category].toFixed(2);

            summary.appendChild(summaryItem);

        }
    }


    
function displayCategoryChart() {
    const chart = document.getElementById("category-chart");
    chart.innerHTML = "";

    const categoryTotals = {};

    expenses.forEach(function (expense) {
        const category = expense.category || "Other";
        const amount = Number(expense.amount);

        if (categoryTotals[category] === undefined) {
            categoryTotals[category] = 0;
        }

        categoryTotals[category] += amount;
    });

    const highestTotal = Math.max(...Object.values(categoryTotals));

    for (const category in categoryTotals) {
        const amount = categoryTotals[category];

        const label = document.createElement("p");
        label.textContent = category + ": ₹" + amount.toFixed(2);
        chart.appendChild(label);


       
        const track = document.createElement("div");
        track.style.width = "100%";
        track.style.height = "20px";
        track.style.backgroundColor = "#e0e0e0";
        track.style.borderRadius = "6px";
        track.style.marginBottom = "16px";

        const bar = document.createElement("div");
        bar.style.height = "100%";
        bar.style.width = 
        (highestTotal > 0 ? (amount / highestTotal) * 100 : 0) + "%";
        bar.style.backgroundColor = "#2563eb";
        bar.style.borderRadius = "6px";

        track.appendChild(bar);
        chart.appendChild(track );



    }
}






form.addEventListener("submit", function (event) {
    event.preventDefault();

    

    const expenseName = document.getElementById("expense-name").value;
    if (expenseName.trim() === "") {
        document.getElementById("form-error").textContent =
        "Please enter an expense name.";
        return;
    }

    document.getElementById("form-error").textContent = "";

    const expenseAmount = document.getElementById("expense-amount").value;
    const expensecategory = document.getElementById("expense-category").value;
    const expenseDate = document.getElementById("expense-date").value;

    const amount = Number(expenseAmount);
    
    const expense = {
        name : expenseName,
        amount : amount,
        category : expensecategory,
        date: expenseDate
    };
    

    if (editingIndex !== null) {
        expenses[editingIndex] = expense;
        editingIndex = null;
    } else {
        expenses.push(expense);

    }
    selectedCategory = "All";
    categoryfilter.value = "All";



saveExpenses();
displayExpenses();
displaySummary();
displayMonthlySummary();
displayCategoryChart();

    
    form.reset();
    document.getElementById("submit-button").textContent = "Add Expense";
    cancelEditButton.hidden = true;
    
});

displayExpenses();
displaySummary();
displayMonthlySummary();
displayCategoryChart();




categoryfilter.addEventListener("change", function () {
    selectedCategory = categoryfilter.value;
    displayExpenses();
    displaySummary();
    displayMonthlySummary();
    displayCategoryChart();
    console.log("summary function called");


});

startDateFilter.addEventListener("change", function () {
    displayExpenses();
    displaySummary();
    displayMonthlySummary();
    displayCategoryChart();
});

endDateFilter.addEventListener("change", function () {
    displayExpenses();
    displaySummary();
    displayMonthlySummary();
    displayCategoryChart();
     
    
});




    