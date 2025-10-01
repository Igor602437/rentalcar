import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CarProps } from '../types/car';

interface FavoritesState {
  favorites: CarProps[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<CarProps>) => {
      // Проверяем, нет ли уже этого авто в избранном
      if (!state.favorites.find(car => car.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      // Удаляем авто по id
      state.favorites = state.favorites.filter(
        car => car.id !== action.payload
      );
    },
    toggleFavorite: (state, action: PayloadAction<CarProps>) => {
      const exists = state.favorites.find(car => car.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(
          car => car.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
