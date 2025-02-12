import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import HeaderInput from '@renderer/components/tables/HeaderInput';
import { CellType, Header } from '@renderer/store/rootReducer';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table } from '@renderer/components/tables/Table';

const selectors = {
  headers: (state: any) => state.headers,
  dynCols: (state: any) => state.dynCols,
  selectHeaderByIndex: (index: number) => (state: any) => state.headers[index],
};

const actions = {
  addColumn: jest.fn(() => ({ type: 'ADD_COLUMN' })),
  setHeaderOnIndex: jest.fn((payload) => ({ type: 'SET_HEADER', payload })),
};

jest.mock('../store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockDispatch = jest.fn();

// reset the mock before each test
beforeEach(() => {
  mockDispatch.mockClear();
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
});

const defaultHeaders: Header[] = [
  { id: '1', label: 'Header 1', type: CellType.STRING },
  { id: '2', label: 'Header 2', type: CellType.STRING },
];

const renderComponent = ({
  headers,
  dynCols,
}: {
  headers: Header[];
  dynCols?: boolean;
}) => {
  (useAppSelector as jest.Mock).mockImplementation((selector) => {
    if (selector === selectors.headers) return headers;
    if (selector === selectors.dynCols) return dynCols;
    if (typeof selector === 'function') {
      return selector({ headers });
    }

    return undefined;
  });

  return render(
    <Table>
      <HeaderInput selectors={selectors as any} actions={actions} />
    </Table>,
  );
};

describe('HeaderInput', () => {
  it('should render HeaderInput with 2 inputs', () => {
    renderComponent({
      headers: defaultHeaders,
      dynCols: false,
    });

    const inputs = screen.getAllByRole('textbox');

    expect(inputs).toHaveLength(defaultHeaders.length);
    expect(inputs[0]).toHaveValue('Header 1');
    expect(inputs[1]).toHaveValue('Header 2');
  });

  describe('add column button', () => {
    it('renders the add column button when dynCols is true', () => {
      renderComponent({
        headers: defaultHeaders,
        dynCols: true,
      });

      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
    });

    it('add column button should not be disabled', () => {
      renderComponent({
        headers: defaultHeaders,
        dynCols: true,
      });

      const button = screen.getByRole('button');

      expect(button).not.toBeDisabled();
    });

    it('new column button should be disabled', () => {
      renderComponent({
        headers: [{ id: '1', label: '', type: CellType.STRING }],
        dynCols: true,
      });

      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
    });

    it('addColumn action should be called', () => {
      renderComponent({
        headers: defaultHeaders,
        dynCols: true,
      });

      const button = screen.getByRole('button');

      fireEvent.click(button);
      expect(actions.addColumn).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(actions.addColumn());
    });

    it('dispatches setHeaderOnIndex action when input value changes', () => {
      renderComponent({
        headers: defaultHeaders,
        dynCols: true,
      });
      const newValue = 'New Header 1';

      const input = screen.getAllByRole('textbox')[0];
      fireEvent.change(input, { target: { value: newValue } });
      expect(actions.setHeaderOnIndex).toHaveBeenCalledWith({
        index: 0,
        data: { id: defaultHeaders[0].id, value: newValue },
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('focuses the last input when a new header is added', async () => {
      const { rerender } = renderComponent({
        headers: defaultHeaders,
        dynCols: true,
      });

      const updatedHeaders = [
        ...defaultHeaders,
        { id: '3', label: '', type: CellType.STRING },
      ];

      (useAppSelector as jest.Mock).mockImplementation((selector) => {
        if (selector === selectors.headers) return updatedHeaders;
        if (selector === selectors.dynCols) return true;
        if (typeof selector === 'function')
          return selector({ headers: updatedHeaders });
        return undefined;
      });

      rerender(
        <Table>
          <HeaderInput selectors={selectors as any} actions={actions} />
        </Table>,
      );

      const inputs = screen.getAllByRole('textbox');
      const lastInput = inputs[inputs.length - 1];

      await waitFor(() => {
        expect(document.activeElement).toBe(lastInput);
      });
    });

    it('not focuses any input after last is removed', async () => {
      const { rerender } = renderComponent({
        headers: defaultHeaders,
        dynCols: true,
      });

      const updatedHeaders = [];

      (useAppSelector as jest.Mock).mockImplementation((selector) => {
        if (selector === selectors.headers) return updatedHeaders;
        if (selector === selectors.dynCols) return true;
        if (typeof selector === 'function')
          return selector({ headers: updatedHeaders });
        return undefined;
      });

      rerender(
        <Table>
          <HeaderInput selectors={selectors as any} actions={actions} />
        </Table>,
      );

      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });
});
