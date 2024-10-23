import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  allOptions,
  costOptions,
  profitOptions,
} from '@renderer/chartOfAccounts';
import {
  CellType,
  changeAccount,
  DefaultState,
  openProject,
  rootReducer,
  sortTableByItemNumber,
  sortTableByYear,
} from '@renderer/store/rootReducer';
import { RootSelectors, RootState } from '@renderer/store/store';
import isEqual from 'lodash.isequal';

const initialTrendState: DefaultState = {
  id: 1,
  title: 'Trendová analýza nákladov',
  corner: 'Ekonomická veličina (€)',
  headers: [
    {
      id: '1',
      type: CellType.NUMBER,
      label: '2000',
    },
  ],
  data: [[0], [0], [0]],
  items: [costOptions[0].label, profitOptions[0].label, ''],
  values: [
    {
      id: '1',
      value: costOptions[0].value.toString(),
    },
    {
      id: '2',
      value: profitOptions[0].value.toString(),
    },
    {
      id: '3',
      value: '',
    },
  ],
  rowTypes: [CellType.NUMBER, CellType.NUMBER, CellType.NUMBER],
  text: '',
  accounts: [''],
  sortable: true,
  hasAnalytic: true,
  dynRows: true,
  dynCols: true,
  itemSelectOptions: allOptions,
  newRowType: CellType.NUMBER,
};

export const trendSlice = createSlice({
  name: 'trend',
  initialState: initialTrendState,
  reducers: {
    ...rootReducer,
    reset: (state: DefaultState) => {
      state.headers = initialTrendState.headers;
      state.data = initialTrendState.data;
      state.items = initialTrendState.items;
      state.values = initialTrendState.values;
      state.text = initialTrendState.text;
    },
    ...openProject,
    ...changeAccount,
    ...sortTableByYear,
    ...sortTableByItemNumber,
  },
});

export const trendActions = trendSlice.actions;
export const trendReducer = trendSlice.reducer;

export const selectTrend = (state: RootState) => state.trend;

export const hasTrendChanged = (state: RootState) => {
  return !isEqual(state.trend, initialTrendState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.trend.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.trend.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.trend.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.trend.values],
      (values) => values[index],
    ),
  data: createSelector(
    [(state: RootState) => state.trend.data],
    (data) => data,
  ),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.trend.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.trend.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.trend.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector(
    [(state: RootState) => state.trend.text],
    (text) => text,
  ),
  items: createSelector(
    [(state: RootState) => state.trend.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.trend.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.trend.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
  getRowType: (index) =>
    createSelector(
      [(state: RootState) => state.trend.rowTypes],
      (rowTypes) => rowTypes[index],
    ),
};
