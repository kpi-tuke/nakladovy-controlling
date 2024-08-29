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
import {
  costOptions,
  profitOptions,
  allOptions,
} from '@renderer/chartOfAccounts';
import isEqual from 'lodash.isequal';

const initialEconomicState: DefaultState = {
  id: 1,
  title: 'Ekonomická analýza hospodárenia',
  corner: 'Ekonomická veličina (€)',
  headers: [
    {
      id: '1',
      type: HeaderType.NUMBER,
      label: '2000',
    },
  ],
  data: [[0], [0], [0]],
  items: [costOptions[0].label, profitOptions[0].label, ''],
  values: [
    costOptions[0].value.toString(),
    profitOptions[0].value.toString(),
    '',
  ],
  text: '',
  accounts: [''],
  sortable: true,
  hasAnalytic: true,
  dynRows: true,
  dynCols: true,
  itemSelectOptions: allOptions,
};

export const economicSlice = createSlice({
  name: 'economic',
  initialState: initialEconomicState,
  reducers: {
    ...rootReducer,
    reset: (state: DefaultState) => {
      state.headers = initialEconomicState.headers;
      state.data = initialEconomicState.data;
      state.items = initialEconomicState.items;
      state.values = initialEconomicState.values;
      state.text = initialEconomicState.text;
    },
    ...openProject,
    ...changeAccount,
    ...sortTableByYear,
    ...sortTableByItemNumber,
  },
});

export const economicActions = economicSlice.actions;
export const economicReducer = economicSlice.reducer;

export const selectEconomic = (state: RootState) => state.economic;

export const hasEconomicChanged = (state: RootState) => {
  return !isEqual(state.economic, initialEconomicState);
};

export const selectHeaderByIndex = (index) =>
  createSelector(
    [(state: RootState) => state.economic.headers],
    (headers) => headers[index],
  );

export const selectors: RootSelectors = {
  headers: (state: RootState) => state.economic.headers,
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.economic.headers],
      (headers) => headers[index],
    ),
  data: (state: RootState) => state.economic.data,
  dynRows: (state: RootState) => state.economic.dynRows,
  dynCols: (state: RootState) => state.economic.dynCols,
  text: (state: RootState) => state.economic.text,
  items: (state: RootState) => state.economic.items,
  corner: (state: RootState) => state.economic.corner,
  values: (state: RootState) => state.economic.values,
  itemSelectOptions: (state: RootState) => state.economic.itemSelectOptions,
};
