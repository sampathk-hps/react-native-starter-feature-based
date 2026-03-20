import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { AuthState, LoginRequest } from '../types';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: undefined,
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.login(payload);
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? 'Login failed. Please try again.';
      return rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: state => {
      state.error = undefined;
    },
    resetAuth: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAuthError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
