import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGraphData = createAsyncThunk(
    'graph/fetchGraphData',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const selectedCountry = state.ui.selectedCountry.id;

        try {
            const response = await fetch(`https://api.apptica.com/package/top_history/9379/${selectedCountry}?date_from=2025-05-14&date_to=2025-05-15&platforms=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`);
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const graphSlice = createSlice({
    name: 'graph',
    initialState: {
        graphData: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGraphData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGraphData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.graphData = action.payload;

            })
            .addCase(fetchGraphData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setGraphSelectedCountry } = graphSlice.actions;
export default graphSlice.reducer;