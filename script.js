const numberBtnContainer = document.querySelector(".number-container");
const operatorBtnContainer = document.querySelector(".operator-container");
const display = document.querySelector(".display-container");
let firstOperand = "";
let operator = "";
let secondOperand = "";
let hasResult = false;
let hasOperator = false;

// reset the calculator
function clear() {
  display.style.color = "dimgray";
  display.textContent = "";
  firstOperand = "";
  secondOperand = "";
  operator = "";
  hasResult = false;
  hasOperator = false;
}

// add number depending on the current state of the calculator
function addNumber(number) {
  if (display.textContent.length >= 36) {
    alert("Too much digits!");
  } else {
    if (hasResult) {
      // replace the current result
      clear();
      display.textContent = number;
      firstOperand = String(number);
      hasResult = false;
    } else if (!hasOperator) {
      display.textContent += number;
      firstOperand += String(number);
    } else {
      display.textContent += number;
      secondOperand += String(number);
    }
  }
}

// calculate the result
function equal(first, second, operator) {
  if (isNaN(Number(first)) || isNaN(Number(second))) {
    return "Error";
  }

  if (operator == "+") {
    return Number(first) + Number(second);
  } else if (operator == "-") {
    return Number(first) - Number(second);
  } else if (operator == "x") {
    return Number(first) * Number(second);
  } else if (operator == "/") {
    return Number(first) / Number(second);
  } else {
    return "Error";
  }
}

function equalOperation() {
  display.textContent = equal(firstOperand, secondOperand, operator);
  if (display.textContent === "Error") {
    display.style.color = "red";
  } else {
    display.style.color = "green";
    firstOperand = String(display.textContent);
  }
  operator = "";
  secondOperand = "";
  hasResult = true;
}

// evaluate the operator "+ / - *"
function evaluate(currentOperator) {
  if (hasResult) {
    hasResult = false;
    display.style.color = "dimgray";
  } else if (hasOperator) {
    firstOperand = equal(firstOperand, secondOperand, operator);
    secondOperand = "";
  }
  display.textContent += currentOperator;
  operator = currentOperator;
  hasOperator = true;
}

function calculate(currentOperator) {
  if (display.textContent.length > 18) {
    // break a line
    alert("Too much digits!");
  } else {
    switch (currentOperator) {
      case "AC":
        //TODO
        clear();
        break;
      case "=":
        equalOperation();
        break;
      case "+":
      case "-":
      case "/":
      case "x":
        evaluate(currentOperator);
        break;
      default:
        alert("Invalid operator!");
        break;
    }
  }
}

// input number from button
numberBtnContainer.addEventListener("click", (e) => {
  let number;
  // get the number from the button
  if (e.target.className == "number-btn btn") {
    number = Number(e.target.firstChild.textContent);
  } else if (e.target.parentNode.className == "number-btn btn") {
    number = Number(e.target.textContent);
  }

  // put the number to the display and the CURRENTOPERATION variable
  if (number != null) {
    addNumber(number);
  }
});

// input operator from button
operatorBtnContainer.addEventListener("click", (e) => {
  let currentOperator;
  // get the operator from the button
  if (e.target.className == "operator-btn btn") {
    currentOperator = String(e.target.firstChild.textContent);
  } else if (e.target.parentNode.className == "operator-btn btn") {
    currentOperator = String(e.target.textContent);
  }

  // put the operator to the display and the CURRENTOPERATION variable
  if (currentOperator != null) {
    calculate(currentOperator);
  }
});
