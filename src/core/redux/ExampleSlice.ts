// ============================================================
// EXAMPLE SLICE — Redux Toolkit Template
// ============================================================
// This file demonstrates the standard Redux slice pattern used
// in this project. Duplicate it as a starting point for new
// feature slices.
//
// Usage:
//   1. Copy this file and rename it (e.g., MyFeatureSlice.ts)
//   2. Replace ExampleItem / example with your domain model
//   3. Wire up to store.ts (add to RootState + configureStore)
//   4. Call the thunk from your screen or ViewModel
// ============================================================

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// ─── Data Model ─────────────────────────────────────────────

export interface ExampleItem {
  id: number;
  title: string;
}

// ─── State Shape ────────────────────────────────────────────

export interface ExampleState {
  items: ExampleItem[];
  loading: boolean;
  error: string | undefined;
}

const initialState: ExampleState = {
  items: [],
  loading: false,
  error: undefined,
};

// ─── Async Thunk ────────────────────────────────────────────

/**
 * Async thunk — replace with your ViewModel call.
 * Pattern: thunk dispatches lifecycle actions (pending/fulfilled/rejected)
 * that are handled in extraReducers below.
 */
export const fetchExampleItems = createAsyncThunk<
  ExampleItem[], // return type
  void, // argument type (void = no args)
  { rejectValue: string }
>('example/fetchItems', async (_, { rejectWithValue }) => {
  try {
    // TODO: Replace with your ViewModel call:
    // const result = await ExampleViewModel.getItems();
    // return result ?? [];
    return [] as ExampleItem[];
  } catch (error) {
    return rejectWithValue('Failed to fetch items');
  }
});

// ─── Slice ──────────────────────────────────────────────────

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    // Synchronous actions — add as needed
    clearItems: state => {
      state.items = [];
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExampleItems.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchExampleItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExampleItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ─── Exports ────────────────────────────────────────────────

export const triggerClearItems = exampleSlice.actions.clearItems;
export default exampleSlice.reducer;
