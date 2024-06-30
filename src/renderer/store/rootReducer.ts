import { PayloadAction } from '@reduxjs/toolkit';
import { off } from 'process';
import { isNumeric } from 'renderer/helper';
import { SortDirection } from 'renderer/types/sortDirection';

export interface defaultState {
  id: number;
  title: string;
  corner: string;
  headers: string[];
  data: number[][];
  items: string[];
  values: string[];
  text: string;
  accounts: string[];
  sortable: boolean;
  hasAnalytic: boolean;
  dynRows?: boolean;
  dynCols?: boolean;
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

export const rootReducer = {
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
  addRow: (state: {
    items: string[];
    data: number[][];
    accounts: string[];
  }) => {
    state.items.push('');
    state.accounts.push('');
    let arr: any[] = [];
    for (let i = 0; i < state.data[0].length; i++) {
      arr.push(0);
    }
    state.data.push(arr);
  },
  deleteRow: (
    state: { items: string[]; data: number[][]; values: string[] },
    action: PayloadAction<number>
  ) => {
    if (state.items.length === 1) return;
    state.items.splice(action.payload, 1);
    state.data.splice(action.payload, 1);
    state.values.splice(action.payload, 1);
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

export const changeAccount = {
  changeAccount: (
    state: { accounts: string[] },
    action: PayloadAction<dataOnIndex>
  ) => {
    state.accounts[action.payload.index] = action.payload.data;
  },
};

export const openProject = {
  openProject: (
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

export const sortTableByYear = {
  sortTableByYear: (
    state: {
      headers: string[];
      data: number[][];
      items: string[];
      values: string[];
      text: string;
      id: number;
    },
    action: PayloadAction<SortDirection>
  ) => {
    const { headers, data, items, values, text, id } = state;

    const offset = id === 3 ? 1 : 0;

    if (new Set(headers).size !== headers.length) return;

    for (let i = offset; i < headers.length; i++) {
      if (!isNumeric(headers[i])) {
        throw new Error('Hlavička musí obsahovať LEN číslo!');
      }
    }

    const formattedData: { [key: string]: number[] } = {};

    headers.forEach((header, index) => {
      formattedData[header] = [];
      formattedData[header] = data.map((row) => row[index]);
    });

    const sortedHeaders =
      action.payload === 'desc'
        ? [...headers].sort((a, b) => +b - +a)
        : [...headers].sort((a, b) => +a - +b);

    const sortedData: number[][] = Array.from(
      { length: data.length },
      () => []
    );

    for (let i = 0; i < sortedHeaders.length; i++) {
      for (let j = 0; j < formattedData[sortedHeaders[i]].length; j++) {
        sortedData[j].push(formattedData[sortedHeaders[i]][j]);
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
    state: {
      headers: string[];
      data: number[][];
      items: string[];
      values: string[];
      text: string;
    },
    action: PayloadAction<SortDirection>
  ) => {
    const { headers, data, items, values, text } = state;

    const sortedValues =
      action.payload === 'desc'
        ? [...values].sort((a, b) => +a - +b)
        : [...values].sort((a, b) => +b - +a);

    const sortedItems = items.sort((a, b) => {
      const aNumber = a.split('-')[0].replaceAll(' ', '');
      const bNumber = b.split('-')[0].replaceAll(' ', '');

      return action.payload === 'desc'
        ? +bNumber - +aNumber
        : +aNumber - +bNumber;
    });

    const formattedData: { [key: string]: number[] } = {};

    values.forEach((value, index) => {
      formattedData[value] = data[index];
    });

    const sortedData: number[][] = [];

    sortedValues.forEach((item) => {
      sortedData.push(formattedData[item]);
    });

    state.headers = headers;
    state.data = sortedData;
    state.items = sortedItems;
    state.values = sortedValues;
    state.text = text;

    return;
  },
};
