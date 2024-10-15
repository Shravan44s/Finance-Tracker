import React, { useState, useEffect } from 'react';
import { getAllTransactions } from './apiService';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; 
import '../MidTerm/CSS/TransactionList.css';

const SummaryView = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    getAllTransactions()
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  };

  const calculateTotal = (type) => {
    return transactions.reduce((total, transaction) => {
      if (transaction.category === type) {
        return total + parseFloat(transaction.amount);
      }
      return total;
    }, 0);
  };

  const totalIncome = calculateTotal('income');
  const totalExpenses = calculateTotal('expense');
  const balance = totalIncome - totalExpenses;

  // Data for the doughnut chart
  const chartData = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        data: [totalIncome, totalExpenses, balance],
        backgroundColor: ['#007ACC', '#FF4560', '#FFC857'],
        hoverBackgroundColor: ['#1C70B8', '#D43C5D', '#D4AA3C'],
      },
    ],
  };
  

  return (
    <div className="summary-container">
      <h2 className="summary-title">Summary</h2>
      <div className="summary-item">
        <span>Total Income:</span>
        <span className="amount">{totalIncome}</span>
      </div>
      <div className="summary-item">
        <span>Total Expenses:</span>
        <span className="amount">{totalExpenses}</span>
      </div>
      <div className="summary-item">
        <span>Balance:</span>
        <span className="amount">{balance}</span>
      </div>
      <div className="chart-container">
        <Doughnut key="summary-chart" data={chartData} />
      </div>
    </div>
  );
};

export default SummaryView;
