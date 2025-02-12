import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ItemInput from '@renderer/components/tables/ItemInput';

jest.mock('@renderer/store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const defaultCorner = 'My Corner';
const defaultValues = [
  { id: '1', value: 'Value 1' },
  { id: '2', value: 'Value 2' },
];
const defaultDynRows = true;

const selectors = {
  corner: (state: any) => state.corner,
  values: (state: any) => state.values,
  dynRows: (state: any) => state.dynRows,
  selectValueByIndex: (index: number) => (state: any) => state.values[index],
};

const actions = {
  addRow: jest.fn(() => ({ type: 'ADD_ROW' })),
  setItemsOnIndex: jest.fn((payload) => ({
    type: 'SET_ITEMS_ON_INDEX',
    payload,
  })),
  setValuesOnIndex: jest.fn((payload) => ({
    type: 'SET_VALUES_ON_INDEX',
    payload,
  })),
};

const renderComponent = ({
  corner,
  values,
  dynRows,
}: {
  corner: string;
  values: any[];
  dynRows: boolean;
}) => {
  (useAppSelector as jest.Mock).mockImplementation((selector) => {
    if (selector === selectors.corner) return corner;
    if (selector === selectors.values) return values;
    if (selector === selectors.dynRows) return dynRows;
    if (typeof selector === 'function')
      return selector({ corner, values, dynRows });
    return undefined;
  });
  return render(<ItemInput selectors={selectors as any} actions={actions} />);
};

const mockDispatch = jest.fn();

beforeEach(() => {
  mockDispatch.mockClear();
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

  actions.addRow.mockClear();
  actions.setItemsOnIndex.mockClear();
  actions.setValuesOnIndex.mockClear();
});

describe('ItemInput Component', () => {
  it('renders the corner text in the table header', () => {
    renderComponent({
      corner: defaultCorner,
      values: defaultValues,
      dynRows: defaultDynRows,
    });

    expect(screen.getByText(defaultCorner)).toBeInTheDocument();
  });

  it('renders one input row per value', () => {
    renderComponent({
      corner: defaultCorner,
      values: defaultValues,
      dynRows: defaultDynRows,
    });

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(defaultValues.length);

    defaultValues.forEach((val) => {
      expect(screen.getByDisplayValue(val.value)).toBeInTheDocument();
    });
  });

  it('renders the add row button when dynRows is true', () => {
    renderComponent({
      corner: defaultCorner,
      values: defaultValues,
      dynRows: true,
    });

    const addButton = screen.getByRole('button');
    expect(addButton).toBeInTheDocument();
  });

  it('does not render the add row button when dynRows is false', () => {
    renderComponent({
      corner: defaultCorner,
      values: defaultValues,
      dynRows: false,
    });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('disables the add row button if any value is empty', () => {
    const valuesWithEmpty = [
      { id: '1', value: 'Value 1' },
      { id: '2', value: '' },
    ];
    renderComponent({
      corner: defaultCorner,
      values: valuesWithEmpty,
      dynRows: true,
    });
    const addButton = screen.getByRole('button');
    expect(addButton).toBeDisabled();
  });

  it('dispatches addRow action when the add row button is clicked', () => {
    renderComponent({
      corner: defaultCorner,
      values: defaultValues,
      dynRows: true,
    });
    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);
    expect(actions.addRow).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(actions.addRow());
  });

  it('dispatches setItemsOnIndex (with label value) and setValuesOnIndex actions when an input value changes', async () => {
    renderComponent({
      corner: defaultCorner,
      values: defaultValues,
      dynRows: defaultDynRows,
    });
    const input = screen.getAllByRole('textbox')[0];

    fireEvent.change(input, {
      target: { value: 'New Value', label: 'New Label' },
    });

    expect(actions.setItemsOnIndex).toHaveBeenCalledWith({
      index: 0,
      data: 'New Label',
    });

    expect(actions.setValuesOnIndex).toHaveBeenCalledWith({
      index: 0,
      data: { id: defaultValues[0].id, value: 'New Value' },
    });

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('dispatches setItemsOnIndex (with "value" value) and setValuesOnIndex actions when an input value changes', async () => {
    renderComponent({
      corner: defaultCorner,
      values: defaultValues,
      dynRows: defaultDynRows,
    });
    const input = screen.getAllByRole('textbox')[0];

    fireEvent.change(input, {
      target: { value: 'New Value', label: null },
    });

    expect(actions.setItemsOnIndex).toHaveBeenCalledWith({
      index: 0,
      data: 'New Value',
    });

    expect(actions.setValuesOnIndex).toHaveBeenCalledWith({
      index: 0,
      data: { id: defaultValues[0].id, value: 'New Value' },
    });

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
