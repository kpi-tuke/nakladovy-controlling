import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface defaultState {
  headers: string[];
  data: number[][];
  items: string[];
  values: string[];
  text: string;
}

export interface CVPState extends defaultState {
  fixTotal: number;
  minProfit: number;
}

export interface dataOnIndex {
  data: string;
  index: number;
}

export interface dataOnCords {
  data: number;
  row: number;
  col: number;
}

// functions to manipulate data in table
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
    state.data[action.payload.row][action.payload.col] = isNaN(
      action.payload.data
    )
      ? 0
      : action.payload.data;
  },
  addColumn: (state: { headers: string[]; data: number[][] }): void => {
    state.headers.push('');
    state.data.map((rowData: any) => {
      rowData.push(0);
    });
  },
  addRow: (state: { items: string[]; data: number[][] }) => {
    state.items.push('');
    let arr: any[] = [];
    for (let i = 0; i < state.data[0].length; i++) {
      arr.push(0);
    }
    state.data.push(arr);
  },
  deleteRow: (
    state: { items: string[]; data: number[][] },
    action: PayloadAction<number>
  ) => {
    if (state.items.length === 1) return;
    state.items.splice(action.payload, 1);
    state.data.splice(action.payload, 1);
  },
  deleteColumn: (
    state: { headers: string[]; data: number[][] },
    action: PayloadAction<number>
  ) => {
    if (state.headers.length === 1) return;
    state.data.map((rowData: number[]) => {
      rowData.splice(action.payload, 1);
    });
    state.headers.splice(action.payload, 1);
  },
  changeText: (state: { text: string }, action: PayloadAction<string>) => {
    state.text = action.payload;
  },
};

const open = {
  open: (
    state: {
      headers: string[];
      data: number[][];
      items: string[];
      values: string[];
      text: string;
    },
    action: PayloadAction<defaultState>
  ) => {
    state.headers = action.payload.headers;
    state.data = action.payload.data;
    state.items = action.payload.items;
    state.values = action.payload.values;
    state.text = action.payload.text;
  },
};

const initialSortimentState: defaultState = {
  headers: ['VýrobokA'],
  data: [[0], [0], [0], [0]],
  items: [
    'Priame náklady (€)',
    'Úplné vlastné náklady výkonu (€)',
    'Predajná cena (jednotková) (€)',
    'Objem výroby (ks...)',
  ],
  values: [
    'Predajná cena jednotková',
    'Úplné vlastné náklady jednotkové',
    'Priame náklady jednotkové',
    'Objem výroby',
  ],
  text: '',
};

const initialEconomicState: defaultState = {
  headers: ['2000'],
  data: [[0], [0]],
  items: [
    '501 – Spotreba materiálu',
    '666 – Výnosy z krátkodobého finančného majetku',
  ],
  values: ['501', '666'],
  text: '',
};

const initialIndexState: defaultState = {
  headers: ['Bázický rok', '2000', '2001'],
  data: [
    [0, 0, 0],
    [0, 0, 0],
  ],
  items: [
    '501 – Spotreba materiálu',
    '666 – Výnosy z krátkodobého finančného majetku',
  ],
  values: ['501', '666'],
  text: '',
};

const initialCVPState: CVPState = {
  headers: [
    'Objem produkcie (ks...)',
    'Cena jednotková (€)',
    'Variabilné náklady jednotkové (€)',
  ],
  items: ['Výrobok A'],
  data: [[0, 0, 0]],
  values: ['Výrobok A'],
  text: '',
  fixTotal: 0,
  minProfit: 0,
};

const initialStructureState: defaultState = {
  headers: ['Priamy materiál'],
  data: [[0]],
  items: ['501 – Spotreba materiálu'],
  values: ['1'],
  text: '',
};

const initialParetoState: defaultState = {
  headers: ['Náklady (€)'],
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
  text: '',
};

const projectSlice = createSlice({
  name: "project",
  initialState: {created: false},
  reducers: {
    setCreated: state => {
      state.created = true
    }
  }
})

const economicSlice = createSlice({
  name: 'economic',
  initialState: initialEconomicState,
  reducers: {
    ...reducerFunctions,
    // @ts-ignore
    reset: (state) => {
      state.headers = initialEconomicState.headers;
      state.data = initialEconomicState.data;
      state.items = initialEconomicState.items;
      state.values = initialEconomicState.values;
      state.text = initialEconomicState.text;
    },
    ...open,
  },

});

const sortimentSlice = createSlice({
  name: 'sortiment',
  initialState: initialSortimentState,
  reducers: {
    ...reducerFunctions,
    // @ts-ignore
    reset: (state) => {
      state.headers = initialSortimentState.headers;
      state.data = initialSortimentState.data;
      state.items = initialSortimentState.items;
      state.values = initialSortimentState.values;
      state.text = initialSortimentState.text;
    },
    ...open
  },
});

// @ts-ignore
const indexSlice = createSlice({
  name: 'chain',
  initialState: initialIndexState,
  reducers: {
    ...reducerFunctions,
    // @ts-ignore
    reset: (state) => {
      state.headers = initialIndexState.headers;
      state.data = initialIndexState.data;
      state.items = initialIndexState.items;
      state.values = initialIndexState.values;
      state.text = initialIndexState.text;
    },
    ...open
  },
});

const CVPSlice = createSlice({
  name: 'CVP',
  initialState: initialCVPState,
  reducers: {
    ...reducerFunctions,
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
    open : (state, action: PayloadAction<CVPState>) => {
      state.headers = action.payload.headers
      state.data = action.payload.data
      state.items = action.payload.items
      state.values = action.payload.values
      state.text = action.payload.text
      state.fixTotal = action.payload.fixTotal
      state.minProfit = action.payload.minProfit
    }
  },
});

const structureSlice = createSlice({
  name: 'structure',
  initialState: initialStructureState,
  reducers: {
    ...reducerFunctions,
    // @ts-ignore
    reset: (state) => {
      state.headers = initialStructureState.headers;
      state.data = initialStructureState.data;
      state.items = initialStructureState.items;
      state.values = initialStructureState.values;
      state.text = initialStructureState.text;
    },
    ...open
  },
});

const paretoSlice = createSlice({
  name: 'pareto',
  initialState: initialParetoState,
  reducers: {
    ...reducerFunctions,
    reset: (state) => {
      state.headers = initialParetoState.headers;
      state.data = initialParetoState.data;
      state.items = initialParetoState.items;
      state.values = initialParetoState.values;
      state.text = initialParetoState.text;
    },
    ...open
  },
});

const reportSlice = createSlice({
  name: 'report',
  initialState: { tasks: [] },
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      // @ts-ignore
      if (!state.tasks.includes(action.payload))
        // @ts-ignore
        state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      // @ts-ignore
      if (state.tasks.includes(action.payload))
        // @ts-ignore
        state.tasks = state.tasks.filter((id: string) => id !== action.payload);
        console.log(state.tasks)
    },
    // @ts-ignore
    reset: (state) => {
      state.tasks = [];
    },
    open: (state, action: PayloadAction<string[]>) => {
      // @ts-ignore
      state.tasks = action.payload
    }
  },
});

export const projectActions = projectSlice.actions;

export const economicActions = economicSlice.actions;

export const sortimentActions = sortimentSlice.actions;

export const indexActions = indexSlice.actions;

export const CVPActions = CVPSlice.actions;

export const structureActions = structureSlice.actions;

export const paretoActions = paretoSlice.actions;

export const reportActions = reportSlice.actions;

export const selectProject = (state: RootState) => state.project;

export const selectEconomic = (state: RootState) => state.economic;

export const selectSortiment = (state: RootState) => state.sortiment;

export const selectChain = (state: RootState) => state.chain;

export const selectCVP = (state: RootState) => state.cvp;

export const selectStructure = (state: RootState) => state.structure;

export const selectPareto = (state: RootState) => state.pareto;

export const selectReport = (state: RootState) => state.report;

export const projectReducer = projectSlice.reducer;

export const economicReducer = economicSlice.reducer;

export const sortimentReducer = sortimentSlice.reducer;

export const chainReducer = indexSlice.reducer;

export const CVPReducer = CVPSlice.reducer;

export const structureReducer = structureSlice.reducer;

export const paretoReducer = paretoSlice.reducer;

export const reportReducer = reportSlice.reducer;
