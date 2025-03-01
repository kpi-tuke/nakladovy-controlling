import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '@renderer/store/hooks';
import HeaderSelect from '@renderer/components/tables/HeaderSelect';
import '@testing-library/jest-dom';
import { Table } from '@renderer/components/tables/Table';

jest.mock('@renderer/store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@renderer/components/tables/TableSelect', () => (props: any) => {
  return (
    <select
      data-testid="table-select"
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
});

const mockDispatch = jest.fn();

beforeEach(() => {
  mockDispatch.mockClear();
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
});

const selectCol = [
  { value: 7, label: 'Priamy materiál' },
  { value: 8, label: 'Priame mzdy' },
  { value: 9, label: 'Ostatné priame náklady' },
  { value: 10, label: 'Výrobná réžia technologická' },
  { value: 11, label: 'Výrobná réžia všeobecná' },
  { value: 12, label: 'Správna réžia' },
  { value: 15, label: 'Dopravná réžia' },
  { value: 14, label: 'Zásobovacia réžia' },
  { value: 13, label: 'Odbytová réžia' },
];

const defaultHeaders = [
  { id: '1', label: 'Priamy materiál', type: 'string' },
  { id: '2', label: 'Priame mzdy', type: 'string' },
];

const selectors = {
  headers: (state: any) => state.headers,
  dynCols: (state: any) => state.dynCols,
  selectHeaderByIndex: (index: number) => (state: any) => state.headers[index],
};

const actions = {
  addColumn: jest.fn(() => ({ type: 'ADD_COLUMN' })),
  setHeaderOnIndex: jest.fn((payload) => ({ type: 'SET_HEADER', payload })),
};

const renderComponent = ({
  headers,
  dynCols,
}: {
  headers: any[];
  dynCols: boolean;
}) => {
  (useAppSelector as jest.Mock).mockImplementation((selector) => {
    if (selector === selectors.headers) return headers;
    if (selector === selectors.dynCols) return dynCols;
    if (typeof selector === 'function') return selector({ headers });
    return undefined;
  });
  return render(
    <Table>
      <HeaderSelect selectors={selectors as any} actions={actions} />
    </Table>,
  );
};

describe('HeaderSelect Component', () => {
  it('renders header selects with correct initial values', () => {
    renderComponent({ headers: defaultHeaders, dynCols: true });

    const selects = screen.getAllByTestId('table-select');
    expect(selects).toHaveLength(defaultHeaders.length);

    defaultHeaders.forEach((header) => {
      expect(screen.getByDisplayValue(header.label)).toBeInTheDocument();
    });
  });

  it('renders the add column button when headers length is less than selectCol length', () => {
    renderComponent({ headers: defaultHeaders, dynCols: true });
    const addButton = screen.getByRole('button');
    expect(addButton).toBeInTheDocument();
  });

  it('does not render the add column button when headers length equals selectCol length', () => {
    const headers = Array.from({ length: selectCol.length }, (_, i) => ({
      id: `${i + 1}`,
      label: `Label ${i + 1}`,
      type: 'string',
    }));

    renderComponent({ headers, dynCols: true });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('disables the add column button if any header label is empty', () => {
    const headers = [
      { id: '1', label: 'Priamy materiál', type: 'string' },
      { id: '2', label: '', type: 'string' },
    ];

    renderComponent({ headers, dynCols: true });

    const addButton = screen.getByRole('button');
    expect(addButton).toBeDisabled();
  });

  it('dispatches addColumn action when the add button is clicked', () => {
    renderComponent({ headers: defaultHeaders, dynCols: true });

    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);

    expect(actions.addColumn).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(actions.addColumn());
  });

  it('dispatches setHeaderOnIndex action when a TableSelect value is changed', () => {
    renderComponent({ headers: defaultHeaders, dynCols: true });

    const selects = screen.getAllByTestId('table-select');
    const firstSelect = selects[0];

    fireEvent.change(firstSelect, { target: { value: 'Odbytová réžia' } });
    expect(actions.setHeaderOnIndex).toHaveBeenCalledWith({
      index: 0,
      data: {
        id: defaultHeaders[0].id,
        value: 'Odbytová réžia',
      },
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('computes available options correctly for a select', () => {
    const headers = [
      { id: '1', label: 'Priamy materiál', type: 'string' },
      { id: '2', label: 'Priame mzdy', type: 'string' },
    ];
    renderComponent({ headers, dynCols: true });

    const firstSelect = screen.getAllByTestId('table-select')[0];
    const optionElements = firstSelect.querySelectorAll('option');
    const renderedOptions = Array.from(optionElements).map(
      (opt) => opt.textContent,
    );

    const expectedOptions = selectCol
      .filter(
        (option) =>
          option.label !== 'Priamy materiál' && option.label !== 'Priame mzdy',
      )
      .map((option) => option.label);
    expectedOptions.push('Priamy materiál');

    expectedOptions.forEach((expectedOption) => {
      expect(renderedOptions).toContain(expectedOption);
    });
  });
});
