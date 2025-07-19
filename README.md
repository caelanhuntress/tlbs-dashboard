# Tlbs Dashboard

Tlbs Dashboard is a simple web application for tracking sales and delivery for workshops, coaching, and speaking. It logs each sale and delivery event, stores them in a database, and displays trends with interactive charts.

## Tech Stack

- **Frontend**
  - React (v18 or later)
  - Chart.js (for data visualization)
  - JavaScript (ES6+)
  - CSS (or styled-components, if used)
- **Backend**
  - Node.js (v18 or later)
  - Express.js
- **Database & Authentication**
  - Firebase (for cloud database and authentication)
    - Firestore (real-time database)
    - Firebase Authentication
- **Package Management**
  - Yarn or npm
- **Other**
  - dotenv (for managing environment variables)
  - CORS (if API is accessed by the frontend)
  - body-parser (Express middleware for JSON)
- **Development Tools**
  - Git & GitHub
  - Visual Studio Code or any code editor

## Features

- **Sales Logging** – User manually records a dollar amount for sales made on a specific date.
- **Delivery Logging** – User manually records value of service delivery on specific dates.
- **Interface** – The UI is a calendar layout, with entry fields and totals for Sales and Delivery. A dropdown next to each item lets the user assign a Category.
- **Categories** – Each entry of both Sales and Delivery can be attributed to Training, Coaching, or Speaking.
- **Visualization** – Charts show daily and weekly totals over time, so you can quickly gauge performance. A visual dashboard also shows sales by category, delivery by category, monthly totals, and 12-month running rates.

## Setup

The dashboard is built with **Node.js** and **Express** for the backend and uses **React** with **Chart.js** for the frontend. **Firebase** is used for cloud database and authentication. To run it locally you need Node.js (v18 or later).

```bash
# Install dependencies
yarn install  # or `npm install`

# Start the development server
yarn start    # or `npm start`
```

These commands assume a typical structure with a server folder and a client folder. After starting, open `http://localhost:3000` in your browser to use the dashboard.

## Basic Usage

1. The homepage interface is a calendar layout for the current month. Navigation arrows and a dropdown let you toggle between different months.
2. Each date has a green number (Sales) and a red number (Delivery) as well as two fields, stacked vertically. The placeholder text of the first field says 'Amount Sold' and the second says 'Amount Delivered'.
3. When a number is entered in one of these fields, a dropdown displays Training, Coaching, and Speaking as options.
4. Selecting a category will add the number, date, and category to the database.
5. The colored number will update to reflect the total number of Sales and Delivery for that day.
6. Next to the calendar is a Weekly column that displays the total Sales and Delivery for the week.
7. Above the calendar, on the left side of the Month title, are two fillable fields for Sales Goal and Delivery Goal. These can be edited anytime, and do not contribute to the backend database.
8. Above the calendar, to the right of the Month title, are two numbers: one Green for Sales Total, calculating the total of all entered sales for the month, and one Red for Delivery Total, displaying the total deliveries for the month.
9. A Data page displays all entries in a simple table, and is manually editable. Entries are sorted chronologically, starting with the latest entry and descending backwards.
10. A Dashboard page displays multiple charts and tables, including:
11. Monthly Sales Totals
12. Monthly Delivery Totals
13. Pie chart for each Category, and two dropdowns—one showing date range, and one showing Sales or Delivery—will dynamically update the pie chart.
14. Last 12 Months chart for Sales, displaying monthly sales data by category, and ending with Total, Average, and Running Rate columns.
15. Total is the total of all sales for that category, Average is the monthly average for all sales (excluding blank months), and Running Rate is the average of only the past 12 months.
16. Last 12 Months chart for Delivery, displaying monthly delivery data by category, and ending with Total, Average, and Running Rate columns.

All data is stored in Firebase using Firestore and Firebase Authentication.

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, open an issue on GitHub or contact caelan@caelanhuntress.com
