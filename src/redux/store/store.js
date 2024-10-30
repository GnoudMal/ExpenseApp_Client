import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Reducers/userReducer';
import transactionReducer from '../Reducers/transactionReducer';
import goalReducer from '../Reducers/goalReducer';
import balanceReducer from '../Reducers/balanceReducer';


export const store = configureStore({
    reducer: {
        user: userReducer,
        transaction: transactionReducer,
        goal: goalReducer,
        balance: balanceReducer,

    },
});
