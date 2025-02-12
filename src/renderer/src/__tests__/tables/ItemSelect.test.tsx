import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ADD_CUSTOM_ITEM_LABEL } from '@renderer/chartOfAccounts';
import ItemSelect from '@renderer/components/tables/ItemSelect';

jest.mock('@renderer/store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@mui/material/Autocomplete', () => (props: any) => {
  return (
    <select
      data-testid="autocomplete"
      value={props.value ? props.value.label : ''}
      onChange={(e) => {
        const selectedOption = props.options.find(
          (option: any) => option.label === e.target.value,
        );
        props.onChange(null, selectedOption);
      }}
    >
      {props.options.map((option: any) => (
        <option key={option.value} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

const defaultCorner = 'Test Corner';
const defaultItems = ['Option 100', 'Option 200'];
const defaultValues = [
  { id: '1', value: '100' },
  { id: '2', value: '200' },
];
const defaultOptions = [
  { value: 100, label: 'Option 100', type: 'A' },
  { value: 200, label: 'Option 200', type: 'A' },
  { value: 300, label: 'Option 300', type: 'B' },
  { value: 0, label: ADD_CUSTOM_ITEM_LABEL, type: 'custom' },
];

const selectors = {
  corner: (state: any) => state.corner,
  items: (state: any) => state.items,
  values: (state: any) => state.values,
  itemSelectOptions: (state: any) => state.itemSelectOptions,
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

const mockDispatch = jest.fn();

beforeEach(() => {
  mockDispatch.mockClear();
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  (useAppSelector as jest.Mock).mockClear();
  actions.addRow.mockClear();
  actions.setItemsOnIndex.mockClear();
  actions.setValuesOnIndex.mockClear();
});

const renderComponent = (state: any) => {
  (useAppSelector as jest.Mock).mockImplementation((selector) => {
    if (selector === selectors.corner) return state.corner;
    if (selector === selectors.items) return state.items;
    if (selector === selectors.values) return state.values;
    if (selector === selectors.itemSelectOptions)
      return state.itemSelectOptions;
    if (typeof selector === 'function') return selector(state);
    return undefined;
  });
  return render(<ItemSelect selectors={selectors as any} actions={actions} />);
};

describe('ItemSelect Component', () => {
  const state = {
    corner: defaultCorner,
    items: defaultItems,
    values: defaultValues,
    itemSelectOptions: defaultOptions,
  };

  it('renders the corner text in TableCorner', () => {
    renderComponent(state);
    expect(screen.getByText(defaultCorner)).toBeInTheDocument();
  });

  it('renders one row per value plus an add button row', () => {
    const { container } = renderComponent(state);

    const tbody = container.querySelector('tbody');
    expect(tbody).toBeInTheDocument();
    const rows = tbody?.querySelectorAll('tr');
    expect(rows?.length).toBe(defaultValues.length + 1);
  });

  it('renders the add row button and clicking it dispatches addRow action', () => {
    renderComponent(state);

    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);

    expect(actions.addRow).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(actions.addRow());
  });

  it('disables the add row button if any item is empty', () => {
    const stateWithEmpty = { ...state, items: ['Option 100', ''] };
    renderComponent(stateWithEmpty);

    const addButton = screen.getByRole('button');
    expect(addButton).toBeDisabled();
  });

  describe('Row Component behavior', () => {
    it('renders Autocomplete when value.value is not "-1"', () => {
      renderComponent(state);

      const autocomplete = screen.getAllByTestId('autocomplete')[0];

      expect(autocomplete).toBeInTheDocument();
      expect(autocomplete).toHaveValue('Option 100');
    });

    it('dispatches setItemsOnIndex and setValuesOnIndex when Autocomplete selection changes', () => {
      renderComponent(state);

      const autocomplete = screen.getAllByTestId('autocomplete')[0];

      fireEvent.change(autocomplete, { target: { value: 'Option 300' } });

      expect(actions.setItemsOnIndex).toHaveBeenCalledWith({
        data: 'Option 300',
        index: 0,
      });
      expect(actions.setValuesOnIndex).toHaveBeenCalledWith({
        index: 0,
        data: { value: '300', id: defaultValues[0].id },
      });
    });

    it('dispatches addRow if the new selection is not in items and the row is last', () => {
      renderComponent(state);

      const autocompletes = screen.getAllByTestId('autocomplete');
      expect(autocompletes.length).toBeGreaterThan(0);
      const secondAutocomplete = autocompletes[1];

      fireEvent.change(secondAutocomplete, { target: { value: 'Option 300' } });
      expect(actions.addRow).toHaveBeenCalled();
    });

    it('renders TableInput when value.value equals "-1"', () => {
      const customState = {
        ...state,
        values: [{ id: '1', value: '-1' }, ...state.values.slice(1)],
      };

      renderComponent(customState);

      const input = screen.getByPlaceholderText('Zadajte názov položky...');
      expect(input).toBeInTheDocument();
    });

    it('dispatches setItemsOnIndex when TableInput loses focus', () => {
      const customState = {
        ...state,
        values: [{ id: '1', value: '-1' }, ...state.values.slice(1)],
      };
      renderComponent(customState);

      const input = screen.getByPlaceholderText('Zadajte názov položky...');
      fireEvent.blur(input, { target: { value: 'New Item Name' } });

      expect(actions.setItemsOnIndex).toHaveBeenCalledWith({
        data: 'New Item Name',
        index: 0,
      });
    });
  });
});
