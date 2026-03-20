import { configureStore } from '@reduxjs/toolkit';
import exampleUpdateReducer, { ExampleState } from './ExampleSlice';
import authReducer from '../../features/auth/slice/authSlice';
import jobsReducer from '../../features/jobs/slice/jobsSlice';
import { AuthState } from '../../features/auth/types';
import { JobsState } from '../../features/jobs/types';

export interface RootState {
  exampleUpdate: ExampleState;
  auth: AuthState;
  jobs: JobsState;
}

export const store = configureStore({
  reducer: {
    exampleUpdate: exampleUpdateReducer,
    auth: authReducer,
    jobs: jobsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
