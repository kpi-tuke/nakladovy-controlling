import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import {
  defaultState,
  HeaderType,
  openProject,
  rootReducer,
  sortTableByItemNumber,
} from '../../store/rootReducer';
import { costOptions } from 'renderer/chartOfAccounts';

const initialStructureState: defaultState = {
  id: 2,
  title: 'Štruktúrna analýza nákladov',
  corner: '↓Nákladové druhy | Kalkulačné položky→',
  headers: [
    {
      type: HeaderType.STRING,
      label: 'Priamy materiál',
    },
  ],
  data: [[0], [0]],
  items: [costOptions[0].label, ''],
  values: [costOptions[0].value.toString(), ''],
  // options: groupedOptions,
  text: '',
  accounts: [''],
  sortable: false,
  hasAnalytic: false,
  dynRows: true,
  dynCols: true,
  itemSelectOptions: costOptions,
};

const structureSlice = createSlice({
  name: 'structure',
  initialState: initialStructureState,
  reducers: {
    ...rootReducer,
    reset: (state: defaultState) => {
      state.headers = initialStructureState.headers;
      state.data = initialStructureState.data;
      state.items = initialStructureState.items;
      state.values = initialStructureState.values;
      state.text = initialStructureState.text;
    },
    ...openProject,
    ...sortTableByItemNumber,
  },
});

export const structureActions = structureSlice.actions;
export const selectStructure = (state: RootState) => state.structure;
export const structureReducer = structureSlice.reducer;
