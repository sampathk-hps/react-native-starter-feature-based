import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { jobsApi } from '../api/jobsApi';
import { CreateJobPayload, Job, JobsState } from '../types';
import { MMKVStorage } from '../../../core/storage/MMKVStorage';
import { SyncQueue } from '../../../core/sync/SyncQueue';

const JOBS_CACHE_KEY = 'jobs_cache';

const initialState: JobsState = {
  items: MMKVStorage.getObject<Job[]>(JOBS_CACHE_KEY) ?? [],
  loading: false,
  error: undefined,
};

const persistJobs = (items: Job[]) =>
  MMKVStorage.setObject(JOBS_CACHE_KEY, items);

export const fetchJobsThunk = createAsyncThunk<
  Job[],
  void,
  { rejectValue: string }
>('jobs/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await jobsApi.fetchJobs();
  } catch {
    return rejectWithValue('Failed to load jobs');
  }
});

export const createJobThunk = createAsyncThunk<
  Job,
  CreateJobPayload,
  { rejectValue: string }
>('jobs/create', async (payload, { rejectWithValue }) => {
  const localJob: Job = {
    localId: uuidv4(),
    serverId: null,
    title: payload.title,
    description: payload.description,
    syncStatus: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  SyncQueue.enqueue<CreateJobPayload>('jobs', 'create', {
    ...payload,
  });

  try {
    const serverJob = await jobsApi.createJob(payload);
    return { ...localJob, serverId: serverJob.serverId, syncStatus: 'synced' };
  } catch {
    return rejectWithValue('Saved locally — will sync when online');
  }
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    upsertJob: (state, action: PayloadAction<Job>) => {
      const idx = state.items.findIndex(
        j => j.localId === action.payload.localId,
      );
      if (idx !== -1) {
        state.items[idx] = action.payload;
      } else {
        state.items.unshift(action.payload);
      }
      persistJobs(state.items);
    },
    markJobSynced: (
      state,
      action: PayloadAction<{ localId: string; serverId: string }>,
    ) => {
      const idx = state.items.findIndex(
        j => j.localId === action.payload.localId,
      );
      if (idx !== -1) {
        state.items[idx].serverId = action.payload.serverId;
        state.items[idx].syncStatus = 'synced';
        persistJobs(state.items);
      }
    },
    clearJobs: state => {
      state.items = [];
      MMKVStorage.remove(JOBS_CACHE_KEY);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchJobsThunk.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchJobsThunk.fulfilled, (state, action) => {
        state.loading = false;
        const serverItems = action.payload.map(j => ({
          ...j,
          localId: j.localId ?? uuidv4(),
          syncStatus: 'synced' as const,
        }));
        const pendingLocals = state.items.filter(
          j => j.syncStatus === 'pending',
        );
        state.items = [...pendingLocals, ...serverItems];
        persistJobs(state.items);
      })
      .addCase(fetchJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createJobThunk.pending, (state, action) => {
        const meta = action.meta.arg;
        const optimistic: Job = {
          localId: uuidv4(),
          serverId: null,
          title: meta.title,
          description: meta.description,
          syncStatus: 'pending',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        state.items.unshift(optimistic);
        persistJobs(state.items);
      })
      .addCase(createJobThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          j => j.localId === action.payload.localId,
        );
        if (idx !== -1) {
          state.items[idx] = action.payload;
          persistJobs(state.items);
        }
      })
      .addCase(createJobThunk.rejected, state => {
        state.loading = false;
      });
  },
});

export const { upsertJob, markJobSynced, clearJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
