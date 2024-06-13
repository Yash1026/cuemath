import {combineReducers, configureStore, PayloadAction} from '@reduxjs/toolkit';
import {authSlice} from './slices/authSlice';

const combinedReducer = combineReducers({
  auth: authSlice.reducer,
});

const rootReducer = (state, action: PayloadAction) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
