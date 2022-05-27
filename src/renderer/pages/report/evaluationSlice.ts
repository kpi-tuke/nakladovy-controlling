import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

const initialEvaluationState: { tasks: number[] } = {
  tasks: [],
};

const evaluationSlice = createSlice({
  name: 'report',
  initialState: initialEvaluationState,
  reducers: {
    addTask: (state, action: PayloadAction<number>) => {
      if (!state.tasks.includes(action.payload))
        state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      if (state.tasks.includes(action.payload))
        state.tasks = state.tasks.filter((id: number) => id !== action.payload);
    },

    reset: (state) => {
      state.tasks = [];
    },
    openProject: (state, action: PayloadAction<number[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const evaluationActions = evaluationSlice.actions;
export const evaluationReducer = evaluationSlice.reducer;
export const selectEvaluation = (state: RootState) => state.evaluation;
