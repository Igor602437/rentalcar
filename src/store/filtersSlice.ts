import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

const initialState: FiltersState = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Сбрасываем все фильтры к пустым значениям
    resetFilters: state => {
      state.brand = '';
      state.rentalPrice = '';
      state.minMileage = '';
      state.maxMileage = '';
    },
    // Обновляем фильтры после сброса
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      const newFilters = action.payload;
      state.brand = newFilters.brand ?? '';
      state.rentalPrice = newFilters.rentalPrice ?? '';
      state.minMileage = newFilters.minMileage ?? '';
      state.maxMileage = newFilters.maxMileage ?? '';
    },
  },
});

export const { resetFilters, setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
