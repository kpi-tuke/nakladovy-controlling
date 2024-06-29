import { createSlice } from '@reduxjs/toolkit';
import {
  changeAccount,
  defaultState,
  openProject,
  rootReducer,
  sortTableByItemNumber,
  sortTableByYear,
} from '../../store/rootReducer';
import { RootState } from '../../store/store';
import groupedOptions from 'renderer/chartOfAccounts';

const initialEconomicState: defaultState = {
  id: 1,
  title: 'Ekonomická analýza hospodárenia',
  corner: 'Ekonomická položka (Náklady(€) /Výnosy(€))',
  headers: ['2000'],
  data: [[1], [4]],
  items: [
    groupedOptions[0].options[0].label,
    groupedOptions[1].options[0].label,
  ],
  values: [
    groupedOptions[0].options[0].value.toString(),
    groupedOptions[1].options[0].value.toString(),
  ],
  text: '',
  accounts: [''],
  sortable: true,
  hasAnalytic: true,
  dynRows: true,
  dynCols: true,
};

export const economicSlice = createSlice({
  name: 'economic',
  initialState: initialEconomicState,
  reducers: {
    ...rootReducer,
    reset: (state: defaultState) => {
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
export const selectEconomic = (state: RootState) => state.economic;
export const economicReducer = economicSlice.reducer;
// economicSlice.getInitialState: () => State
