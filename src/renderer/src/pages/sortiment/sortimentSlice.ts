import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootSelectors, RootState } from '../../store/store';
import {
  DefaultState,
  HeaderType,
  openProject,
  rootReducer,
} from '../../store/rootReducer';
import isEqual from 'lodash.isequal';

const initialSortimentState: DefaultState = {
  id: 5,
  title: 'Sortimentná analýza',
  corner: 'Ekonomická položka',
  headers: [
    {
      id: '1',
      type: HeaderType.NUMBER,
      label: 'Výrobok A',
    },
  ],
  data: [[0], [0], [0], [0], [0], [0], [0]],
  items: [
    '(P<sub>n</sub>) - priame náklady (€)',
    '(ÚVN) -  úplné vlastné náklady výkonu (€)',
    '(P<sub>cj</sub>) - predajná cena (jednotková) (€)',
    '(Q) - objem výroby (ks...)',
    '(P<sub>m</sub>) - priamy materiál',
    '(P<sub>mz</sub>) - priame mzdy',
    '(P<sub>o</sub>) - ostatné priame náklady',
  ],
  values: [
    {
      id: '1',
      value: '(P<sub>n</sub>) - priame náklady (€)',
    },
    {
      id: '2',
      value: '(ÚVN) -  úplné vlastné náklady výkonu (€)',
    },
    {
      id: '3',
      value: '(P<sub>cj</sub>) - predajná cena (jednotková) (€)',
    },
    {
      id: '4',
      value: '(Q) - objem výroby (ks...)',
    },
    {
      id: '5',
      value: '(P<sub>m</sub>) - priamy materiál',
    },
    {
      id: '6',
      value: '(P<sub>mz</sub>) - priame mzdy',
    },
    {
      id: '7',
      value: '(P<sub>o</sub>) - ostatné priame náklady',
    },
  ],
  text: '',
  accounts: [''],
  sortable: false,
  hasAnalytic: false,
  dynCols: true,
};

const sortimentSlice = createSlice({
  name: 'sortiment',
  initialState: initialSortimentState,
  reducers: {
    ...rootReducer,
    reset: (state: DefaultState) => {
      state.headers = initialSortimentState.headers;
      state.data = initialSortimentState.data;
      state.items = initialSortimentState.items;
      state.values = initialSortimentState.values;
      state.text = initialSortimentState.text;
    },
    ...openProject,
  },
});

export const sortimentReducer = sortimentSlice.reducer;
export const sortimentActions = sortimentSlice.actions;

export const selectSortiment = (state: RootState) => state.sortiment;

export const hasSortimentChanged = (state: RootState) => {
  return !isEqual(state.sortiment, initialSortimentState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.sortiment.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.sortiment.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.sortiment.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.sortiment.values],
      (values) => values[index],
    ),
  data: createSelector(
    [(state: RootState) => state.sortiment.data],
    (data) => data,
  ),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.sortiment.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.sortiment.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.sortiment.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector(
    [(state: RootState) => state.sortiment.text],
    (text) => text,
  ),
  items: createSelector(
    [(state: RootState) => state.sortiment.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.sortiment.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.sortiment.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions,
  ),
};
