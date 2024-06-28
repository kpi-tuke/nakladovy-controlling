import { createSlice } from '@reduxjs/toolkit';
import {
  changeAccount,
  defaultState,
  openProject,
  rootReducer,
} from '../../store/rootReducer';
import { RootState } from '../../store/store';

const initialIndexState: defaultState = {
  id: 3,
  title: 'Analýza reťazových a bázických indexov',
  corner: 'Ekonomická položka (€)',
  headers: ['Bázický rok', '2000', '2001'],
  data: [
    [0, 0, 0],
    [0, 0, 0],
  ],
  items: [
    '501 - Spotreba materiálu',
    '666 - Výnosy z krátkodobého finančného majetku',
  ],
  values: ['501', '666'],
  text: '',
  accounts: [''],
  sortable: true,
  hasAnalytic: true,
  dynRows: true,
  dynCols: true,
};

export const indexSlice = createSlice({
  name: 'chain',
  initialState: initialIndexState,
  reducers: {
    ...rootReducer,
    // @ts-ignore
    reset: (state) => {
      state.headers = initialIndexState.headers;
      state.data = initialIndexState.data;
      state.items = initialIndexState.items;
      state.values = initialIndexState.values;
      state.text = initialIndexState.text;
    },
    ...openProject,
    ...changeAccount,
  },
});

export const indexActions = indexSlice.actions;
export const selectIndex = (state: RootState) => state.index;
export const indexReducer = indexSlice.reducer;
