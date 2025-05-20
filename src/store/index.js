import { configureStore } from '@reduxjs/toolkit';
import graphReducer from '../slices/graphSlice';
import uiReducer from '../slices/uiSlice';

const store = configureStore({
    reducer: {
        graph: graphReducer,
        ui: uiReducer,
    },
});

export default store;