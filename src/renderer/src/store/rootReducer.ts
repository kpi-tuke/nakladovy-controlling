import { PayloadAction } from '@reduxjs/toolkit';
import { isNumeric } from '@renderer/helper';
import { SortDirection } from '@renderer/types/sortDirection';
import { v4 as uuidv4 } from 'uuid';

export enum CellType {
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  SELECT = 'SELECT',
}

type HeaderOption = {
  label: string;
  value: string;
};

export type Header = {
  id: string;
  label: string;
  type: CellType;
  options?: HeaderOption[];
};

export type Value = {
  id: string;
  value: string;
};

export type CellValue = number | string;

export type ItemSelectOption = {
  value: number;
  label: string;
  type: InputSelectType;
};

export enum InputSelectType {
  COSTS = 'Náklady',
  PROFITS = 'Výnosy',
  CUSTOM = 'custom',
}

export interface DefaultState {
  id: number;
  title: string;
  corner: string;
  headers: Header[];
  data: CellValue[][];
  items: string[];
  values: Value[];
  text: string;
  accounts: string[];
  sortable: boolean;
  hasAnalytic: boolean;
  dynRows?: boolean;
  dynCols?: boolean;
  itemSelectOptions?: ItemSelectOption[];
  rowTypes: CellType[];
  newRowType?: CellType;
}

export interface dataOnIndex {
  data: string;
  index: number;
}

export interface dataOnCords {
  data: number;
  row: number;
  col: number;
  type: CellType;
}

export const rootReducer = {
  setHeaderOnIndex: (
    state: DefaultState,
    action: PayloadAction<{
      index: number;
      data: {
        id: string;
        value: string;
      };
    }>,
  ) => {
    state.headers[action.payload.index] = {
      id: action.payload.data.id,
      label: action.payload.data.value,
      type: CellType.NUMBER,
    };
  },
  setItemsOnIndex: (
    state: DefaultState,
    action: PayloadAction<dataOnIndex>,
  ) => {
    state.items[action.payload.index] = action.payload.data;
  },
  setValuesOnIndex: (
    state: DefaultState,
    action: PayloadAction<{
      index: number;
      data: {
        id: string;
        value: string;
      };
    }>,
  ) => {
    state.values[action.payload.index] = action.payload.data;
  },
  setDataOnIndex: (state: DefaultState, action: PayloadAction<dataOnCords>) => {
    if (
      action.payload.type === CellType.SELECT ||
      action.payload.type === CellType.STRING
    ) {
      state.data[action.payload.row][action.payload.col] = action.payload.data;
    } else {
      state.data[action.payload.row][action.payload.col] = isNaN(
        action.payload.data,
      )
        ? 0
        : action.payload.data;
    }
  },
  addColumn: (state: DefaultState): void => {
    state.headers.push({ id: uuidv4(), label: '', type: CellType.NUMBER });
    state.data.map((rowData, index) => {
      rowData.push(state.rowTypes[index] === CellType.NUMBER ? 0 : '');
    });
  },
  addRow: (state: DefaultState) => {
    state.items.push('');
    state.values.push({
      id: uuidv4(),
      value: '',
    });
    let arr: any[] = [];
    for (let i = 0; i < state.data[0].length; i++) {
      arr.push(state.newRowType === CellType.NUMBER ? 0 : '');
    }
    state.data.push(arr);
    state.rowTypes.push(state.newRowType || CellType.NUMBER);
  },
  deleteRow: (state: DefaultState, action: PayloadAction<number>) => {
    if (state.items.length === 1) return;
    state.items.splice(action.payload, 1);
    state.data.splice(action.payload, 1);
    state.values.splice(action.payload, 1);
  },
  deleteColumn: (state: DefaultState, action: PayloadAction<number>) => {
    if (state.headers.length === 1) return;
    state.data.map((rowData: CellValue[]) => {
      rowData.splice(action.payload, 1);
    });
    state.headers.splice(action.payload, 1);
  },
  changeText: (state: DefaultState, action: PayloadAction<string>) => {
    state.text = action.payload;
  },
};

export const changeAccount = {
  changeAccount: (state: DefaultState, action: PayloadAction<dataOnIndex>) => {
    state.accounts[action.payload.index] = action.payload.data;
  },
};

export const openProject = {
  openProject: (state: DefaultState, action: PayloadAction<DefaultState>) => {
    state.headers = action.payload.headers;
    state.data = action.payload.data;
    state.items = action.payload.items;
    state.values = action.payload.values;
    state.text = action.payload.text;
  },
};

export const sortTableByYear = {
  sortTableByYear: (
    state: DefaultState,
    action: PayloadAction<SortDirection>,
  ) => {
    const { headers, data, items, values, text, id } = state;

    const offset = id === 3 ? 1 : 0;

    if (new Set(headers).size !== headers.length) return;

    for (let i = offset; i < headers.length; i++) {
      if (!isNumeric(headers[i].label)) {
        throw new Error('Hlavička musí obsahovať LEN číslo!');
      }
    }

    const formattedData: { [key: string]: CellValue[] } = {};

    headers.forEach((header, index) => {
      formattedData[header.label] = [];
      formattedData[header.label] = data.map((row) => row[index]);
    });

    const sortedHeaders =
      action.payload === 'desc'
        ? [...headers].sort((a, b) => +b.label - +a.label)
        : [...headers].sort((a, b) => +a.label - +b.label);

    const sortedData: CellValue[][] = Array.from(
      { length: data.length },
      () => [],
    );

    for (let i = 0; i < sortedHeaders.length; i++) {
      for (let j = 0; j < formattedData[sortedHeaders[i].label].length; j++) {
        sortedData[j].push(formattedData[sortedHeaders[i].label][j]);
      }
    }

    state.headers = sortedHeaders;
    state.data = sortedData;
    state.items = items;
    state.values = values;
    state.text = text;

    return;
  },
};

export const sortTableByItemNumber = {
  sortTableByItemNumber: (
    state: DefaultState,
    action: PayloadAction<SortDirection>,
  ) => {
    const { data, items, values } = state;

    // VALUES
    const { validValues, invalidValues } = values.reduce(
      (acc, item) => {
        if (!!item.value) {
          acc.validValues.push(item);
        } else {
          acc.invalidValues.push(item);
        }

        return acc;
      },
      { invalidValues: [] as Value[], validValues: [] as Value[] },
    );

    const sortedValidValues =
      action.payload === SortDirection.ASC
        ? validValues.sort((a, b) => +a.value - +b.value)
        : validValues.sort((a, b) => +b.value - +a.value);

    const sortedValues = [...sortedValidValues, ...invalidValues];

    // ITEMS
    const { validItems, invalidItems } = items.reduce(
      (acc, item) => {
        const number = item.split('-')[0].replaceAll(' ', '');

        if (isNumeric(number)) {
          acc.validItems.push(item);
        } else {
          acc.invalidItems.push(item);
        }

        return acc;
      },
      { invalidItems: [] as string[], validItems: [] as string[] },
    );

    const sortedValidItems = validItems.sort((a, b) => {
      const aNumber = a.split('-')[0].replaceAll(' ', '');
      const bNumber = b.split('-')[0].replaceAll(' ', '');

      return action.payload === 'desc'
        ? +bNumber - +aNumber
        : +aNumber - +bNumber;
    });

    const sortedItems = [...sortedValidItems, ...invalidItems];

    // DATA
    const formattedData: { [key: string]: CellValue[] } = {};

    values.forEach((value, index) => {
      formattedData[value.value] = data[index];
    });

    const sortedData: CellValue[][] = [];

    sortedValues.forEach((item) => {
      sortedData.push(formattedData[item.value]);
    });

    state.data = sortedData;
    state.items = sortedItems;
    state.values = sortedValues;

    return;
  },
};
