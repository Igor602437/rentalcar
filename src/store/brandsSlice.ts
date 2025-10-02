import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { fetchBrands as fetchBrandsAPI } from '../services/carsApi';

interface BrandsState {
  brands: string[];
  loading: boolean;
  error: string | null;
}
const initialState: BrandsState = {
  brands: [],
  loading: false,
  error: null,
};

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const brands = await fetchBrandsAPI();
      return brands;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch brands');
    }
  }
);

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    clearBrands(state) {
      state.brands = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBrands.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBrands.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.loading = false;
          state.brands = action.payload;
        }
      )
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBrands } = brandsSlice.actions;
export default brandsSlice.reducer;
