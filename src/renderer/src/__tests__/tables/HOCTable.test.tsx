import '@testing-library/jest-dom';
import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '@renderer/store/hooks';
import { SortDirection } from '@mui/material';
import { CellType } from '@renderer/store/rootReducer';
import withTable from '@renderer/components/tables/HOCTable';

jest.mock('@renderer/store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@renderer/components/tables/PDFTable', () => () => (
  <div data-testid="pdf-table">PDFTable</div>
));

jest.mock('@renderer/components/Title', () => (props) => (
  <div
    data-testid="title"
    onClick={() => {
      if (props.onSortYear) props.onSortYear('asc');
      if (props.onSortItems) props.onSortItems('desc');
    }}
  >
    Title
  </div>
));

const DummyTableInput: React.FC<any> = (props) => (
  <div data-testid="table-input">TableInput</div>
);

const DummyTableDataHeader: React.FC<any> = (props) => (
  <thead data-testid="table-data-header">
    <tr>
      <th>TableDataHeader</th>
    </tr>
  </thead>
);

const dummyActions = {
  deleteColumn: jest.fn(() => ({ type: 'DELETE_COLUMN' })),
  sortTableByYear: jest.fn((direction: SortDirection) => ({
    type: 'SORT_TABLE_BY_YEAR',
    payload: direction,
  })),
  sortTableByItemNumber: jest.fn((direction: SortDirection) => ({
    type: 'SORT_TABLE_BY_ITEM_NUMBER',
    payload: direction,
  })),
  deleteRow: jest.fn(() => ({ type: 'DELETE_ROW' })),
  setDataOnIndex: jest.fn((payload) => ({
    type: 'SET_DATA_ON_INDEX',
    payload,
  })),
};

const selectors = {
  data: (state: any) => state.data,
  dynCols: (state: any) => state.dynCols,
  values: (state: any) => state.values,
  dynRows: (state: any) => state.dynRows,
  headers: (state: any) => state.headers,
  corner: (state: any) => state.corner,
  selectDataByPosition: (row: number, col: number) => (state: any) =>
    state.data[row][col],
  getRowType: (row: number) => (state: any) => state.rowTypes[row],
};

const dummyState = {
  data: [
    ['1', '2'],
    ['3', '4'],
  ],
  dynCols: true,
  values: [{ id: 'r1' }, { id: 'r2' }],
  dynRows: true,
  headers: [{ id: 'c1' }, { id: 'c2' }],
  rowTypes: [CellType.NUMBER, CellType.STRING],
  corner: 'Corner',
};
let mockDispatch: jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockDispatch = jest.fn();
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  (useAppSelector as jest.Mock).mockImplementation((selector) => {
    if (selector === selectors.data) return dummyState.data;
    if (selector === selectors.dynCols) return dummyState.dynCols;
    if (selector === selectors.values) return dummyState.values;
    if (selector === selectors.dynRows) return dummyState.dynRows;
    if (selector === selectors.headers) return dummyState.headers;
    if (selector === selectors.corner) return dummyState.corner;
    if (typeof selector === 'function') return selector(dummyState);
    return undefined;
  });
});

describe('withTable HOC component', () => {
  const TableComponent = withTable(
    DummyTableInput,
    DummyTableDataHeader,
    selectors as any,
    dummyActions,
  );

  it('renders Title, TableInput, TableDataHeader, and PDFTable', () => {
    render(<TableComponent />);

    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('table-input')).toBeInTheDocument();
    expect(screen.getByTestId('table-data-header')).toBeInTheDocument();
    expect(screen.getByTestId('pdf-table')).toBeInTheDocument();
  });

  it('renders table rows for each data row plus one extra row for column actions', () => {
    const { container } = render(<TableComponent />);

    const tableRows = container.querySelectorAll('tr');
    expect(tableRows.length).toBe(dummyState.data.length + 2);
  });

  it('calls deleteColumn when a column delete button is clicked', () => {
    render(<TableComponent />);

    const deleteButtons = screen.getAllByTestId('delete-column-button');

    fireEvent.click(deleteButtons[0]);
    expect(dummyActions.deleteColumn).toHaveBeenCalled();
  });

  it('calls deleteRow when a row delete button is clicked', () => {
    render(<TableComponent />);
    const deleteButtons = screen.getAllByTestId('delete-row-button');

    expect(deleteButtons.length).toBeGreaterThan(1);
    fireEvent.click(deleteButtons[1]);
    expect(dummyActions.deleteRow).toHaveBeenCalled();
  });

  it('calls sort functions when Title triggers sorting', () => {
    render(<TableComponent />);
    const title = screen.getByTestId('title');
    // Our dummy Title component is defined to call onSortYear with 'asc'
    // and onSortItems with 'desc' when clicked.
    fireEvent.click(title);
    expect(dummyActions.sortTableByYear).toHaveBeenCalledWith('asc');
    expect(dummyActions.sortTableByItemNumber).toHaveBeenCalledWith('desc');
    // Also, check that dispatch was called with these actions.
    expect(mockDispatch).toHaveBeenCalled();
  });

  // it('updates scroll position when data length increases', () => {
  //   // To test the scroll effect in the useEffect, we simulate a change in the data length.
  //   // First, render the component and capture the TableWrapper element (the scrolling container).
  //   const { container, rerender } = render(<TableComponent />);
  //   const tableWrapper = container.querySelector('div');
  //   // Fake scroll properties on the container.
  //   if (tableWrapper) {
  //     // @ts-ignore
  //     tableWrapper.scrollWidth = 500;
  //     tableWrapper.scrollLeft = 0;
  //   }
  //   // Now, update dummyState.data to have an increased length in the first row.
  //   dummyState.data = [
  //     ['1', '2', '3'],
  //     ['3', '4', '5'],
  //   ];
  //   (useAppSelector as jest.Mock).mockImplementation((selector) => {
  //     if (selector === selectors.data) return dummyState.data;
  //     if (selector === selectors.dynCols) return dummyState.dynCols;
  //     if (selector === selectors.values) return dummyState.values;
  //     if (selector === selectors.dynRows) return dummyState.dynRows;
  //     if (selector === selectors.headers) return dummyState.headers;
  //     if (selector === selectors.corner) return dummyState.corner;
  //     if (typeof selector === 'function') return selector(dummyState);
  //     return undefined;
  //   });
  //   // Use act() to flush useEffect.
  //   act(() => {
  //     rerender(<TableComponent />);
  //   });
  //   if (tableWrapper) {
  //     expect(tableWrapper.scrollLeft).toBe(tableWrapper.scrollWidth);
  //   }
  // });

  it('calls setDataOnIndex when a cell TextField changes', () => {
    render(<TableComponent />);
    // In the Cell component, a MUI TextField is rendered with a placeholder of '0' for NUMBER types.
    const inputs = screen.getAllByPlaceholderText('0');

    fireEvent.change(inputs[0], { target: { value: '123' } });
    expect(dummyActions.setDataOnIndex).toHaveBeenCalledWith({
      data: '123',
      row: 0,
      col: 0,
      type: dummyState.rowTypes[0],
    });
  });
});
