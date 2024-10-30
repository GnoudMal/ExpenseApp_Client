import { createSlice } from '@reduxjs/toolkit';
import { fetchGoals, createGoal, updateGoal } from '../actions/goalActions';

const goalSlice = createSlice({
    name: 'goal',
    initialState: {
        goals: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoals.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.loading = false;
                state.goals = action.payload;
            })
            .addCase(fetchGoals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.goals.push(action.payload);
            });
    },
});

export default goalSlice.reducer;
