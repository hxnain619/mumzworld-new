import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';

import productSlice from '@api/productSlice';

const combinedReducer = combineReducers({
  [productSlice.reducerPath]: productSlice.reducer,
});

const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDetaultMiddleware) =>
    getDetaultMiddleware({
      serializableCheck: false,
    }).concat(productSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
