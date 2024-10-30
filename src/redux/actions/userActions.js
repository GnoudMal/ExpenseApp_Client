import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../../api/api';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData, { rejectWithValue }) => {
        console.log(userData);

        try {
            const response = await login(userData);
            return response.data;
        } catch (error) {
            console.log('check axios', error);

            return rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await register(userData);
            return response.data;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error.response.data);
        }
    }
);
