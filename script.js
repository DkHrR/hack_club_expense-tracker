const form = document.getElementById("expense-form");

console.log("javascript is working");
console.log("form found:", form);

form.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Form submitted");
});
