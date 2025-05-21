import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLast30DaysISO, getLast30Days } from '../helpers/dateHelpers';
import findCategoryById from '../helpers/findCategoryById';
import getRandomColor from '../helpers/getRandomColor';
import subCategoryMap from '../consts/subCategoryMap';

export const fetchGraphData = createAsyncThunk(
    'graph/fetchGraphData',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const selectedCountry = state.ui.selectedCountry.id;
        const categories = state.ui.categories;
        const labels = getLast30Days();
        const searchDates = getLast30DaysISO();
        const datasets = [];

        try {
            const response = await fetch(`https://api.apptica.com/package/top_history/9379/${selectedCountry}?date_from=2025-05-14&date_to=2025-05-15&platforms=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`);
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            const graphData = await response.json();

            if (graphData) {
                const rawData = graphData.data;
                for (const categoryId in rawData) {
                    for (const subCategoryId in rawData[categoryId]) {
                        const dataPoints = searchDates.map(date => rawData[categoryId][subCategoryId][date] ?? null);

                        const subCategory = subCategoryMap[subCategoryId];
                        const category = findCategoryById(categories, categoryId);
                        const color = getRandomColor();

                        datasets.push({
                            label: `${category.name ? category.name : categoryId} - ${subCategory}`,
                            data: dataPoints,
                            borderColor: color,
                            backgroundColor: color,
                            pointRadius: 0,
                            tension: 0.3,
                            fill: false,
                            spanGaps: true
                        });
                    }
                }
            };

            return {
                'datasets': datasets,
                'labels': labels
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const graphSlice = createSlice({
    name: 'graph',
    initialState: {
        datasets: [],
        labels: [],
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
                state.datasets = action.payload.datasets;
                state.labels = action.payload.labels;
            })
            .addCase(fetchGraphData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default graphSlice.reducer;