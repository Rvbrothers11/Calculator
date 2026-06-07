const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let equation = '';

buttons.forEach(button => {
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
        }
    })
})