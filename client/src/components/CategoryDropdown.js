import React from 'react';

const categories = ['Training', 'Coaching', 'Speaking'];

function CategoryDropdown({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Select Category</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}

export default CategoryDropdown;