let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            if (number === '.' && currentInput.includes('.')) {
                return;
            }
            currentInput += number;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== '' && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === '' || shouldResetDisplay) {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    switch (operator) {
        case 'Add':
            result = prev + current;
            break;
        case 'Sub':
            result = prev - current;
            break;
        case 'Mul':
            result = prev * current;
            break;
        case 'Div':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteChar() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculateSquareRoot() {
    const current = parseFloat(currentInput);

    if (isNaN(current)) {
        return;
    }

    if (current < 0) {
        alert('Cannot calculate square root of negative number!');
        return;
    }

    currentInput = Math.sqrt(current).toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateLog() {
    const current = parseFloat(currentInput);

    if (isNaN(current)) {
        return;
    }

    if (current <= 0) {
        alert('Cannot calculate logarithm of zero or negative number!');
        return;
    }

    currentInput = Math.log10(current).toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function insertPi() {
    currentInput = Math.PI.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function insertE() {
    currentInput = Math.E.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateFactorial() {
    const current = parseFloat(currentInput);

    if (isNaN(current)) {
        return;
    }

    if (current < 0) {
        alert('Cannot calculate factorial of negative number!');
        return;
    }

    if (current !== Math.floor(current)) {
        alert('Factorial only works with whole numbers!');
        return;
    }

    if (current > 170) {
        alert('Number too large for factorial calculation!');
        return;
    }

    let result = 1;
    for (let i = 2; i <= current; i++) {
        result *= i;
    }

    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendNumber('.');
    } else if (event.key === 'Add' || event.key === 'Sub' || event.key === 'Mul' || event.key === 'Div') {
        appendOperator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        event.preventDefault();
        deleteChar();
    }
});
