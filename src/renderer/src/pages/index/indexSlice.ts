import { createSlice } from '@reduxjs/toolkit';
import {
  changeAccount,
  DefaultState,
  HeaderType,
  openProject,
  rootReducer,
  sortTableByItemNumber,
  sortTableByYear,
} from '../../store/rootReducer';
import { RootState } from '../../store/store';
import { allOptions, customOption } from '@renderer/chartOfAccounts';
import isEqual from 'lodash.isequal';

const initialIndexState: DefaultState = {
  id: 3,
  title: 'Analýza reťazových a bázických indexov',
  corner: 'Ekonomická položka (€)',
  headers: [
    {
      type: HeaderType.NUMBER,
      label: 'Bázický rok',
    },
    {
      type: HeaderType.NUMBER,
      label: '2000',
    },
    {
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
  values: ['501', '666', ''],
  itemSelectOptions: [...allOptions, customOption],
  text: '',
  accounts: [''],
  sortable: true,
  hasAnalytic: true,
  dynRows: true,
  dynCols: true,
};

export const indexSlice: any = createSlice({
  name: 'chain',
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
export const selectIndex = (state: RootState) => state.index;
export const indexReducer = indexSlice.reducer;

export const hasIndexChanged = (state: RootState) => {
  return !isEqual(state.index, initialIndexState);
};
