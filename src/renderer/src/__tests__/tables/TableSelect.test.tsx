import '@testing-library/jest-dom';
import TableSelect from '@renderer/components/tables/TableSelect';
import { render, screen, fireEvent, within } from '@testing-library/react';

describe('TableSelect Component', () => {
  const options = ['Option A', 'Option B', 'Option C'];

  it('renders a Select element', () => {
    render(<TableSelect options={options} value={options[0]} />);

    const selectButton = screen.getByRole('combobox');
    expect(selectButton).toBeInTheDocument();
  });

  it('renders the provided options when opened', () => {
    render(<TableSelect options={options} value={options[0]} />);

    const selectButton = screen.getByRole('combobox');
    fireEvent.mouseDown(selectButton);

    const optionsList = screen.getByRole('listbox');

    options.forEach((optionText) => {
      expect(within(optionsList).getByText(optionText)).toBeInTheDocument();
    });
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    render(
      <TableSelect
        options={options}
        value={options[0]}
        onChange={handleChange}
      />,
    );

    const selectButton = screen.getByRole('combobox');
    fireEvent.mouseDown(selectButton);

    const optionB = screen.getByText('Option B');
    fireEvent.click(optionB);

    expect(handleChange).toHaveBeenCalled();
  });
});
