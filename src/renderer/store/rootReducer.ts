import { PayloadAction } from '@reduxjs/toolkit';
import { isNumeric } from 'renderer/helper';
import { SortDirection } from 'renderer/types/sortDirection';

export enum HeaderType {
  STRING = 'STRING',
  SELECT = 'SELECT',
}

type HeaderOption = {
  label: string;
  value: string;
};

export type Header = {
  label: string;
  type: HeaderType;
  options?: HeaderOption[];
};

export type CellValue = number | string;

export interface DefaultState {
  id: number;
  title: string;
  corner: string;
  headers: Header[];
  data: CellValue[][];
  items: string[];
  values: string[];
  text: string;
  accounts: string[];
  sortable: boolean;
  hasAnalytic: boolean;
  dynRows?: boolean;
  dynCols?: boolean;
  // TODO: prepisat
  itemSelectOptions?: any;
}

export interface dataOnIndex {
  data: string;
  index: number;
}

export interface dataOnCords {
  data: number;
  row: number;
  col: number;
  type: HeaderType;
}

export const rootReducer = {
  setHeadersOnIndex: (
    state: DefaultState,
    action: PayloadAction<dataOnIndex>
  ) => {
    state.headers[action.payload.index] = {
      label: action.payload.data,
      type: HeaderType.STRING,
    };
  },
  setItemsOnIndex: (
    state: DefaultState,
    action: PayloadAction<dataOnIndex>
  ) => {
    state.items[action.payload.index] = action.payload.data;
  },
  setValuesOnIndex: (
    state: DefaultState,
    action: PayloadAction<dataOnIndex>
  ) => {
    state.values[action.payload.index] = action.payload.data;
  },
  setDataOnIndex: (state: DefaultState, action: PayloadAction<dataOnCords>) => {
    if (action.payload.type === HeaderType.SELECT) {
      console.log('payload: ', action.payload);
      state.data[action.payload.row][action.payload.col] = action.payload.data;
    } else {
      state.data[action.payload.row][action.payload.col] = isNaN(
        action.payload.data
      )
        ? 0
        : action.payload.data;
    }
  },
  addColumn: (state: DefaultState): void => {
    state.headers.push({ label: '', type: HeaderType.STRING });
    state.data.map((rowData: any) => {
      rowData.push(0);
    });
  },
  addRow: (state: DefaultState) => {
    state.items.push('');
    state.accounts.push('');
    let arr: any[] = [];
    for (let i = 0; i < state.data[0].length; i++) {
      arr.push(0);
    }
    state.data.push(arr);
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
    action: PayloadAction<SortDirection>
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
      () => []
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
    action: PayloadAction<SortDirection>
  ) => {
    const { headers, data, items, values, text } = state;

    const sortedValues =
      action.payload === 'desc'
        ? [...values].sort((a, b) => +a - +b)
        : [...values].sort((a, b) => +b - +a);

    const { validValues, invalidValues } = items.reduce(
      (acc, item) => {
        const number = item.split('-')[0].replaceAll(' ', '');

        if (isNumeric(number)) {
          acc.validValues.push(item);
        } else {
          acc.invalidValues.push(item);
        }

        return acc;
      },
      { invalidValues: [], validValues: [] }
    );

    const sortedItems = validValues.sort((a, b) => {
      const aNumber = a.split('-')[0].replaceAll(' ', '');
      const bNumber = b.split('-')[0].replaceAll(' ', '');

      return action.payload === 'desc'
        ? +bNumber - +aNumber
        : +aNumber - +bNumber;
    });

    const finalItems = [...sortedItems, ...invalidValues];

    const formattedData: { [key: string]: CellValue[] } = {};

    values.forEach((value, index) => {
      formattedData[value] = data[index];
    });

    const sortedData: CellValue[][] = [];

    sortedValues.forEach((item) => {
      sortedData.push(formattedData[item]);
    });

    state.headers = headers;
    state.data = sortedData;
    state.items = finalItems;
    state.values = sortedValues;
    state.text = text;

    return;
  },
};
