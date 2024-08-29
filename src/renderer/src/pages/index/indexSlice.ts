import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  changeAccount,
  DefaultState,
  HeaderType,
  openProject,
  rootReducer,
  sortTableByItemNumber,
  sortTableByYear,
} from '../../store/rootReducer';
import { RootSelectors, RootState } from '../../store/store';
import { allOptions, customOption } from '@renderer/chartOfAccounts';
import isEqual from 'lodash.isequal';

const initialIndexState: DefaultState = {
  id: 3,
  title: 'Analýza reťazových a bázických indexov',
  corner: 'Ekonomická položka (€)',
  headers: [
    {
      id: '1',
      type: HeaderType.NUMBER,
      label: 'Bázický rok',
    },
    {
      id: '2',
      type: HeaderType.NUMBER,
      label: '2000',
    },
    {
      id: '3',
      type: HeaderType.NUMBER,
      label: '2001',
    },
  ],
  data: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  items: [
    '501 - Spotreba materiálu',
    '666 - Výnosy z krátkodobého finančného majetku',
    '',
  ],
  values: [
    {
      id: '1',
      value: '501',
    },
    {
      id: '2',
      value: '666',
    },
    {
      id: '3',
      value: '',
    },
  ],
  itemSelectOptions: [...allOptions, customOption],
  text: '',
  accounts: [''],
  sortable: true,
  hasAnalytic: true,
  dynRows: true,
  dynCols: true,
};

export const indexSlice = createSlice({
  name: 'index',
  initialState: initialIndexState,
  reducers: {
    ...rootReducer,
    reset: (state) => {
      state.headers = initialIndexState.headers;
      state.data = initialIndexState.data;
      state.items = initialIndexState.items;
      state.values = initialIndexState.values;
      state.text = initialIndexState.text;
    },
    ...openProject,
    ...changeAccount,
    ...sortTableByItemNumber,
    ...sortTableByYear,
  },
});

export const indexActions = indexSlice.actions;
export const indexReducer = indexSlice.reducer;

export const selectIndex = (state: RootState) => state.index;

export const hasIndexChanged = (state: RootState) => {
  return !isEqual(state.index, initialIndexState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.index.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.index.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.index.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.index.values],
      (values) => values[index],
    ),
  data: createSelector(
    [(state: RootState) => state.index.data],
    (data) => data,
  ),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.index.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.index.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.index.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector(
    [(state: RootState) => state.index.text],
    (text) => text,
  ),
  items: createSelector(
    [(state: RootState) => state.index.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.index.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.index.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
};
