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
} from '@renderer/store/rootReducer';
import { RootSelectors, RootState } from '@renderer/store/store';
import isEqual from 'lodash.isequal';

const initialVariationState: DefaultState = {
  id: 1,
  title: 'Odchýlková analýza nákladov',
  corner: 'Ekonomická veličina (€)',
  headers: [
    {
      id: '1',
      type: CellType.STRING,
      label: 'Plán',
    },
    {
      id: '2',
      type: CellType.STRING,
      label: 'Skutočnosť',
    },
  ],
  data: [
    [0, 0],
    [0, 0],
    [0, 0],
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

export const variationSlice = createSlice({
  name: 'variation',
  initialState: initialVariationState,
  reducers: {
    ...rootReducer,
    reset: (state: DefaultState) => {
      state.headers = initialVariationState.headers;
      state.data = initialVariationState.data;
      state.items = initialVariationState.items;
      state.values = initialVariationState.values;
      state.text = initialVariationState.text;
    },
    ...openProject,
    ...changeAccount,
    ...sortTableByItemNumber,
  },
});

export const variationActions = variationSlice.actions;
export const variationReducer = variationSlice.reducer;

export const selectVariation = (state: RootState) => state.variation;

export const hasVariationChanged = (state: RootState) => {
  return !isEqual(state.variation, initialVariationState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.variation.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.variation.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.variation.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.variation.values],
      (values) => values[index],
    ),
  data: createSelector(
    [(state: RootState) => state.variation.data],
    (data) => data,
  ),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.variation.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.variation.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.variation.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector(
    [(state: RootState) => state.variation.text],
    (text) => text,
  ),
  items: createSelector(
    [(state: RootState) => state.variation.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.variation.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.variation.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
  getRowType: (index) =>
    createSelector(
      [(state: RootState) => state.variation.rowTypes],
      (rowTypes) => rowTypes[index],
    ),
  // @ts-ignore
  getAdditionalData: createSelector(
    [(state: RootState) => state.variation],
    (variationData) => variationData.additionalData,
  ),
};
