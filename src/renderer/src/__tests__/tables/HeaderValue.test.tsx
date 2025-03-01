import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '@renderer/store/hooks';
import { CellType, Header } from '@renderer/store/rootReducer';
import HeaderValue from '@renderer/components/tables/HeaderValue';
import { Table } from '@renderer/components/tables/Table';

jest.mock('@renderer/store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockDispatch = jest.fn();

beforeEach(() => {
  mockDispatch.mockClear();
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
});

const defaultHeaders = [
  { id: '1', label: 'Header 1', type: CellType.STRING },
  { id: '2', label: 'Header 2', type: CellType.STRING },
];

const selectors = {
  headers: (state: any) => state.headers,
  dynCols: (state: any) => state.dynCols,
  selectHeaderByIndex: (index: number) => (state: any) => state.headers[index],
};

const actions = {
  addColumn: jest.fn(() => ({ type: 'ADD_COLUMN' })),
};

const mockUseAppSelector = (headers: Header[], dynCols: boolean) => {
  (useAppSelector as jest.Mock).mockImplementation((selector) => {
    if (selector === selectors.headers) return headers;
    if (selector === selectors.dynCols) return dynCols;
    if (typeof selector === 'function') return selector({ headers });

    return undefined;
  });
};

const renderComponent = ({
  headers,
  dynCols,
}: {
  headers: Header[];
  dynCols: boolean;
}) => {
  mockUseAppSelector(headers, dynCols);

  return render(
    <Table>
      <HeaderValue selectors={selectors as any} actions={actions} />
    </Table>,
  );
};

describe('HeaderValue Component', () => {
  it('renders header labels inside Typography', () => {
    renderComponent({ headers: defaultHeaders, dynCols: true });

    defaultHeaders.forEach((header) => {
      expect(screen.getByText(header.label)).toBeInTheDocument();
    });
  });

  it('renders the add column button if dynCols is true', () => {
    renderComponent({ headers: defaultHeaders, dynCols: true });

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('does not render the add column button if dynCols is false', () => {
    renderComponent({ headers: defaultHeaders, dynCols: false });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('disables the add column button if any header label is empty', () => {
    const headersWithEmpty = [
      { id: '1', label: 'Header 1', type: CellType.STRING },
      { id: '2', label: '', type: CellType.STRING },
    ];

    renderComponent({ headers: headersWithEmpty, dynCols: true });

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('dispatches addColumn action when the add button is clicked', () => {
    renderComponent({ headers: defaultHeaders, dynCols: true });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(actions.addColumn).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(actions.addColumn());
  });
});
