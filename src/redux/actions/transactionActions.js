import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactions, addTransaction, deleteTransaction } from '../../api/api';

export const fetchTransactions = createAsyncThunk(
    'transaction/fetchTransactions',
    async (userId, { rejectWithValue }) => {
        // console.log('check trans actions', userId);

        try {
            const response = await getTransactions(userId);
            // console.log('da o day');

            return response.data;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error.response.data);
        }
    }
);

export const createTransaction = createAsyncThunk(
    'transaction/createTransaction',
    async (transactionData, { rejectWithValue }) => {
        console.log('check trans', transactionData);

        try {
            const response = await addTransaction(transactionData);
            return response.data;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error.response.data);
        }
    }
);

export const removeTransaction = createAsyncThunk(
    'transaction/removeTransaction',
    async (transactionId, { rejectWithValue }) => {
        try {
            await deleteTransaction(transactionId);
            return transactionId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
