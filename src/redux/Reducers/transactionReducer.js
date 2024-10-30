import { createSlice } from '@reduxjs/toolkit';
import {
    fetchTransactions,
    createTransaction,
    removeTransaction,
} from '../actions/transactionActions';

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transactions: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.filter(
                    (transaction) => transaction._id !== action.payload
                );
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default transactionSlice.reducer;
