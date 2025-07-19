import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import GoalsBar from './GoalsBar';
import EntryForm from './EntryForm';
import './Calendar.css';

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Get week number (0-based) for a given date in current month
function getWeekOfMonth(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return Math.floor((date.getDate() + firstDay - 1) / 7);
}

function Calendar() {
  const [month, setMonth] = useState(new Date());
  const [entries, setEntries] = useState({}); // { 'YYYY-MM-DD': [entry, ...] }
  const year = month.getFullYear();
  const monthNum = month.getMonth();
  const daysInMonth = getDaysInMonth(year, monthNum);

  useEffect(() => {
    // Fetch entries for this month from Firestore
    const fetchEntries = async () => {
      const monthStart = new Date(year, monthNum, 1);
      const monthEnd = new Date(year, monthNum + 1, 0, 23, 59, 59);
      const q = query(
        collection(db, 'entries'),
        where('date', '>=', formatDate(monthStart)),
        where('date', '<=', formatDate(monthEnd))
      );
      const snapshot = await getDocs(q);
      const byDate = {};
      snapshot.forEach(doc => {
        const data = doc.data();
        if (!byDate[data.date]) byDate[data.date] = [];
        byDate[data.date].push({ id: doc.id, ...data });
      });
      setEntries(byDate);
    };
    fetchEntries();
  }, [month]);

  const handlePrevMonth = () => {
    setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Build calendar grid with weekly summary column
  const weeks = [];
  let week = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, monthNum, day);
    week.push(dateObj);
    if (dateObj.getDay() === 6 || day === daysInMonth) {
      // End of week or end of month
      weeks.push(week);
      week = [];
    }
  }

  // Calculate weekly summaries
  function weeklyTotals(weekDates) {
    let sales = 0, delivery = 0;
    weekDates.forEach(date => {
      const key = formatDate(date);
      const dayEntries = entries[key] || [];
      dayEntries.forEach(e => {
        if (e.type === 'sale') sales += Number(e.amount);
        if (e.type === 'delivery') delivery += Number(e.amount);
      });
    });
    return { sales, delivery };
  }

  return (
    <div className="calendar-container">
      <GoalsBar month={month} entries={entries} />
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{month.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid calendar-grid-weekly">
        {/* Header row: Sun ... Sat | Weekly Summary */}
        <div className="calendar-row calendar-row-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Weekly Summary'].map((d, i) => (
            <div key={i} className="calendar-header-cell">{d}</div>
          ))}
        </div>
        {/* Week rows */}
        {weeks.map((weekDates, i) => {
          // Pad start if first day is not Sunday
          const startPad = weekDates[0].getDay();
          // Pad end if last day is not Saturday
          const endPad = 6 - weekDates[weekDates.length - 1].getDay();
          const totals = weeklyTotals(weekDates);
          return (
            <div key={i} className="calendar-row">
              {/* Days of week */}
              {[...Array(startPad)].map((_, idx) => (
                <div key={`startpad${idx}`} className="calendar-cell empty" />
              ))}
              {weekDates.map(date => {
                const dayKey = formatDate(date);
                const dayEntries = entries[dayKey] || [];
                const salesTotal = dayEntries
                  .filter(e => e.type === 'sale')
                  .reduce((sum, e) => sum + Number(e.amount), 0);
                const deliveryTotal = dayEntries
                  .filter(e => e.type === 'delivery')
                  .reduce((sum, e) => sum + Number(e.amount), 0);
                return (
                  <div key={dayKey} className="calendar-cell">
                    <div className="calendar-date">{date.getDate()}</div>
                    <div>
                      <span style={{ color: 'green' }}>Sales: ${salesTotal || 0}</span>
                      <br />
                      <span style={{ color: 'red' }}>Delivery: ${deliveryTotal || 0}</span>
                    </div>
                    <EntryForm
                      date={date}
                      onSubmit={async entry => {
                        await addDoc(collection(db, 'entries'), {
                          ...entry,
                          date: formatDate(new Date(entry.date)),
                          createdAt: new Date().toISOString(),
                        });
                        setMonth(new Date(month)); // triggers reload
                      }}
                    />
                  </div>
                );
              })}
              {[...Array(endPad)].map((_, idx) => (
                <div key={`endpad${idx}`} className="calendar-cell empty" />
              ))}
              {/* Weekly summary column */}
              <div className="calendar-cell summary-cell">
                <div><b>Week {i + 1}</b></div>
                <div style={{ color: 'green' }}>Sales: ${totals.sales}</div>
                <div style={{ color: 'red' }}>Delivery: ${totals.delivery}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;