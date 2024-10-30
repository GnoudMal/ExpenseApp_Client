import { createAsyncThunk } from '@reduxjs/toolkit';
import { createBalance, getBalance, updateBalance } from '../../api/api';

// Fetch balance action
export const fetchBalance = createAsyncThunk(
    'balance/fetchBalance',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getBalance(userId);
            return response.data;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Update balance action
export const createOrUpdateBalance = createAsyncThunk(
    'balance/createOrUpdateBalance',
    async ({ userId, totalBalance }, { getState, rejectWithValue }) => {
        try {
            const { balance } = getState().balance;
            console.log('Current balance state:', balance);

            if (balance && balance.userId === userId) {
                console.log('Updating existing balance');
                const response = await updateBalance(userId, totalBalance);
                return response.data;
            } else {
                console.log('Creating new balance');
                const response = await createBalance({ userId, totalBalance });
                return response.data;
            }
        } catch (error) {
            console.error('Error in createOrUpdateBalance:', error);
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

