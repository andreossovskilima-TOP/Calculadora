const display = document.getElementById('display');

// Adiciona números ao visor
function appendNumber(number) {
    // Evita ter mais de um ponto decimal seguido
    if (number === '.' && display.value.includes('.')) {
        // Permite ponto se houver um operador antes dele
        const lastChar = display.value.slice(-1);
        if (!isNaN(lastChar)) {
            const parts = display.value.split(/[\+\-\*\/]/);
            if (parts[parts.length - 1].includes('.')) return;
        }
    }
    display.value += number;
}

// Adiciona operadores ao visor
function appendOperator(operator) {
    if (display.value === '') return;
    
    const lastChar = display.value.slice(-1);
    // Se o último caractere já for um operador, substitui pelo novo
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

// Limpa todo o visor
function clearDisplay() {
    display.value = '';
}

// Apaga o último caractere (Backspace)
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Executa o cálculo matemático
function calculate() {
    try {
        // eval() calcula a string matemática diretamente (ex: "2+5*3")
        if (display.value !== '') {
            display.value = eval(display.value);
        }
    } catch (error) {
        display.value = 'Erro';
    }
}
