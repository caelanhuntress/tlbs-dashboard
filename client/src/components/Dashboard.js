import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    const fetchEntries = async () => {
      const [year, monthNum] = month.split('-');
      const monthStart = `${year}-${monthNum}-01`;
      const monthEndDate = new Date(year, monthNum, 0).getDate();
      const monthEnd = `${year}-${monthNum}-${monthEndDate}`;

      const snapshot = await getDocs(collection(db, 'entries'));
      const data = [];
      snapshot.forEach(doc => {
        const entry = doc.data();
        if (entry.date >= monthStart && entry.date <= monthEnd) {
          data.push({ id: doc.id, ...entry });
        }
      });
      setEntries(data);
    };
    fetchEntries();
  }, [month]);

  // Aggregate totals
  const totalSales = entries.filter(e => e.type === 'sale').reduce((sum, e) => sum + Number(e.amount), 0);
  const totalDelivery = entries.filter(e => e.type === 'delivery').reduce((sum, e) => sum + Number(e.amount), 0);

  // Category breakdown
  const categories = ['Training', 'Coaching', 'Speaking'];
  const salesByCategory = categories.map(cat =>
    entries.filter(e => e.type === 'sale' && e.category === cat).reduce((sum, e) => sum + Number(e.amount), 0)
  );
  const deliveryByCategory = categories.map(cat =>
    entries.filter(e => e.type === 'delivery' && e.category === cat).reduce((sum, e) => sum + Number(e.amount), 0)
  );

  // Weekly totals (for bar chart)
  function getWeekOfMonth(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    return Math.ceil(day / 7);
  }
  const weeklySales = [0, 0, 0, 0, 0];
  const weeklyDelivery = [0, 0, 0, 0, 0];
  entries.forEach(e => {
    const week = getWeekOfMonth(e.date) - 1;
    if (e.type === 'sale') weeklySales[week] += Number(e.amount);
    if (e.type === 'delivery') weeklyDelivery[week] += Number(e.amount);
  });

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <label>Month:</label>
        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
        />
      </div>
      <div style={{ margin: '1rem 0' }}>
        <strong>Sales Total:</strong> <span style={{ color: 'green' }}>${totalSales}</span>
        {' | '}
        <strong>Delivery Total:</strong> <span style={{ color: 'red' }}>${totalDelivery}</span>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Weekly Sales & Delivery</h3>
          <Bar
            data={{
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
              datasets: [
                {
                  label: 'Sales',
                  data: weeklySales,
                  backgroundColor: 'rgba(0, 200, 0, 0.5)',
                },
                {
                  label: 'Delivery',
                  data: weeklyDelivery,
                  backgroundColor: 'rgba(200, 0, 0, 0.5)',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
              scales: { y: { beginAtZero: true } }
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Sales by Category</h3>
          <Pie
            data={{
              labels: categories,
              datasets: [
                {
                  data: salesByCategory,
                  backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Delivery by Category</h3>
          <Pie
            data={{
              labels: categories,
              datasets: [
                {
                  data: deliveryByCategory,
                  backgroundColor: ['#f44336', '#9c27b0', '#00bcd4'],
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;