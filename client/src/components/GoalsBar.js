import React, { useState, useMemo } from 'react';
import './GoalsBar.css';

function GoalsBar({ month, entries }) {
  const [salesGoal, setSalesGoal] = useState('');
  const [deliveryGoal, setDeliveryGoal] = useState('');

  // Calculate monthly totals
  const totals = useMemo(() => {
    let sales = 0, delivery = 0;
    Object.values(entries).forEach(dayEntries => {
      dayEntries.forEach(e => {
        if (e.type === 'sale') sales += Number(e.amount);
        if (e.type === 'delivery') delivery += Number(e.amount);
      });
    });
    return { sales, delivery };
  }, [entries]);

  return (
    <div className="goals-bar">
      <div>
        <label>Sales Goal:</label>
        <input
          type="number"
          value={salesGoal}
          onChange={e => setSalesGoal(e.target.value)}
        />
      </div>
      <div>
        <label>Delivery Goal:</label>
        <input
          type="number"
          value={deliveryGoal}
          onChange={e => setDeliveryGoal(e.target.value)}
        />
      </div>
      <div>
        <span className="green-total">Sales Total: ${totals.sales}</span>{' '}
        <span className="red-total">Delivery Total: ${totals.delivery}</span>
      </div>
    </div>
  );
}

export default GoalsBar;