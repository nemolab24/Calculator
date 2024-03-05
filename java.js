const displayNumbers = document.querySelector(".displayText");
const displayResult = document.querySelector(".calculatorResult");
const numberArray = Array.from(document.querySelectorAll(".number"));
const operandArray = Array.from(document.querySelectorAll(".operand"));
const equalbutton = document.querySelector(".equal");
const periodbutton = document.querySelector(".period");
const backspacebutton = document.querySelector(".backspace");
const clearbutton = document.querySelector(".clear");

let number = [];
const operandOptions = /[\/+\-*]/g;
let operand = [];

function add(numb1, numb2) {
  return +numb1 + +numb2;
}

function subtract(numb1, numb2) {
  return +numb1 - +numb2;
}

function divide(numb1, numb2) {
  if (+numb2 == 0) {
    return new Error("Cannot divide by 0");
  }
  return +numb1 / +numb2;
}

function multiply(numb1, numb2) {
  return +numb1 * +numb2;
}

function operate(operand, numb1, numb2) {
  switch (operand) {
    case "/":
      return divide(numb1, numb2);
    case "*":
      return multiply(numb1, numb2);
    case "+":
      return add(numb1, numb2);
    case "-":
      return subtract(numb1, numb2);
  }
}

function backspace1(element) {
  let currentText = element.innerHTML;
  currentText = currentText.slice(0, -1);
  element.innerHTML = currentText;
}

function checkPeriod() {
  const current = displayNumbers.innerHTML;
  let numberCheck = number[number.length - 1].toString();
  if (current[current.length - 1] !== "." && !numberCheck.includes(".")) {
    return true;
  } else {
    return false;
  }
}

numberArray.forEach((element) => {
  element.addEventListener("click", () => {
    displayNumbers.innerHTML = displayNumbers.innerHTML + element.innerHTML;
  });
});

operandArray.forEach((element) => {
  element.addEventListener("click", () => {
    displayNumbers.innerHTML = displayNumbers.innerHTML + element.innerHTML;

    const allOperands = displayNumbers.innerHTML.match(operandOptions);
    operand = allOperands;
  });
});

clearbutton.addEventListener("click", () => {
  displayNumbers.innerHTML = "";
  displayResult.innerHTML = "";
  number = [];
  operand = [];
});

backspacebutton.addEventListener("click", () => {
  backspace1(displayNumbers);
});

periodbutton.addEventListener("click", () => {
  const emptyArray = [];
  const allNumbers = displayNumbers.innerHTML.split(operandOptions);
  allNumbers.forEach((element) => emptyArray.push(+element));
  number = emptyArray;
  if (checkPeriod()) {
    displayNumbers.innerHTML = displayNumbers.innerHTML + ".";
  }
});
equalbutton.addEventListener("click", () => {
  let inBetweeen = 0;
  const emptyArray = [];
  const allNumbers = displayNumbers.innerHTML.split(operandOptions);
  allNumbers.forEach((element) => emptyArray.push(+element));
  number = emptyArray;
  console.log(number);
  console.log(operand);
  operand.forEach((element) => {
    const counter = operand.indexOf(element);
    inBetweeen += operate(element, number[counter], number[counter + 1]);
  });
  displayResult.innerHTML = inBetweeen;
});
