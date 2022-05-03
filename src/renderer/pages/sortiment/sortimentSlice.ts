import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";
import {defaultState, openProject, rootReducer} from "../../store/rootReducer";

const initialSortimentState: defaultState = {
  headers: ['Výrobok A'],
  data: [[0], [0], [0], [0]],
  items: [
    '(Pn) - priame náklady (€)',
    '(ÚVN) -  úplné vlastné náklady výkonu (€)',
    '(Pcj) - Predajná cena (jednotková) (€)',
    '(Q) - Objem výroby (ks...)',
  ],
  values: [
    'Predajná cena jednotková',
    'Úplné vlastné náklady jednotkové',
    'Priame náklady jednotkové',
    'Objem výroby',
  ],
  text: '',
  accounts: [""],
};

const sortimentSlice = createSlice({
  name: 'sortiment',
  initialState: initialSortimentState,
  reducers: {
    ...rootReducer,
    reset: (state: defaultState) => {
      state.headers = initialSortimentState.headers;
      state.data = initialSortimentState.data;
      state.items = initialSortimentState.items;
      state.values = initialSortimentState.values;
      state.text = initialSortimentState.text;
    },
    ...openProject
  },
});

export const sortimentReducer = sortimentSlice.reducer;
export const selectSortiment = (state: RootState) => state.sortiment;
export const sortimentActions = sortimentSlice.actions;
