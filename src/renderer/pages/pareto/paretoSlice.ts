import {createSlice} from "@reduxjs/toolkit";
import {defaultState, openProject, rootReducer} from "../../store/rootReducer";
import {RootState} from "../../store/store";

const initialParetoState: defaultState = {
  headers: ['(N) - náklady (€)'],
  data: [[0]],
  items: [
    'Názov chyby',
  ],
  values: [
    'Názov chyby',
  ],
  text: '',
  accounts: [""],
};

export const paretoSlice = createSlice({
  name: 'pareto',
  initialState: initialParetoState,
  reducers: {
    ...rootReducer,
    reset: (state: defaultState) => {
      state.headers = initialParetoState.headers;
      state.data = initialParetoState.data;
      state.items = initialParetoState.items;
      state.values = initialParetoState.values;
      state.text = initialParetoState.text;
    },
    ...openProject
  },
});

export const paretoActions = paretoSlice.actions;
export const paretoReducer = paretoSlice.reducer;
export const selectPareto = (state: RootState) => state.pareto;
