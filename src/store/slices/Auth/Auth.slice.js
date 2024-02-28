import { createSlice } from '@reduxjs/toolkit';
import * as authThunks from './Auth.thunks';
import buildExtraReducers from './Auth.extraReducers';
// import authReducers from './Auth.reducers';
import * as reducers from './Auth.reducers';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers,
    extraReducers: buildExtraReducers,
});

export const authReducer = slice.reducer;
export const authSelector = (state) => state.auth;
export const authActions = { ...slice.actions, ...authThunks };
