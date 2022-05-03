import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";
import {defaultState, rootReducer} from "../../store/rootReducer";

export interface CVPState extends defaultState {
  fixTotal: number;
  minProfit: number;
}

const initialCVPState: CVPState = {
  headers: [
    '(Q) - objem produkcie (ks...)',
    '(Pcj) - predajná cena jednotková (€)',
    '(Nvj) - variabilné náklady jednotkové (€)',
  ],
  items: ['Výrobok A'],
  data: [[0, 0, 0]],
  values: ['Výrobok A'],
  text: '',
  accounts: [""],
  fixTotal: 0,
  minProfit: 0,
};

const CVPSlice = createSlice({
  name: 'CVP',
  initialState: initialCVPState,
  reducers: {
    ...rootReducer,
    setFixTotal: (
      state: { fixTotal: number },
      action: PayloadAction<number>
    ) => {
      state.fixTotal = action.payload;
    },
    setMinProfit: (
      state: { minProfit: number },
      action: PayloadAction<number>
    ) => {
      state.minProfit = action.payload;
    },
    // @ts-ignore
    reset: (state) => {
      state.headers = initialCVPState.headers;
      state.data = initialCVPState.data;
      state.items = initialCVPState.items;
      state.values = initialCVPState.values;
      state.text = initialCVPState.text;
    },
    openProject : (state: CVPState, action: PayloadAction<CVPState>) => {
      state.headers = action.payload.headers
      state.data = action.payload.data
      state.items = action.payload.items
      state.values = action.payload.values
      state.text = action.payload.text
      state.fixTotal = action.payload.fixTotal
      state.minProfit = action.payload.minProfit
      // state = action.payload
    }
  },
});

export const CVPActions = CVPSlice.actions;
export const selectCVP = (state: RootState) => state.cvp;
export const CVPReducer = CVPSlice.reducer;
