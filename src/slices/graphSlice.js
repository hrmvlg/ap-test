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
        const last30DaysISO = getLast30DaysISO();
        const datasets = [];
        const csv = [];

        const dateRange = state.ui.dateRange;
        const dateFrom = dateRange[0];
        const dateTo = dateRange[1];

        try {
            const response = await fetch(`https://api.apptica.com/package/top_history/9379/${selectedCountry}?date_from=${dateFrom}&date_to=${dateTo}&platforms=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`);
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            const graphData = await response.json();

            if (graphData) {
                const rawData = graphData.data;
                for (const categoryId in rawData) {
                    for (const subCategoryId in rawData[categoryId]) {
                        const dataPoints = last30DaysISO.map(date => rawData[categoryId][subCategoryId][date] ?? null);

                        const subCategory = subCategoryMap[subCategoryId];
                        const category = findCategoryById(categories, categoryId);
                        const color = getRandomColor();
                        const fullLabel = `${category.name ? category.name : categoryId} - ${subCategory}`;

                        datasets.push({
                            label: fullLabel,
                            data: dataPoints,
                            borderColor: color,
                            backgroundColor: color,
                            pointRadius: 0,
                            tension: 0.3,
                            fill: false,
                            spanGaps: true
                        });

                        const rawDataDates = rawData[categoryId][subCategoryId];
                        for (const date in rawDataDates) {
                            csv.push({
                                category: fullLabel,
                                date: date,
                                value: rawDataDates[date]
                            })
                        }
                    }
                };

                return {
                    'datasets': datasets,
                    'labels': labels,
                    'csv': csv,
                    'last30DaysISO': last30DaysISO,
                };
            }
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
        csv: [],
        last30DaysISO: [],
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
                state.csv = action.payload.csv;
                state.last30DaysISO = action.payload.last30DaysISO;
            })
            .addCase(fetchGraphData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default graphSlice.reducer;