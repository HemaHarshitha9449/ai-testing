let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;
let angleMode = 'deg'; 
let memory = 0; 

function updateDisplay() {
    display.textContent = currentInput;
    updateMemoryIndicator();
}

function updateMemoryIndicator() {
    const memIndicator = document.getElementById('memoryIndicator');
    if (memIndicator) {
        memIndicator.textContent = memory !== 0 ? 'M' : '';
    }
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
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        case 'power': {
            const base = prev;
            const exponent = current;
            if (base < 0 && !Number.isInteger(exponent)) {
                alert('Non-integer power of a negative base is not a real number.');
                clearDisplay();
                return;
            }
            // 0^0 is indeterminate; block it
            if (base === 0 && exponent === 0) {
                alert('0^0 is undefined.');
                clearDisplay();
                return;
            }
            result = Math.pow(base, exponent);
            break;
        }
        case 'nthRoot': {
            const n = prev;
            const x = current;
            if (!isFinite(n)) {
                alert('Root degree must be a finite number.');
                clearDisplay();
                return;
            }
            if (Math.abs(n) < 1e-12) {
                alert('Root degree cannot be zero.');
                clearDisplay();
                return;
            }
            if (x === 0 && n < 0) {
                alert('Cannot take negative-degree root of zero.');
                clearDisplay();
                return;
            }
            if (x < 0) {
                if (Number.isInteger(n) && Math.abs(n % 2) === 1) {
                    // odd integer root of a negative number is negative
                    result = -Math.pow(Math.abs(x), 1 / n);
                } else {
                    alert('Even or non-integeral root of a negative number is not real.');
                    clearDisplay();
                    return;
                }
            } else {
                result = Math.pow(x, 1 / n);
            }
            break;
        }
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

function toRadians(value) {
    return angleMode === 'deg' ? (value * Math.PI) / 180 : value;
}

function calculateSin() {
    const x = parseFloat(currentInput);
    if (isNaN(x)) return;
    const radians = toRadians(x);
    const val = Math.sin(radians);
    currentInput = val.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateCos() {
    const x = parseFloat(currentInput);
    if (isNaN(x)) return;
    const radians = toRadians(x);
    const val = Math.cos(radians);
    currentInput = val.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateTan() {
    const x = parseFloat(currentInput);
    if (isNaN(x)) return;
    const radians = toRadians(x);
    const cosVal = Math.cos(radians);
    if (Math.abs(cosVal) < 1e-12) {
        alert('Tangent is undefined for this angle.');
        return;
    }
    const val = Math.tan(radians);
    currentInput = val.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function toggleAngleMode() {
    angleMode = angleMode === 'deg' ? 'rad' : 'deg';
    const indicator = document.getElementById('angleMode');
    if (indicator) {
        indicator.textContent = angleMode.toUpperCase();
    }
}

function memoryAdd() {
    const x = parseFloat(currentInput);
    if (isNaN(x)) return;
    memory += x;
    updateMemoryIndicator();
}

function memorySubtract() {
    const x = parseFloat(currentInput);
    if (isNaN(x)) return;
    memory -= x;
    updateMemoryIndicator();
}

function memoryRecall() {
    currentInput = memory.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function memoryClear() {
    memory = 0;
    updateMemoryIndicator();
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
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendOperator(event.key);
    } else if (event.key === '^') {
        appendOperator('power');
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
