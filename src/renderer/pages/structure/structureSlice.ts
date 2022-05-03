import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";
import {defaultState, openProject, rootReducer} from "../../store/rootReducer";

const initialStructureState: defaultState = {
  headers: ['Priamy materiál'],
  data: [[0]],
  items: ['501 – Spotreba materiálu'],
  values: ['1'],
  text: '',
  accounts: [""],
};

const structureSlice = createSlice({
  name: 'structure',
  initialState: initialStructureState,
  reducers: {
    ...rootReducer,
    reset: (state:defaultState) => {
      state.headers = initialStructureState.headers;
      state.data = initialStructureState.data;
      state.items = initialStructureState.items;
      state.values = initialStructureState.values;
      state.text = initialStructureState.text;
    },
    ...openProject
  },
});

export const structureActions = structureSlice.actions;
export const selectStructure = (state: RootState) => state.structure;
export const structureReducer = structureSlice.reducer;
