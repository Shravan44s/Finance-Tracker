import React, { useState } from 'react';
import axios from 'axios';
import '../MidTerm/CSS/TransactionForm.css';

const TransactionForm = ({ fetchTransactions }) => {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    category: '',
    paymentMethod: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/transactions', formData)
      .then(() => {
        alert('Transaction added successfully');
        fetchTransactions();
        setFormData({
          date: '',
          description: '',
          amount: '',
          category: '',
          paymentMethod: ''
        });
      })
      .catch(error => console.error('Error adding transaction:', error));
  };

  return (
    <div className="transaction-form">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
            <br />
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Description:
            <br />
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Amount:
            <br />
            <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Category:
            <br />
            <select name="category" value={formData.category} onChange={handleInputChange} required>
             <option value="Select">Select option</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Payment Method:
            <br />
            <input type="text" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} />
          </label>
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
