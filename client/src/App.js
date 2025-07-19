import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Calendar from './components/Calendar';
import Dashboard from './components/Dashboard';
import DataTable from './components/DataTable';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Calendar</Link> |{' '}
        <Link to="/dashboard">Dashboard</Link> |{' '}
        <Link to="/data">Data Table</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data" element={<DataTable />} />
      </Routes>
    </Router>
  );
}

export default App;