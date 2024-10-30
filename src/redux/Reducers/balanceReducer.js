import { createSlice } from '@reduxjs/toolkit';
import { fetchBalance, createOrUpdateBalance } from '../actions/balanceActions';

const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        balance: null, // Đối tượng đơn lẻ
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetch balance actions
            .addCase(fetchBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.balance = action.payload; // action.payload là đối tượng balance
                state.loading = false;
            })
            .addCase(fetchBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle createOrUpdateBalance actions
            .addCase(createOrUpdateBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrUpdateBalance.fulfilled, (state, action) => {
                const updatedBalance = action.payload;
                state.balance = state.balance && state.balance.userId === updatedBalance.userId
                    ? updatedBalance
                    : state.balance;
                state.loading = false;
            })
            .addCase(createOrUpdateBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default balanceSlice.reducer;
