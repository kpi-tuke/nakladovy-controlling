import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { defaultState, HeaderType, rootReducer } from '../../store/rootReducer';
import { MeasureUnit } from 'renderer/theme/measureUnit';

export interface CVPState extends defaultState {
  fixTotal: number;
  minProfit: number;
}

const initialCVPState: CVPState = {
  id: 4,
  title: 'CVP analýza',
  corner: 'Názov výrobku',
  headers: [
    {
      type: HeaderType.STRING,
      label: '(Q) - objem produkcie',
    },
    {
      type: HeaderType.SELECT,
      label: 'merná jednotka',
      options: [
        {
          label: MeasureUnit.PIECE,
          value: MeasureUnit.PIECE,
        },
        {
          label: MeasureUnit.KILOGRAM,
          value: MeasureUnit.KILOGRAM,
        },
        {
          label: MeasureUnit.TONNE,
          value: MeasureUnit.TONNE,
        },
        {
          label: MeasureUnit.GRAM,
          value: MeasureUnit.GRAM,
        },
      ],
    },
    {
      type: HeaderType.STRING,
      label: '(Pcj) - predajná cena jednotková (€)',
    },
    {
      type: HeaderType.STRING,
      label: '(Nvj) - variabilné náklady jednotkové (€)',
    },
    {
      type: HeaderType.STRING,
      label: '(F<sub>n</sub>) fixné náklady (€)',
    },
    {
      type: HeaderType.STRING,
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
    // @ts-ignore
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
      // state = action.payload
    },
  },
});

export const CVPActions = CVPSlice.actions;
export const selectCVP = (state: RootState) => state.cvp;
export const CVPReducer = CVPSlice.reducer;
