import React, { useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import './EntryForm.css';

function EntryForm({ date, onSubmit }) {
  const [sale, setSale] = useState('');
  const [delivery, setDelivery] = useState('');
  const [saleCategory, setSaleCategory] = useState('');
  const [deliveryCategory, setDeliveryCategory] = useState('');

  const submitSale = e => {
    e.preventDefault();
    if (sale && saleCategory) {
      onSubmit({ type: 'sale', date: date.toISOString(), amount: Number(sale), category: saleCategory });
      setSale('');
      setSaleCategory('');
    }
  };

  const submitDelivery = e => {
    e.preventDefault();
    if (delivery && deliveryCategory) {
      onSubmit({ type: 'delivery', date: date.toISOString(), amount: Number(delivery), category: deliveryCategory });
      setDelivery('');
      setDeliveryCategory('');
    }
  };

  return (
    <form className="entry-form">
      <div>
        <input
          type="number"
          placeholder="Amount Sold"
          value={sale}
          onChange={e => setSale(e.target.value)}
        />
        <CategoryDropdown value={saleCategory} onChange={setSaleCategory} />
        <button onClick={submitSale}>Add Sale</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Amount Delivered"
          value={delivery}
          onChange={e => setDelivery(e.target.value)}
        />
        <CategoryDropdown value={deliveryCategory} onChange={setDeliveryCategory} />
        <button onClick={submitDelivery}>Add Delivery</button>
      </div>
    </form>
  );
}

export default EntryForm;