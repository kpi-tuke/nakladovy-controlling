import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useAppSelector } from '@renderer/store/hooks';
import ItemValue from '@renderer/components/tables/ItemValue';

jest.mock('@renderer/store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

const selectors = {
  corner: (state: any) => state.corner,
  items: (state: any) => state.items,
};

const renderComponent = ({
  corner,
  items,
}: {
  corner: string;
  items: string[];
}) => {
  (useAppSelector as jest.Mock).mockImplementation((selector) => {
    if (selector === selectors.corner) return corner;
    if (selector === selectors.items) return items;
    if (typeof selector === 'function') return selector({ corner, items });
    return undefined;
  });
  return render(<ItemValue selectors={selectors as any} />);
};

describe('ItemValue Component', () => {
  const cornerText = 'Corner Text';
  const items = ['<div>Item 1</div>', '<div>Item 2</div>'];

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockClear();
  });

  it('renders the corner text in the table header', () => {
    renderComponent({ corner: cornerText, items });
    expect(screen.getByText(cornerText)).toBeInTheDocument();
  });

  it('renders each item in a styled cell', () => {
    renderComponent({ corner: cornerText, items });

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders an extra row for the ActionCellBottom in the table body', () => {
    const { container } = renderComponent({ corner: cornerText, items });

    const tbody = container.querySelector('tbody');
    expect(tbody).toBeInTheDocument();
    const rows = tbody?.querySelectorAll('tr');
    expect(rows?.length).toBe(items.length + 1);
  });
});
