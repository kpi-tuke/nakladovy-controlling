import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";

const evaluationSlice = createSlice({
  name: 'report',
  initialState: { tasks: [] },
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      // @ts-ignore
      if (!state.tasks.includes(action.payload))
        // @ts-ignore
        state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      // @ts-ignore
      if (state.tasks.includes(action.payload))
        // @ts-ignore
        state.tasks = state.tasks.filter((id: string) => id !== action.payload);
      console.log(state.tasks)
    },
    // @ts-ignore
    reset: (state) => {
      state.tasks = [];
    },
    openProject: (state, action: PayloadAction<string[]>) => {
      // @ts-ignore
      state.tasks = action.payload
    }
  },
});

export const evaluationActions = evaluationSlice.actions;
export const evaluationReducer = evaluationSlice.reducer;
export const selectEvaluation = (state: RootState) => state.evaluation;
