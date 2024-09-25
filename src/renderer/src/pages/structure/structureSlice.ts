import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootSelectors, RootState } from '../../store/store';
import {
  DefaultState,
  CellType,
  openProject,
  rootReducer,
  sortTableByItemNumber,
} from '../../store/rootReducer';
import { costOptions } from '@renderer/chartOfAccounts';
import isEqual from 'lodash.isequal';

const initialStructureState: DefaultState = {
  id: 2,
  title: 'Štruktúrna analýza nákladov',
  corner: 'Druhové náklady | Kalkulačné náklady →',
  headers: [
    {
      id: '1',
      type: CellType.NUMBER,
      label: 'Priamy materiál',
    },
  ],
  data: [[0], [0]],
  items: [costOptions[0].label, ''],
  values: [
    {
      id: '1',
      value: costOptions[0].value.toString(),
    },
    {
      id: '2',
      value: '',
    },
  ],
  rowTypes: [CellType.NUMBER, CellType.NUMBER],
  text: '',
  accounts: [''],
  sortable: false,
  hasAnalytic: false,
  dynRows: true,
  dynCols: true,
  itemSelectOptions: costOptions,
  newRowType: CellType.NUMBER,
};

const structureSlice = createSlice({
  name: 'structure',
  initialState: initialStructureState,
  reducers: {
    ...rootReducer,
    reset: (state: DefaultState) => {
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
export const structureReducer = structureSlice.reducer;

export const selectStructure = (state: RootState) => state.structure;

export const hasStructureChanged = (state: RootState) => {
  return !isEqual(state.structure, initialStructureState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.structure.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.structure.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.structure.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.structure.values],
      (values) => values[index],
    ),
  data: createSelector(
    [(state: RootState) => state.structure.data],
    (data) => data,
  ),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.structure.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.structure.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.structure.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector(
    [(state: RootState) => state.structure.text],
    (text) => text,
  ),
  items: createSelector(
    [(state: RootState) => state.structure.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.structure.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.structure.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
  getRowType: (index) =>
    createSelector(
      [(state: RootState) => state.structure.rowTypes],
      (rowTypes) => rowTypes[index],
    ),
  // @ts-ignore
  getAdditionalData: createSelector(
    [(state: RootState) => state.structure],
    (structureData) => structureData.additionalData,
  ),
};
