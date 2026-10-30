<div align="center">

# Invoicy

**A modern, lightweight, and intuitive invoice generator web application built with React.**

Create itemized invoices, calculate taxes and discounts on the fly, preview in real time, and download crisp PDF invoices instantly.

[![React](https://img.shields.io/badge/React-17.0.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1.0-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

</div>

---

## ✨ Features

- **Dynamic Itemized Billing**: Add, edit, and delete multiple line items with custom descriptions, unit prices, and quantities.
- **Real-Time Calculations**: Automatic calculation of subtotal, tax amounts, discount deductions, and grand total.
- **Multi-Currency Support**: Switch effortlessly between major global currencies (USD, GBP, EUR, JPY, CAD, AUD, SGD, CNY, BTC).
- **Comprehensive Invoice Details**:
  - Custom invoice numbers
  - Issue dates and due dates
  - Sender ("Bill From") and Client ("Bill To") contact info (name, email, address)
  - Custom notes and payment terms
- **Live Modal Preview**: Inspect the fully formatted invoice before exporting.
- **One-Click PDF Export**: High-quality client-side PDF rendering powered by `html2canvas` and `jsPDF`.
- **Responsive & Clean UI**: Styled with React-Bootstrap and custom modern UI enhancements.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (Create React App)
- **Styling & UI**: [React-Bootstrap](https://react-bootstrap.github.io/) / [Bootstrap 5](https://getbootstrap.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)

---

## 📂 Project Structure

```text
invoicy/
├── public/
│   ├── index.html        # HTML template & metadata
│   └── manifest.json     # Web app manifest
├── src/
│   ├── components/
│   │   ├── EditableField.js  # Reusable inline editable input
│   │   ├── InvoiceForm.js    # Main form logic, state & calculations
│   │   ├── InvoiceItem.js    # Dynamic line items table
│   │   └── InvoiceModal.js   # Preview modal & PDF capture
│   ├── App.js            # App container
│   ├── App.css           # Custom styling
│   └── index.js          # React entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) and npm installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd invoicy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## 📦 Production Build

To build the project for production deployment:

```bash
npm run build
```

The optimized static assets will be generated in the `build/` folder, ready to deploy to services like Vercel, Netlify, or GitHub Pages.

---

## 💡 How to Use

1. **Fill in the Details**: Enter invoice metadata (number, dates), sender details, and client details.
2. **Add Products / Services**: Use the **"Add Item"** button to insert invoice lines with names, descriptions, unit rates, and quantities.
3. **Set Taxes & Discounts**: Enter any tax or discount percentages on the right sidebar; totals update automatically.
4. **Choose Currency**: Select your preferred currency from the dropdown.
5. **Review & Download**: Click **"Review Invoice"** to preview your formatted invoice, then hit **"Download Copy"** to save it as a PDF.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
