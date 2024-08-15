import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
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
      type: HeaderType.STRING,
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
    'Predajná cena jednotková',
    'Úplné vlastné náklady jednotkové',
    'Priame náklady jednotkové',
    'Objem výroby',
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
export const selectSortiment = (state: RootState) => state.sortiment;
export const sortimentActions = sortimentSlice.actions;

export const hasSortimentChanged = (state: RootState) => {
  return !isEqual(state.sortiment, initialSortimentState);
};
