import React from 'react';

import SummaryView from './SummaryView';
import TransactionList from './transactionList';
import TransactionForm from './transactionForm';

const Dashboard = () => {
  return (
    <div>
      <h1 style={{color:"white"}}>Personal Finance Tracker</h1>
      <SummaryView></SummaryView>
      <TransactionForm></TransactionForm>
      <TransactionList></TransactionList>
    </div>
  );
};

export default Dashboard;
