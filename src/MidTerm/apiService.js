import axios from 'axios';

const API_URL = 'http://localhost:8000/transactions';
const getAllTransactions = () => axios.get(API_URL);
const addTransaction = (transactionData) => axios.post(API_URL, transactionData);
const updateTransaction = (id, transactionData) => axios.put(`${API_URL}/${id}`, transactionData);
const deleteTransaction = (id) => axios.delete(`${API_URL}/${id}`);
export { getAllTransactions, addTransaction, updateTransaction, deleteTransaction };
