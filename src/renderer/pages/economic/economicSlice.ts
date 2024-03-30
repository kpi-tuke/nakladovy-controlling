import { createSlice } from '@reduxjs/toolkit';
import {
  changeAccount,
  defaultState,
  openProject,
  rootReducer,
} from '../../store/rootReducer';
import { RootState } from '../../store/store';

const initialEconomicState: defaultState = {
  id: 1,
  title: 'Ekonomická analýza hospodárenia',
  corner: 'Ekonomická položka (Náklady(€) /Výnosy(€))',
  headers: ['2000'],
  data: [[0], [0]],
  items: [
    '501 – Spotreba materiálu',
    '666 – Výnosy z krátkodobého finančného majetku',
  ],
  values: ['501', '666'],
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
  },
});

export const economicActions = economicSlice.actions;
export const selectEconomic = (state: RootState) => state.economic;
export const economicReducer = economicSlice.reducer;
// economicSlice.getInitialState: () => State
