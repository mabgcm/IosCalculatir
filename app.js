
// Defining Screens

const prevDisp = document.querySelector('.previous-display');
const currDisp = document.querySelector('.current-display');

// Buttons container

const btnContainer = document.querySelector('.buttons-container');

// variable definitions for temporary values
let currOperand = '';
let previousOperand = '';
let operation = '';

let equalOrPercentPressed = false;

// events for button containers
btnContainer.addEventListener('click', (e) => {
  // Clicking event on any number 
  if (e.target.classList.contains('num')) {
    appendNumber(e.target.textContent);
    updateDisplay();
  }

  // Clicking event on any operator (+,-,x,/)
  if (e.target.classList.contains('operator')) {
    chooseOperator(e.target.textContent);
    updateDisplay();
  }
  // Clicking event for = button
  if (e.target.classList.contains('equal')) {
    calculate();
    updateDisplay();
    equalOrPercentPressed = true;
  }

  // Clicking event for AC button
  if (e.target.classList.contains('ac')) {
    previousOperand = '';
    currOperand = '';
    operation = '';
    updateDisplay();
  }

  // Clicking event for PM button
  if (e.target.classList.contains('pm')) {
    if (!currOperand) return;
    currOperand *= -1;
    updateDisplay();
  }

  // Clicing event for percent button
  if (e.target.classList.contains('percent')) {
    if (!currOperand) return;
    currOperand = currOperand / 100;
    updateDisplay();
    equalOrPercentPressed = true;
  }
});

const appendNumber = (num) => {
  // go back if 0 entered before
  if (currOperand === '0' && num === '0') return;

  // Ignore 0 if entered before any number
  // ex: 09 => 9 , 03 => 3 , 0.1 => 0.1
  if (currOperand === '0' && num !== '.') {
    currOperand = num;
    return;
  }

  // return if the previously entered value is .
  if (num === '.' && currOperand.includes('.')) return;

  if (currOperand.length > 10) return;

  if (equalOrPercentPressed) {
    currOperand = num;
    equalOrPercentPressed = false;
    return;
  }
  // Combine the entered numbers
  currOperand += num;
};

const updateDisplay = () => {
  if (currOperand.toString().length > 11) {
    currOperand = Number(currOperand).toExponential(3);
  }
  currDisp.textContent = currOperand;

  // Don't display the operator in the prevDisp secreen
  // without entering any number
  if (operation && previousOperand) {
    prevDisp.textContent = `${previousOperand} ${operation}`;
  } else {
    prevDisp.textContent = '';
  }
};

const chooseOperator = (op) => {
  // execute the operations after the first number
  if (previousOperand) {
    calculate();
  }

  // Variable swapping
  operation = op;
  previousOperand = currOperand;
  currOperand = '';
};

const calculate = () => {
  let calculation = 0;

  const prev = Number(previousOperand);
  const current = Number(currOperand);

  switch (operation) {
    case '+':
      calculation = prev + current;
      break;
    case '-':
      calculation = prev - current;
      break;
    case 'x':
      calculation = prev * current;
      break;
    case '÷':
      calculation = prev / current;
      break;
    default:
      return;
  }

  currOperand = calculation;

  // Deleting the previousOperand and operation on clicking  the = button
  previousOperand = '';
  operation = '';
};
