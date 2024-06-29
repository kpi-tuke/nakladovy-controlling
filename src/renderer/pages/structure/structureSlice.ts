import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import {
  defaultState,
  openProject,
  rootReducer,
} from '../../store/rootReducer';
import groupedOptions from 'renderer/chartOfAccounts';

const initialStructureState: defaultState = {
  id: 2,
  title: 'Štruktúrna analýza',
  corner: '↓Nákladové druhy | Kalkulačné položky→',
  headers: ['Priamy materiál'],
  data: [[0]],
  items: [groupedOptions[0].options[0].label],
  values: [groupedOptions[0].options[0].value.toString()],
  text: '',
  accounts: [''],
  sortable: false,
  hasAnalytic: false,
  dynRows: true,
  dynCols: true,
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
  },
});

export const structureActions = structureSlice.actions;
export const selectStructure = (state: RootState) => state.structure;
export const structureReducer = structureSlice.reducer;
