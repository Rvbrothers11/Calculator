const display = document.getElementById("display");
const calcButtons = document.querySelectorAll(".calculator-keys button");
const viewCalc = document.getElementById("view-calc");
const viewHistory = document.getElementById("view-history");
const viewConvertor = document.getElementById("view-convertor");
const navCalc = document.getElementById("nav-calc");
const navHistory = document.getElementById("nav-history");
const navConvertor = document.getElementById("nav-convertor");
const backspaceButton = document.getElementById("button-backspace");

navCalc.style.display = 'none';


























let equation = '';

calcButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;

        switch (value) {
            case 'AC':
                equation = '';
                updateDisplay('0');
                break;
            
            case '=':
                try {
                    let mathExpression= equation
                        .replace(/×/g, '*')
                        .replace(/÷/g, '/');
                    
                    mathExpression = mathExpression.replace(/%/g, '/100');

                    const result = eval(mathExpression);

                    equation = result.toString();
                    updateDisplay(equation);
                }

                catch (error) {
                    updateDisplay('Error');
                    equation = '';
                }
                break;

            case '±':
                if (equation) {
                    if (equation.startsWith('-')) {
                        equation = equation.substring(1);
                    }
                    
                    else {
                        equation = '-' + equation;
                    }
                    updateDisplay(equation);
                }
                break;
            
            case '()':
                const openParentCount = (equation.match(/\(/g) || []).length;
                const closeParentCount = (equation.match(/\)/g) || []).length;
            
                if (openParentCount > closeParentCount) {
                    equation += ')';
                }
                else {
                    equation += '(';
                }

                updateDisplay(equation);
                break;

            default:
                if (equation === '0' && value !== '.') {
                    equation = value;
                } 
                else {
                    equation += value;
                }   
                updateDisplay(equation);
                break;
        }   
    });
});

function updateDisplay(value) {
    display.innerText = value || '0';
}