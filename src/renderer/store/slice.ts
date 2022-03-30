import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './store'

export interface BilanceState {
  headers: string[],
  data: number[][],
  items: string[],
  values: string[],
  text: string
}

export interface CVPState extends BilanceState {
  fixTotal: number,
  minProfit: number
}

export interface dataOnIndex {
  data: string,
  index: number
}

export interface dataOnCords {
  data: number;
  row: number;
  col: number;
}

const reducerFunctions = {
  setHeadersOnIndex: (
    state: { headers: string[] },
    action: PayloadAction<dataOnIndex>
  ) => {
    state.headers[action.payload.index] = action.payload.data;
  },
  setItemsOnIndex: (
    state: { items: string[] },
    action: PayloadAction<dataOnIndex>
  ) => {
    state.items[action.payload.index] = action.payload.data;
  },
  setValuesOnIndex: (
    state: { values: string[] },
    action: PayloadAction<dataOnIndex>
  ) => {
    state.values[action.payload.index] = action.payload.data;
  },
  setDataOnIndex: (
    state: { data: number[][] },
    action: PayloadAction<dataOnCords>
  ) => {
    state.data[action.payload.row][action.payload.col] = action.payload.data;
  },
  addColumn: (state: { headers: string[]; items: string[]; data: number[][] }) => {
    state.headers.push((parseInt(state.headers[state.headers.length - 1]) + 1).toString());
    state.data.map((rowData: any) => {
      rowData.push('0');
    });
  },
  addRow: (state: { headers: string[]; items: string[]; data: number[][] }) => {
    state.items.push('--please input value--');
    let arr: any[] = [];
    for (let i = 0; i < state.headers.length; i++) {
      arr.push('0');
    }
    state.data.push(arr);
  },
  deleteRow: (state: { items: string[]; data: number[][] }, action: PayloadAction<number>) => {
    if (state.items.length === 1) return;
    state.items.splice(action.payload, 1);
    state.data.splice(action.payload, 1);
  },
  deleteColumn: (state: { headers: string[]; data: number[][] }, action: PayloadAction<number>) => {
    if (state.headers.length === 1) return
    state.data.map((rowData: number[]) => {
      rowData.splice(action.payload, 1);
    })
    state.headers.splice(action.payload, 1);
  },
  changeText: (state: {text: string}, action: PayloadAction<string>) => {
    state.text = action.payload
  }
};

const initialSortimentState: BilanceState = {
  headers: ['VýrobokA'],
  data: [
    [0],
    [0],
    [0],
    [0],
  ],
  items: [
    'Priame náklady(€)',
    'Úplné vlastné náklady výkonu (€)',
    'Predajná cena výkonu(jednotková)(€)',
    'Objem výroby(množstvo)',
  ],
  values: [
    'Predajná cena jednotková',
    'Úplné vlastné náklady jednotkové',
    'Priame náklady jednotkové',
    'Objem výroby',
  ],
  text: ""
};

const initialBilanceState: BilanceState = {
  headers: ['2000'],
  data: [
    [0],
    [0],
  ],
  items: [
    '501 – Spotreba materiálu',
    '666 – Výnosy z krátkodobého finančného majetku',
  ],
  values: ['501', '666'],
  text: ""
};

const initialChainState: BilanceState = {
  headers: ["Bázický rok", '2000', '2001'],
  data: [
    [0, 0, 0],
    [0, 0, 0],
  ],
  items: [
    '501 – Spotreba materiálu',
    '666 – Výnosy z krátkodobého finančného majetku',
  ],
  values: ['501', '666'],
  text: ""
};

const initialCVPState: CVPState = {
  headers: ['Výroba(ks, kg, ton, ...)', 'Cena/množstvo(€/ks, kg, ton, ...)', 'Variabilné náklady/množstvo(€/ks, kg, ton, ...)'],
  items: ['Výrobok A'],
  data: [[0, 0, 0,]],
  values: ['Výrobok A'],
  text: "",
  fixTotal: 0,
  minProfit: 0
};

const initialStructureState: BilanceState = {
  headers: ['Priamy materiál'],
  data: [[0]],
  items: ['501 – Spotreba materiálu'],
  values: ['1'],
  text: ""
};

const initialParetoState: BilanceState = {
  headers: ['Náklady(€)'],
  data: [[3998], [1307], [361], [82], [104], [1573], [5]],
  items: [
    'Chyby mechanického trieskového opracovania',
    'Chyby tvárnenia materiálu',
    'Materiálové chyby',
    'Chyby zvárania',
    'Chyby povrchu a povrchovej úpravy',
    'Chyby kompletizácie, balenia',
    'Chyby dokumentácie',
  ],
  values: [
    'Chyby mechanického trieskového opracovania',
    'Chyby tvárnenia materiálu',
    'Materiálové chyby',
    'Chyby zvárania',
    'Chyby povrchu a povrchovej úpravy',
    'Chyby kompletizácie, balenia',
    'Chyby dokumentácie',
  ],
  text: ""
};

const bilanceSlice = createSlice({
  name: 'bilance',
  initialState: initialBilanceState,
  reducers: reducerFunctions
});

const sortimentSlice = createSlice({
  name: 'sortiment',
  initialState: initialSortimentState,
  reducers: reducerFunctions,
});

const chainSlice = createSlice({
  name: 'chain',
  initialState: initialChainState,
  reducers: reducerFunctions,
});

const CVPSlice = createSlice( {
  name: "CVP",
  initialState: initialCVPState,
  reducers: {
    ...reducerFunctions,
    setFixTotal: (state: { fixTotal: number }, action: PayloadAction<number>) => {
      state.fixTotal = action.payload
    },
    setMinProfit: (state: { minProfit: number }, action: PayloadAction<number>) => {
      state.minProfit = action.payload
    }
  }
})

const structureSlice = createSlice({
  name: 'structure',
  initialState: initialStructureState,
  reducers: reducerFunctions,
});

const paretoSlice = createSlice({
  name: 'pareto',
  initialState: initialParetoState,
  reducers: reducerFunctions,
});

export const bilanceActions = bilanceSlice.actions

export const sortimentActions = sortimentSlice.actions

export const chainActions = chainSlice.actions;

export const CVPActions = CVPSlice.actions;

export const structureActions = structureSlice.actions;

export const paretoActions = paretoSlice.actions;


export const selectBilance = (state: RootState) => state.bilance;

export const selectSortiment = (state: RootState) => state.sortiment;

export const selectChain = (state: RootState) => state.chain;

export const selectCVP = (state: RootState) => state.cvp;

export const selectStructure = (state: RootState) => state.structure;

export const selectPareto = (state: RootState) => state.pareto;


export const bilanceReducer = bilanceSlice.reducer

export const sortimentReducer = sortimentSlice.reducer

export const chainReducer = chainSlice.reducer;

export const CVPReducer = CVPSlice.reducer;

export const structureReducer = structureSlice.reducer;

export const paretoReducer = paretoSlice.reducer;
