import { createSlice } from '@reduxjs/toolkit';
import {
  DefaultState,
  HeaderType,
  openProject,
  rootReducer,
} from '../../store/rootReducer';
import { RootState } from '../../store/store';
import isEqual from 'lodash.isequal';

const initialParetoState: DefaultState = {
  id: 6,
  title: 'Pareto analýza nákladov',
  corner: 'Druhové náklady',
  headers: [
    {
      type: HeaderType.STRING,
      label: '(N) - výška nákladov (€)',
    },
  ],
  data: [[0]],
  items: ['Názov chyby'],
  values: ['Názov chyby'],
  text: '',
  accounts: [''],
  sortable: false,
  hasAnalytic: false,
  dynRows: true,
};

export const paretoSlice = createSlice({
  name: 'pareto',
  initialState: initialParetoState,
  reducers: {
    ...rootReducer,
    reset: (state: DefaultState) => {
      state.headers = initialParetoState.headers;
      state.data = initialParetoState.data;
      state.items = initialParetoState.items;
      state.values = initialParetoState.values;
      state.text = initialParetoState.text;
    },
    ...openProject,
  },
});

export const paretoActions = paretoSlice.actions;
export const paretoReducer = paretoSlice.reducer;
export const selectPareto = (state: RootState) => state.pareto;

export const hasParetoChanged = (state: RootState) => {
  return !isEqual(state.pareto, initialParetoState);
};
