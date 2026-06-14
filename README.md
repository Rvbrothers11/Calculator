Advanced Web Calculator

<img width="447" height="558" alt="image" src="https://github.com/user-attachments/assets/ff16f3e4-9112-4a38-82c4-35e091453400" />
<img width="377" height="515" alt="image" src="https://github.com/user-attachments/assets/816eff98-4ce2-488f-9218-437d35edf446" />
<img width="360" height="460" alt="image" src="https://github.com/user-attachments/assets/30860df5-4268-4f99-9a2a-760e2fd534f7" />



A powerful, all-in-one calculator built directly for your web browser. This project was built for **#horizons**! 

What my calculator Does
This isn't just a standard calculator. It is a multi-tool designed to handle everyday math, complex equations, and real-world conversions all in one sleek interface. 

It includes four main modes:
1. **Standard Calculator:** For quick, everyday math.
2. **Scientific Mode:** Expands the grid to include advanced trigonometry (with a DEG/RAD toggle), logarithms, exponents, and absolute values.
3. **Unit Convertor:** Instantly converts length, temperature, area, volume, mass, data, speed, and time.
4. **Tip Calculator:** Easily calculate tips and split the bill among friends.

**Bonus Features:**
* **Dark & Light Mode:** Toggle between themes for day or night use.
* **Persistent Memory:** Your theme preference and math history are saved directly to your browser, so they are always there when you come back.

**How to Use It**
Because this is built with pure web technologies, you don't need to install anything to run it!

**To use it locally:**
1. Clone or download this repository to your computer.
2. Double-click the `index.html` file to open it in any modern web browser (Chrome, Safari, Firefox, etc.).
3. Start calculating!

To use the site (link):
https://calculator-mu-brown-78.vercel.app/

**How It Works**
This project is built from scratch using the core languages of the web:
* **HTML:** Structures the different views (Calculator, History, Convertor, Tip).
* **CSS:** Uses **CSS Grid** to create a flawless, responsive button layout. The Grid dynamically adapts from 4 columns to 5 columns when switching into Scientific Mode.
* **JavaScript:** The brain of the app. It handles the mathematical logic, intercepts trigonometry functions to accurately calculate Radians vs. Degrees, and uses the browser's `localStorage` API to save your history and theme preferences.
