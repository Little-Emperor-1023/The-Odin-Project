window.addEventListener("load", () => {
  inputValue();
  displayExplanation();

  let buttonSelector = document.querySelectorAll("button");
  Array.from(buttonSelector)
    .filter((button) => button.value !== "=")
    .forEach((button) => {
      button.addEventListener("click", () => {
        if (button.value === "clear") {
          clearEquation();
        } else if (button.value === "delete") {
          deleteInput();
        } else {
          displayExplanation();
          return;
        }
        displayExplanation();
      });
    });
});

let calculator = {
  currentInput: "0",
  rightOperand: null,
  leftOperand: null,
  currentOperator: null,
  result: null,
  resetDisplay: false,
};

let equation = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    return a - b;
  },
  "*": function (a, b) {
    return a * b;
  },
  "/": function (a, b) {
    if (b == 0) {
      return null;
    }
    return a / b;
  },
};

function inputValue() {
  let numberSelector = document.querySelectorAll(".number");
  let operatorSelector = document.querySelectorAll(".operator");


  Array.from(numberSelector).forEach((number) => {
    number.addEventListener("click", () => {
      const numberValueBuffer = number.value;

      if (calculator.resetDisplay) {
        calculator.currentInput = numberValueBuffer;
        calculator.resetDisplay = false;
      } else {

        if (numberValueBuffer == "." && calculator.currentInput.includes(".")) {
          return;
        }


        if (calculator.currentInput === "0" && numberValueBuffer != ".") {
          calculator.currentInput = numberValueBuffer;
        } else {
          calculator.currentInput += numberValueBuffer;
        }
      }
      displayInputOutput(calculator.currentInput);


      if (!calculator.currentOperator) {
        calculator.leftOperand = calculator.currentInput;

      } else if (calculator.leftOperand && calculator.currentOperator) {
        calculator.rightOperand = calculator.currentInput;
      }

      console.log(number.value);
      value = "=";
    });
  });


  Array.from(operatorSelector).forEach((operator) => {
    operator.addEventListener("click", () => {
      const op = operator.value;
      console.log(op);


      if (calculator.result !== null) {
        calculator.leftOperand = calculator.currentInput;
        calculator.rightOperand = null;
        calculator.currentOperator = null;
        calculator.result = null;
        calculator.resetDisplay = true;
      }

      if (op === "=") {
        const result = calculate(
          calculator.currentOperator,
          calculator.leftOperand,
          calculator.rightOperand
        );
        if (result !== null) {
          calculator.currentInput = result.toString();
          displayInputOutput(calculator.currentInput);

          calculator.leftOperand = calculator.currentInput;
          calculator.rightOperand = null;
          calculator.currentOperator = null;
          calculator.result = result;
          calculator.resetDisplay = true;
        }
      } else {

        if (
          calculator.leftOperand &&
          calculator.currentOperator &&
          calculator.rightOperand
        ) {
          const result = calculate(
            calculator.currentOperator,
            calculator.leftOperand,
            calculator.rightOperand
          );
          console.log(result);
          if (result !== null) {
            calculator.currentInput = result.toString();
            displayInputOutput(calculator.currentInput);
            calculator.leftOperand = calculator.currentInput;
            calculator.rightOperand = null;
          }
        }


        calculator.currentOperator = op;
        calculator.resetDisplay = true;
      }
    });
  });
}

function displayInputOutput(value) {

  let currentInput = document.querySelector(".current__input");

  currentInput.textContent = value;
}

function displayExplanation() {
  let explainInput = document.querySelector(".explain__input");

  if (
    calculator.leftOperand !== null &&
    !calculator.currentOperator &&
    !calculator.rightOperand
  ) {
    explainInput.textContent = calculator.leftOperand;
    console.log(calculator.leftOperand);
  } else if (
    calculator.leftOperand !== null &&
    calculator.currentOperator &&
    !calculator.rightOperand
  ) {
    explainInput.textContent =
      calculator.leftOperand + " " + calculator.currentOperator;
  } else if (
    calculator.leftOperand !== null &&
    calculator.currentOperator &&
    calculator.rightOperand !== null
  ) {
    explainInput.textContent =
      calculator.leftOperand +
      " " +
      calculator.currentOperator +
      " " +
      calculator.rightOperand;
  } else {
    explainInput.textContent = "";
  }
  return;
}

function calculate(operator, leftOperand, rightOperand) {
  if (!operator || leftOperand === null || rightOperand === null) {
    return null;
  }

  const a = parseFloat(leftOperand);
  const b = parseFloat(rightOperand);
  const operation = equation[operator];

  if (typeof operation !== "function") {
    return null; 
  }

  let result = operation(a, b);

  if (result % 1 !== 0) return result.toFixed(3);

  if (result) return result;
  return null;
}

function clearEquation() {
  calculator.leftOperand = null;
  calculator.rightOperand = null;
  calculator.currentOperator = null;
  calculator.result = null;
  calculator.resetDisplay = true;
  calculator.currentInput = "0";
  displayInputOutput(calculator.currentInput);
  displayExplanation();
}

function deleteInput() {
  if (calculator.currentInput.length <= 1) {
    calculator.currentInput = "0";
    if (!calculator.rightOperand) {
      calculator.leftOperand = null;
    } else if (calculator.rightOperand) {
      calculator.rightOperand = null;
    }
    console.log(calculator.currentInput);
  }

  else {
    calculator.currentInput = calculator.currentInput.slice(0, -1);
    if (!calculator.rightOperand) {
      calculator.leftOperand = calculator.currentInput;
    } else if (calculator.rightOperand) {
      calculator.rightOperand = calculator.currentInput;
    }
  }
  displayInputOutput(calculator.currentInput);
  displayExplanation();
}