import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootSelectors, RootState } from '../../store/store';
import { DefaultState, CellType, rootReducer } from '../../store/rootReducer';
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
      id: '1',
      type: CellType.STRING,
      label: 'Výrobok A',
    },
  ],
  data: [[0], [''], [0], [0], [0], [0]],
  values: [
    {
      id: '1',
      value: '(Q) - objem produkcie (množstvo)',
    },
    {
      id: '2',
      value: 'merná jednotka',
    },
    {
      id: '3',
      value: '(Pcj) - predajná cena jednotková (€)',
    },
    {
      id: '4',
      value: '(Nvj) - variabilné náklady jednotkové (€)',
    },
    {
      id: '5',
      value: '(F<sub>n</sub>) fixné náklady (€)',
    },
    {
      id: '6',
      value: '(Z<sub>min</sub>) minimálny zisk (€)',
    },
  ],
  items: [
    '(Q) - objem produkcie (množstvo)',
    'merná jednotka',
    '(Pcj) - predajná cena jednotková (€)',
    '(Nvj) - variabilné náklady jednotkové (€)',
    '(F<sub>n</sub>) fixné náklady (€)',
    '(Z<sub>min</sub>) minimálny zisk (€)',
  ],
  rowTypes: [
    CellType.NUMBER,
    CellType.STRING,
    CellType.NUMBER,
    CellType.NUMBER,
    CellType.NUMBER,
    CellType.NUMBER,
  ],
  text: '',
  accounts: [''],
  sortable: false,
  hasAnalytic: false,
  fixTotal: 0,
  minProfit: 0,
  dynRows: false,
  dynCols: true,
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
export const CVPReducer = CVPSlice.reducer;

export const selectCVP = (state: RootState) => state.cvp;

export const hasCvpChanged = (state: RootState) => {
  return !isEqual(state.cvp, initialCVPState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.cvp.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.cvp.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.cvp.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.cvp.values],
      (values) => values[index],
    ),
  data: createSelector([(state: RootState) => state.cvp.data], (data) => data),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.cvp.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.cvp.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.cvp.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector([(state: RootState) => state.cvp.text], (text) => text),
  items: createSelector(
    [(state: RootState) => state.cvp.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.cvp.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.cvp.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
  getRowType: (index) =>
    createSelector(
      [(state: RootState) => state.cvp.rowTypes],
      (rowTypes) => rowTypes[index],
    ),
};
