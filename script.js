let input = document.getElementById("box");
let number = document.querySelectorAll(".numbers div");
let operator = document.querySelectorAll(".operators div");
let result = document.getElementById('result');
let clear = document.getElementById('clear');
let resultShow = false;

//adding a handlers to the numbers button;
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", (e) => {
        let curString = input.innerText;
        let lastString = curString[curString.length - 1];
        if (resultShow === false) {
            input.textContent += e.target.textContent;
        } else if (
            resultShow === true && lastString === "+" ||
            lastString === "-" ||
            lastString === "x" ||
            lastString === "÷"
        ) {
            resultShow = false;
            input.textContent += e.target.textContent;
        } else {
            // if result is currently displayed and user pressed a number
            // we need clear the input string and add the new input to start the new opration
            resultShow= false;
            input.textContent = "";
            input.textContent += e.target.textContent;
        }
    });
}

//adding a handlers to the operators buttons;
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", (e) => {
        let curString = input.innerHTML;
        let lastString = curString[curString.length - 1];
        if (
            lastString === "+" ||
            lastString === "-" ||
            lastString === "x" ||
            lastString === "÷") {
            let newString =
                curString.substring(0, curString.length - 1) + e.target.textContent;
            input.innerHTML = newString;
        } else if (curString.length == 0) {
            prompt("Please Enter a number!");
        } else {
            input.innerHTML += e.target.innerHTML;
        }
    });
}
// adding a handler to the Equal function

result.addEventListener('click', () => {

    // this is the string that we will be processing eg. -10+26+33-56*34/23
    let inputString = input.innerHTML;

    // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    let numbers = inputString.split(/\+|\-|\x|\÷/g);

    // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
    // first we replace all the numbers and dot with empty string and then split
    let operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    // now we are looping through the array and doing one operation at a time.
    // first divide, then multiply, then subtraction and then addition
    // as we move we are alterning the original numbers and operators array
    // the final element remaining in the array will be the output

    let divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    let multiply = operators.indexOf("x");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("x");
    }

    let subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    let add = operators.indexOf("+");
    while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation :)
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; // displaying the output

    resultShow = true; // turning flag if result is displayed
})
//adding a clear button
clear.addEventListener('click', () => {
    input.innerText = "";
})