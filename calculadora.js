let A = null;
let operator = null;
let B = null;
let shouldResetDisplay = false;
let expression = "";

const display = document.getElementById("display");
const expressionDisplay = document.getElementById("expressionDisplay");
const rightSymbols = ["/", "*", "-", "+", "="];

function handleInput(value) {
    if (rightSymbols.includes(value)) {
        calculate(value);
    } else {
        appendToDisplay(value);
    }
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        display.value = value === "." ? "0." : value;
        shouldResetDisplay = false;
        return;
    }


    if (value === "." && display.value.includes(".")) return;
    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "";
    expressionDisplay.textContent = "";
    clearAll();
}

function clearAll() {
    A = null;
    B = null;
    operator = null;
    shouldResetDisplay = false;
    expression = "";
}

function calculate(value) {
    if (operator !== null) {
        B = display.value;
        let numA = Number(A);
        let numB = Number(B);
        let result;

        if (operator === "/") {
            result = numB === 0 ? "Error" : numA / numB;
        } else if (operator === "*") {
            result = numA * numB;
        } else if (operator === "-") {
            result = numA - numB;
        } else if (operator === "+") {
            result = numA + numB;
        }

        if (result === "Error") {
            display.value = "Error";
            expressionDisplay.textContent = "";
            clearAll();
            expression = "";
            return;
        } else {
            display.value = result;
            A = result.toString(); // Update A to the result for chaining
        }
    } else {
        // If no operator yet, just store current display as A
        A = display.value;
    }

    if (value === "=") {
        // When equals pressed, show final expression and clear operator to stop chaining
        expression += ` ${B} =`;
        expressionDisplay.textContent = expression;
        operator = null;
        expression = "";
        shouldResetDisplay = true;
    } else {
        // Store new operator and prepare for next input
        if (expression === "") {
            expression = A + ` ${value}`;
        } else {
            expression += ` ${B} ${value}`;
        }
        expressionDisplay.textContent = expression;
        operator = value;
        shouldResetDisplay = true;
    }
}

