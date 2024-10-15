import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../MidTerm/CSS/TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('income');
  const [editPaymentMethod, setEditPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    setLoading(true);
    axios
      .get('http://localhost:8000/transactions')
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch transactions');
        setLoading(false);
      });
  };

  const createTransaction = () => {
    axios
      .post('http://localhost:8000/transactions', {
        date: editDate,
        description: editDescription,
        amount: editAmount,
        category: editCategory,
        paymentMethod: editPaymentMethod,
      })
      .then((response) => {
        setTransactions([...transactions, response.data]);
        clearForm();
      })
      .catch((error) => {
        console.error('Error creating transaction:', error);
        setError('Failed to create transaction');
      });
  };

  const updateTransaction = () => {
    axios
      .put(`http://localhost:8000/transactions/${editTransaction.id}`, {
        date: editDate,
        description: editDescription,
        amount: editAmount,
        category: editCategory,
        paymentMethod: editPaymentMethod,
      })
      .then((response) => {
        const updatedTransactions = transactions.map((t) =>
          t.id === editTransaction.id ? response.data : t
        );
        setTransactions(updatedTransactions);
        clearForm();
        setEditTransaction(null);
      })
      .catch((error) => {
        console.error('Error updating transaction:', error);
        setError('Failed to update transaction');
      });
  };

  const deleteTransaction = (id) => {
    axios
      .delete(`http://localhost:8000/transactions/${id}`)
      .then(() => {
        setTransactions(transactions.filter((transaction) => transaction.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting transaction:', error);
        setError('Failed to delete transaction');
      });
  };

  const handleEditClick = (transaction) => {
    setEditTransaction(transaction);
    setEditDate(transaction.date);
    setEditDescription(transaction.description);
    setEditAmount(transaction.amount);
    setEditCategory(transaction.category);
    setEditPaymentMethod(transaction.paymentMethod);
  };

  const handleSaveClick = () => {
    if (editTransaction) {
      updateTransaction();
    } else {
      createTransaction();
    }
  };

  const clearForm = () => {
    setEditTransaction(null);
    setEditDate('');
    setEditDescription('');
    setEditAmount('');
    setEditCategory('income');
    setEditPaymentMethod('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'date':
        setEditDate(value);
        break;
      case 'description':
        setEditDescription(value);
        break;
      case 'amount':
        setEditAmount(value);
        break;
      case 'category':
        setEditCategory(value);
        break;
      case 'paymentMethod':
        setEditPaymentMethod(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1 style={{ color: "white" }}>Transaction List</h1>
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            {editTransaction && editTransaction.id === transaction.id ? (
              <div className="edit-form">
                <input type="date" name="date" value={editDate} onChange={handleInputChange} />
                <input type="text" name="description" value={editDescription} onChange={handleInputChange} />
                <input type="number" name="amount" value={editAmount} onChange={handleInputChange} />
                <select name="category" value={editCategory} onChange={handleInputChange}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <input type="text" name="paymentMethod" value={editPaymentMethod} onChange={handleInputChange} />
                <div className="actions">
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={clearForm}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                
                <p>Date: {transaction.date}</p>
                <p>Amount: {transaction.amount}</p>
                <p>Discription: {transaction.description}</p>
                <p>Category: {transaction.category}</p>
                <p>Payment Method: {transaction.paymentMethod}</p>
                <div className="actions">
                  <button onClick={() => handleEditClick(transaction)}>Edit</button>
                  <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
