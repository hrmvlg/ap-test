import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk(
    'ui/fetchCountries',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('https://api.apptica.com/v1/geo?B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l');
            if (!response.ok) {
                throw new Error('Не удалось загрузить список стран');
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchCategories = createAsyncThunk(
    'ui/fetchCategories',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('https://api.apptica.com/v1/applicationCategory?platform=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l');
            if (!response.ok) {
                throw new Error('Не удалось загрузить список категорий');
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const uiSlice = createSlice({
    initialState: {
        countries: [],
        categories: [],
        selectedCountry: null,
        status: 'idle',
        error: null
    },
    name: 'ui',
    reducers: {
        setSelectedCountry(state, action) {
            state.selectedCountry = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.countries = action.payload;
                if (!state.selectedCountry && action.payload.length > 0) {
                    state.selectedCountry = action.payload.find((country) => country.id === 1) || null;
                }
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;

            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setSelectedCountry } = uiSlice.actions;
export default uiSlice.reducer;