import {createSlice} from '@reduxjs/toolkit';

export interface User {
  email: string;
  password: string;
  name: string;
  age: string;
}

interface AuthState {
  currentUser?: any;
}

const initialState: AuthState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {setCurrentUser} = authSlice.actions;
