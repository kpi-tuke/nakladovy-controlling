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

const initialTaxState: DefaultState = {
  id: 1,
  title: 'Daňová analýza nákladov',
  corner: 'Ekonomická veličina (€)',
  headers: [
    {
      id: '1',
      type: CellType.STRING,
      label: 'Ďaňovo uznané náklady',
    },
    {
      id: '2',
      type: CellType.STRING,
      label: 'Ďaňovo neuznané náklady',
    },
    {
      id: '3',
      type: CellType.STRING,
      label: 'Výnosy',
    },
  ],
  data: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
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
  dynCols: false,
  itemSelectOptions: allOptions,
  newRowType: CellType.NUMBER,
};

export const taxSlice = createSlice({
  name: 'tax',
  initialState: initialTaxState,
  reducers: {
    ...rootReducer,
    reset: (state: DefaultState) => {
      state.headers = initialTaxState.headers;
      state.data = initialTaxState.data;
      state.items = initialTaxState.items;
      state.values = initialTaxState.values;
      state.text = initialTaxState.text;
    },
    ...openProject,
    ...changeAccount,
    ...sortTableByYear,
    ...sortTableByItemNumber,
  },
});

export const taxActions = taxSlice.actions;
export const taxReducer = taxSlice.reducer;

export const selectTax = (state: RootState) => state.tax;

export const hasTaxChanged = (state: RootState) => {
  return !isEqual(state.tax, initialTaxState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.tax.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.tax.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.tax.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.tax.values],
      (values) => values[index],
    ),
  data: createSelector([(state: RootState) => state.tax.data], (data) => data),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.tax.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.tax.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.tax.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector([(state: RootState) => state.tax.text], (text) => text),
  items: createSelector(
    [(state: RootState) => state.tax.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.tax.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.tax.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
  getRowType: (index) =>
    createSelector(
      [(state: RootState) => state.tax.rowTypes],
      (rowTypes) => rowTypes[index],
    ),
  // @ts-ignore
  getAdditionalData: createSelector(
    [(state: RootState) => state.tax],
    (taxData) => taxData.additionalData,
  ),
};
