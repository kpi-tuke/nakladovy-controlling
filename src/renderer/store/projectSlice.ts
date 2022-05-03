import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

const projectSlice = createSlice({
  name: "project",
  initialState: {created: false},
  reducers: {
    setCreated: state => {
      state.created = true
    }
  }
})

export const projectActions = projectSlice.actions;
export const selectProject = (state: RootState) => state.project;
export const projectReducer = projectSlice.reducer;
