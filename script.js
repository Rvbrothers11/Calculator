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

function showView(viewToShow) {
    viewCalc.classList.remove('active');
    viewHistory.classList.remove('active');
    viewConvertor.classList.remove('active');

    viewCalc.style.display = 'none';
    viewHistory.style.display = 'none';
    viewConvertor.style.display = 'none';

    viewToShow.style.display = 'flex';
    viewToShow.classList.add('active');

    if (viewToShow === viewCalc) {
        navCalc.style.display = 'none';
    } else {
        navCalc.style.display = 'block';
    }
}

navCalc.addEventListener('click', (e) => { 
    e.preventDefault(); 
    showView(viewCalc);
})

navHistory.addEventListener('click', (e) => {
    e.preventDefault();
    showView(viewHistory);
})

navConvertor.addEventListener('click', (e) => {
    e.preventDefault();
    showView(viewConvertor);
})

showView(viewCalc);

let historyArray = [];
const historyList = document.getElementById('history-list');

function addToHistory(calcString, result) {
    const prettyString = calcString.replace(/\*/g, 'x').replace(/\//g, '+');
    const entry = `${prettyString} = ${result}`;

    historyArray.unshift(entry);

    const li = document.createElement('li');
    li.innerText = entry;
    historyList.prepend(li);
}

document.getElementById('clear-history').addEventListener('click', () => {
    historyArray = [];
    historyList.innerHTML = '';
});

let equation = '';

calcButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.closest('button').value || e.target.closest('button').innerText;

        switch (value) {
            case 'all-clear':
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

                    addToHistory(equation, result);

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

backspaceButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (equation.length > 1) {
        equation = equation.slice(0, -1);
    } else {
        equation = '';
        updateDisplay('0');
        return;
    }
    updateDisplay(equation);
});

function updateDisplay(value) {
    display.innerText = value || '0';
}

const fromSelect = document.getElementById('convertor-from');
const toSelect = document.getElementById('convertor-to');
const inputField = document.getElementById('convertor-input');
const outputField = document.getElementById('convertor-output');
const categoryButtons = document.querySelectorAll('.category-button')

let currentCategory = 'length';

const conversionData = {
    length: { Meters: 1, Kilometers: 0.001, Centimeters: 100, Millimeters: 1000, Miles: 0.000621371, Yards: 1.09361, Feet: 3.28084, Inches: 39.3701 },
    temperature: { Celcius: 'special', Fahrenheit: 'special', Kelvin: 'special'},
    area: {"Sq Meters": 1, "Sq Kilometers": 0.000001, Hectares: 0.0001, Acres: 0.000247105, "Sq Miles": 3.861e-7, "Sq Feet": 10.7639 },
    volume: { Liters: 1, Milliliters: 1000, "Cubic Meters": 0.001, "US Gallons": 0.264172, "US Quartz": 1.05669, "US Pints": 2.11338, "US Cups": 4.22675, "Fluid Ounces": 33.814 },
    mass: { Grams: 1, Kilograms: 0.001, Milligrams: 1000, "Metric Tons": 0.000001, Pounds: 0.00220462, Ounces: 0.035274 },
    data: { Bytes: 1, Kilobytes: 1 / 1024, Megabytes: 1 / 1048576, Gigabytes: 1 / 10737}
    speed: { "Meters/sec": 1, "Kilometers/hour": 3.6, "Miles/hour": 2.23694, Knots: 1.94384 },
    time: { Seconds: 1, Minutes: 1 / 60, Hours: 1 / 3600, Days: 1 / 86400, Weeks: 1 / 604800, Years: 1 / 31536000 }
};

