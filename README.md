# Tlbs Dashboard

Tlbs Dashboard is a simple web application for tracking sales and delivery for workshops,
coaching, and speaking. It logs each sale and delivery event, stores them in a database, and displays
trends with interactive charts.

## Features

- **Sales Logging** – Record product, quantity, price and timestamp whenever a sale occurs.
- **Delivery Tracking** – Log shipments received from suppliers with quantities and arrival dates.
- **Visualization** – Charts show daily and weekly totals so you can quickly gauge performance.

## Setup

The dashboard is built with **Node.js** and **Express** for the backend and uses **React**
with **Chart.js** for the frontend. To run it locally you need Node.js (v18 or later).

```bash
# Install dependencies
yarn install  # or `npm install`

# Start the development server
yarn start    # or `npm start`
```

These commands assume a typical structure with a server folder and a client folder. After
starting, open `http://localhost:3000` in your browser to use the dashboard.

## Basic Usage

1. Add a sale by clicking **"New Sale"** and filling out the product, quantity and price.
2. Register deliveries through the **"New Delivery"** form.
3. View charts on the home page to see sales vs. deliveries over time.

Data is usually stored in a local SQLite database (via `better-sqlite3`) but can be adapted
for other databases.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request. Please keep
commits focused and include tests when applicable.

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, open an issue on GitHub or contact
<maintainer@example.com>.

