const display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        if (shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            // Evita colocar mais de um ponto decimal
            if (number === '.' && currentInput.includes('.')) return;
            currentInput += number;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;

    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || ...isNaN(current)) return;

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
        case '%':
            result = (prev * current) / 100;
            break;
        default:
            return;
    }

    currentInput = String(result);
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// Botão ON/C (Limpa tudo)
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// Botão da Setinha (Apaga o último caractere)
function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Funções de memória simuladas para os botões do topo
function memoryAdd() {
    shouldResetDisplay = true;
}
function memorySubtract() {
    shouldResetDisplay = true;
}
function clearMemory() {
    // Apenas pisca ou reseta para simular o MRC
    clearAll();
}
