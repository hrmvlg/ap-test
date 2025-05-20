import { createSlice } from '@reduxjs/toolkit';

const graphSlice = createSlice({
    name: 'graph',
    initialState: {
        graphSelectedCountry: null,
    },
    reducers: {
        setGraphSelectedCountry(state, action) {
            state.graphSelectedCountry = action.payload;
        },
    },
});

export const { setGraphSelectedCountry } = graphSlice.actions;
export default graphSlice.reducer;