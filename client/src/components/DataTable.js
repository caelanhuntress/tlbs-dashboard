import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';
import CategoryDropdown from './CategoryDropdown';

function formatDate(date) {
  return typeof date === 'string'
    ? date
    : date.toISOString().split('T')[0];
}

function DataTable() {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Fetch all entries for selected month
  useEffect(() => {
    const fetchEntries = async () => {
      const [year, monthNum] = month.split('-');
      const monthStart = `${year}-${monthNum}-01`;
      const monthEndDate = new Date(year, monthNum, 0).getDate();
      const monthEnd = `${year}-${monthNum}-${monthEndDate}`;

      const q = query(
        collection(db, 'entries'),
        where('date', '>=', monthStart),
        where('date', '<=', monthEnd)
      );
      const snapshot = await getDocs(q);
      const data = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setEntries(data);
    };
    fetchEntries();
  }, [month]);

  const handleEdit = entry => {
    setEditingId(entry.id);
    setEditValues({
      amount: entry.amount,
      category: entry.category
    });
  };

  const handleEditChange = (field, value) => {
    setEditValues(values => ({ ...values, [field]: value }));
  };

  const handleSave = async entry => {
    await updateDoc(doc(db, 'entries', entry.id), {
      amount: Number(editValues.amount),
      category: editValues.category
    });
    setEditingId(null);
    setEditValues({});
    // Refresh entries
    setMonth(month);
  };

  const handleDelete = async entryId => {
    await deleteDoc(doc(db, 'entries', entryId));
    // Refresh entries
    setMonth(month);
  };

  return (
    <div>
      <h2>Data Table</h2>
      <div>
        <label>Month:</label>
        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
        />
      </div>
      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>No entries found.</td>
            </tr>
          )}
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.type}</td>
              <td>
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={editValues.amount}
                    onChange={e => handleEditChange('amount', e.target.value)}
                  />
                ) : (
                  entry.amount
                )}
              </td>
              <td>
                {editingId === entry.id ? (
                  <CategoryDropdown
                    value={editValues.category}
                    onChange={val => handleEditChange('category', val)}
                  />
                ) : (
                  entry.category
                )}
              </td>
              <td>
                {editingId === entry.id ? (
                  <button onClick={() => handleSave(entry)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(entry)}>Edit</button>
                )}
                <button
                  style={{ marginLeft: '0.5rem', color: 'red' }}
                  onClick={() => handleDelete(entry.id)}
                  disabled={editingId === entry.id}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;