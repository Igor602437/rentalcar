import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import filtersReducer from './filtersSlice';
import favoritesReducer from './favoritesSlice';
import brandsReducer from './brandsSlice';
import { persistReducer, persistStore } from 'redux-persist';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'], // сохраняем только избранное
};

const rootReducer = combineReducers({
  filters: filtersReducer,
  favorites: favoritesReducer,
  brands: brandsReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // нужно, чтобы не ругался на redux-persist
    }),
});

export const persistor = persistStore(store);

// Типы для TS
// глобальный тип состояния всего приложения. Используется в useSelector
export type RootState = ReturnType<typeof store.getState>;
// тип функции dispatch. Используется для useDispatch<AppDispatch>()
export type AppDispatch = typeof store.dispatch;
