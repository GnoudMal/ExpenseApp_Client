import { createAsyncThunk } from '@reduxjs/toolkit';
import { addGoal, getGoals, updateGoal } from '../../api/api';

// Fetch goals action
export const fetchGoals = createAsyncThunk(
    'goal/fetchGoals',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getGoals(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create or Update goal action
export const createGoal = createAsyncThunk(
    'goal/createGoal',
    async (goalData, { getState, rejectWithValue }) => {
        const { goals } = getState().goal;
        console.log('check goal', goalData);

        // Find existing goal based on some unique identifier, like category and userId
        const existingGoal = goals.find(goal => goal.userId === goalData.userId && goal.category === goalData.category);
        console.log(existingGoal);

        try {
            if (existingGoal) {
                console.log('Goal exists, updating it');

                // If goal exists, update it
                const response = await updateGoal(existingGoal._id, goalData);
                console.log(response.data);

                return response.data;
            } else {
                console.log('Goal does not exist, creating a new one');

                // If goal does not exist, create it
                const response = await addGoal(goalData);
                return response.data;
            }
        } catch (error) {
            console.log('Error in createGoal:', error);
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);
