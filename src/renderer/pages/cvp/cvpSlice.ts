import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { DefaultState, HeaderType, rootReducer } from '../../store/rootReducer';
import isEqual from 'lodash.isequal';

export interface CVPState extends DefaultState {
  fixTotal: number;
  minProfit: number;
}

const initialCVPState: CVPState = {
  id: 4,
  title: 'CVP analýza',
  corner: 'Názov výrobku',
  headers: [
    {
      type: HeaderType.NUMBER,
      label: '(Q) - objem produkcie',
    },
    {
      type: HeaderType.STRING,
      label: 'merná jednotka',
    },
    {
      type: HeaderType.NUMBER,
      label: '(Pcj) - predajná cena jednotková (€)',
    },
    {
      type: HeaderType.NUMBER,
      label: '(Nvj) - variabilné náklady jednotkové (€)',
    },
    {
      type: HeaderType.NUMBER,
      label: '(F<sub>n</sub>) fixné náklady (€)',
    },
    {
      type: HeaderType.NUMBER,
      label: '(Z<sub>min</sub>) minimálny zisk (€)',
    },
  ],
  items: ['Výrobok A'],
  data: [[0, '', 0, 0, 0, 0]],
  values: ['Výrobok A'],
  text: '',
  accounts: [''],
  sortable: false,
  hasAnalytic: false,
  fixTotal: 0,
  minProfit: 0,
  dynRows: true,
};

const CVPSlice = createSlice({
  name: 'CVP',
  initialState: initialCVPState,
  reducers: {
    ...rootReducer,
    reset: (state) => {
      state.headers = initialCVPState.headers;
      state.data = initialCVPState.data;
      state.items = initialCVPState.items;
      state.values = initialCVPState.values;
      state.text = initialCVPState.text;
    },
    openProject: (state: CVPState, action: PayloadAction<CVPState>) => {
      state.headers = action.payload.headers;
      state.data = action.payload.data;
      state.items = action.payload.items;
      state.values = action.payload.values;
      state.text = action.payload.text;
      state.fixTotal = action.payload.fixTotal;
      state.minProfit = action.payload.minProfit;
    },
  },
});

export const CVPActions = CVPSlice.actions;
export const selectCVP = (state: RootState) => state.cvp;
export const CVPReducer = CVPSlice.reducer;

export const hasCvpChanged = (state: RootState) => {
  return !isEqual(state.cvp, initialCVPState);
};
