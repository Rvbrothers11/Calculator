const display = document.getElementById("display");
const calcButtons = document.querySelectorAll(".calculator-keys button");
const viewCalc = document.getElementById("view-calc");
const viewHistory = document.getElementById("view-history");
const viewConvertor = document.getElementById("view-convertor");
const navCalc = document.getElementById("nav-calc");
const navHistory = document.getElementById("nav-history");
const navConvertor = document.getElementById("nav-convertor");
const backspaceButton = document.getElementById("button-backspace");

const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const viewTip = document.getElementById("view-tip");
const navTip = document.getElementById("nav-tip");

const savedTheme = localStorage.getItem('calculator_theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';

        localStorage.setItem('calculator_theme', 'light');

    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';

        localStorage.setItem('calculator_theme', 'dark');
    }
});

navCalc.style.display = 'none';

function showView(viewToShow) {
    viewCalc.classList.remove('active');
    viewHistory.classList.remove('active');
    viewConvertor.classList.remove('active');
    viewTip.classList.remove('active');

    viewCalc.style.display = 'none';
    viewHistory.style.display = 'none';
    viewConvertor.style.display = 'none';
    viewTip.style.display = 'none';

    viewToShow.style.display = 'flex';
    viewToShow.classList.add('active');

    if (viewToShow === viewCalc) {
        navCalc.style.display = 'none';
        display.style.display = 'block';
    } else {
        navCalc.style.display = 'block';
        display.style.display = 'none';
    }
}

navCalc.addEventListener('click', (e) => { 
    e.preventDefault(); 
    showView(viewCalc);
});

navHistory.addEventListener('click', (e) => {
    e.preventDefault();
    showView(viewHistory);
});

navConvertor.addEventListener('click', (e) => {
    e.preventDefault();
    showView(viewConvertor);
});

navTip.addEventListener('click', (e) => {
    e.preventDefault();
    showView(viewTip);
});

showView(viewCalc);

let historyArray = [];
const historyList = document.getElementById('history-list');

const savedHistory = localStorage.getItem('calculator_history');

if (savedHistory) {
    historyArray = JSON.parse(savedHistory);

    historyArray.forEach(entry => {
        const li = document.createElement('li');
        li.innerText = entry;
        historyList.appendChild(li);
    });
}

function addToHistory(calcString, result) {
    const prettyString = calcString.replace(/\*/g, 'x').replace(/\//g, '+');
    const entry = `${prettyString} = ${result}`;

    historyArray.unshift(entry);

    const li = document.createElement('li');
    li.innerText = entry;
    historyList.prepend(li);

    localStorage.setItem('calculator_history', JSON.stringify(historyArray));
}

document.getElementById('clear-history').addEventListener('click', () => {
    historyArray = [];
    historyList.innerHTML = '';

    localStorage.removeItem('calculator_history');
});

let equation = '';

function processMath(value) {
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
            case '+/-':
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
}

calcButtons.forEach(button =>{
    button.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('button');
        if (!targetBtn) return;
        const value = targetBtn.value || targetBtn.innerText;

        processMath(value);
    });
});

function handleBackspace() {
    if (equation.length > 1) {
        equation = equation.slice(0, -1);
    } else {
        equation = '';
        updateDisplay('0');
        return;
    }
    updateDisplay(equation);
}
    
backspaceButton.addEventListener('click', (e) => {
    e.preventDefault();
    handleBackspace();
});


document.addEventListener('keydown', (e) => {
    if (!viewCalc.classList.contains('active')) return;
    const key= e.key;

    if (key === 'Enter' || key === 'Backspace') {
        e.preventDefault();
    }

    if (/[0-9\.\+\-\%\(\)]/.test(key)) {
        processMath(key);
    }

    else if (key === '*') {processMath('*');}
    else if (key === '/') {processMath('/');}
    else if (key === 'Enter') {processMath('=');}
    else if (key === 'Escape') {processMath('AC');}
    else if (key === 'Backspace') {handleBackspace();}
});

function updateDisplay(value) {
    display.innerText = value || '0';
}

const fromSelect = document.getElementById('convertor-from');
const toSelect = document.getElementById('convertor-to');
const inputField = document.getElementById('convertor-input');
const outputField = document.getElementById('convertor-output');
const categoryButtons = document.querySelectorAll('.category-btn')

let currentCategory = 'length';

const conversionData = {
    length: { Meters: 1, Kilometers: 0.001, Centimeters: 100, Millimeters: 1000, Miles: 0.000621371, Yards: 1.09361, Feet: 3.28084, Inches: 39.3701 },
    temperature: { Celsius: 'special', Fahrenheit: 'special', Kelvin: 'special'},
    area: {"Sq Meters": 1, "Sq Kilometers": 0.000001, Hectares: 0.0001, Acres: 0.000247105, "Sq Miles": 3.861e-7, "Sq Feet": 10.7639 },
    volume: { Liters: 1, Milliliters: 1000, "Cubic Meters": 0.001, "US Gallons": 0.264172, "US Quarts": 1.05669, "US Pints": 2.11338, "US Cups": 4.22675, "Fluid Ounces": 33.814 },
    mass: { Grams: 1, Kilograms: 0.001, Milligrams: 1000, "Metric Tons": 0.000001, Pounds: 0.00220462, Ounces: 0.035274 },
    data: { Bytes: 1, Kilobytes: 1 / 1024, Megabytes: 1 / 1048576, Gigabytes: 1 / 1073741824, Terabytes: 1 / 1099511627776},
    speed: { "Meters/sec": 1, "Kilometers/hour": 3.6, "Miles/hour": 2.23694, Knots: 1.94384 },
    time: { Seconds: 1, Minutes: 1 / 60, Hours: 1 / 3600, Days: 1 / 86400, Weeks: 1 / 604800, Years: 1 / 31536000 }
};

categoryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-category');
        populateUnits();
    });
});

function populateUnits() {
    const units = Object.keys(conversionData[currentCategory]);

    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    units.forEach(unit => {
        fromSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        toSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    });

    if(units.length > 1) {
        toSelect.selectedIndex = 1;
    }

    calculateConversion();
}

function calculateConversion() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const val = parseFloat(inputField.value);

    if (isNaN(val)) {
        outputField.value = "";
        return;
    }

    if (currentCategory === 'temperature') {
        let celsiusVal; 

        if (from === 'Celsius') celsiusVal = val;
        else if (from === 'Fahrenheit') celsiusVal = (val - 32) * 5/9;
        else if (from === 'Kelvin') celsiusVal = val - 273.15;

        let result;
        if (to === 'Celsius') result = celsiusVal;
        else if (to === 'Fahrenheit') result = (celsiusVal * 9/5) + 32;
        else if (to === 'Kelvin') result = celsiusVal + 273.15;

        outputField.value = Math.round(result * 10000) / 10000;
    
    } else {
        const baseVal = val / conversionData[currentCategory][from];
        let result = baseVal * conversionData[currentCategory][to];

        result = parseFloat(result.toFixed(6));
        outputField.value = result;
    }
}

fromSelect.addEventListener('change', calculateConversion);
toSelect.addEventListener('change', calculateConversion);
inputField.addEventListener('input', calculateConversion);

populateUnits();

const billInput = document.getElementById('bill-input');
const tipSlider = document.getElementById('tip-slider');
const tipPercentDisplay = document.getElementById('tip-percent-display');
const splitMinus = document.getElementById('split-minus');
const splitPlus = document.getElementById('split-plus');
const splitCountDisplay = document.getElementById('split-count');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalPerPersonDisplay = document.getElementById('total-per-person');

let splitCount = 1;

function calculateTip() {
    const bill = parseFloat(billInput.value);
    const tipPercent = parseInt(tipSlider.value);

    tipPercentDisplay.innerText = tipPercent;

    if (isNaN(bill) || bill <= 0) {
        tipAmountDisplay.innerText = "$0.00";
        totalPerPersonDisplay.innerText = "$0.00";
        return;
    }

    const totalTip = bill * (tipPercent / 100);
    const totalBill = bill + totalTip;
    const tipPerPerson = totalTip / splitCount;
    const totalPerPerson = totalBill / splitCount;

    tipAmountDisplay.innerText = "$" + tipPerPerson.toFixed(2);
    totalPerPersonDisplay.innerText = "$" + totalPerPerson.toFixed(2);
}

splitMinus.addEventListener('click', (e) => {
    e.preventDefault();
    if (splitCount > 1) {
        splitCount--;
        splitCountDisplay.innerText = splitCount;
        calculateTip();
    }
});

splitPlus.addEventListener('click', (e) => {
    e.preventDefault();
    splitCount++;
    splitCountDisplay.innerText = splitCount;
    calculateTip();
});

billInput.addEventListener('input', calculateTip);
tipSlider.addEventListener('input', calculateTip);
