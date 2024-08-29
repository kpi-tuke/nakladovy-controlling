import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  DefaultState,
  HeaderType,
  openProject,
  rootReducer,
} from '../../store/rootReducer';
import { RootSelectors, RootState } from '../../store/store';
import isEqual from 'lodash.isequal';

const initialParetoState: DefaultState = {
  id: 6,
  title: 'Pareto analýza nákladov',
  corner: 'Druhové náklady',
  headers: [
    {
      id: '1',
      type: HeaderType.NUMBER,
      label: '(N) - výška nákladov (€)',
    },
  ],
  data: [[0]],
  items: ['Názov chyby'],
  values: [
    {
      id: '1',
      value: 'Názov chyby',
    },
  ],
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
export const selectPareto = (state: RootState) => state.pareto;

export const paretoReducer = paretoSlice.reducer;

export const hasParetoChanged = (state: RootState) => {
  return !isEqual(state.pareto, initialParetoState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.pareto.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.pareto.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.pareto.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.pareto.values],
      (values) => values[index],
    ),
  data: createSelector(
    [(state: RootState) => state.pareto.data],
    (data) => data,
  ),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.pareto.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.pareto.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.pareto.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector(
    [(state: RootState) => state.pareto.text],
    (text) => text,
  ),
  items: createSelector(
    [(state: RootState) => state.pareto.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.pareto.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.pareto.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions,
  ),
};
