import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useAppSelector } from '@renderer/store/hooks';
import { splitTable } from '@renderer/helper';
import PDFTable from '@renderer/components/tables/PDFTable';

jest.mock('@renderer/store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@renderer/helper', () => ({
  splitTable: jest.fn(),
}));

const selectors = {
  corner: (state: any) => state.corner,
  headers: (state: any) => state.headers,
  items: (state: any) => state.items,
  data: (state: any) => state.data,
};

const renderComponent = (state: {
  corner: string;
  headers: { label: string }[];
  items: string[];
  data: string[][];
}) => {
  (useAppSelector as jest.Mock).mockImplementation((selector) => {
    if (selector === selectors.corner) return state.corner;
    if (selector === selectors.headers) return state.headers;
    if (selector === selectors.items) return state.items;
    if (selector === selectors.data) return state.data;
    if (typeof selector === 'function') return selector(state);
    return undefined;
  });
  return render(<PDFTable selectors={selectors as any} />);
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('PDFTable Component', () => {
  it('renders a single table with correct corner text, headers, and row data (no pagination)', () => {
    const testState = {
      corner: 'Corner Text',
      headers: [{ label: 'H1' }, { label: 'H2' }],
      items: ['Row 1'],
      data: [['a', 'b']],
    };

    (splitTable as jest.Mock).mockReturnValue({
      separatedHeaders: [['H1', 'H2']],
      separatedData: [[['a', 'b']]],
    });

    renderComponent(testState);

    expect(screen.getByText('Corner Text')).toBeInTheDocument();

    expect(screen.getByText('H1')).toBeInTheDocument();
    expect(screen.getByText('H2')).toBeInTheDocument();

    expect(screen.getByText('Row 1')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.queryByText(/1 \/ 1/)).not.toBeInTheDocument();
  });

  it('renders multiple tables and shows pagination info when splitTable returns more than one table', () => {
    const testState = {
      corner: 'Corner Text',
      headers: [
        { label: 'H1' },
        { label: 'H2' },
        { label: 'H3' },
        { label: 'H4' },
        { label: 'H5' },
        { label: 'H6' },
      ],
      items: ['Row 1', 'Row 2'],
      data: [
        ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'],
        ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      ],
    };

    (splitTable as jest.Mock).mockReturnValue({
      separatedHeaders: [['H1', 'H2', 'H3', 'H4', 'H5'], ['H6']],
      separatedData: [
        [
          ['a1', 'a2', 'a3', 'a4', 'a5'],
          ['b1', 'b2', 'b3', 'b4', 'b5'],
        ],
        [['a6'], ['b6']],
      ],
    });

    const { container } = renderComponent(testState);
    const tableDivs = container.querySelectorAll('div.hideInScreen');
    expect(tableDivs.length).toBe(2);

    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('renders pagination info if items.length > 16 even with a single table', () => {
    const testState = {
      corner: 'Corner Text',
      headers: [{ label: 'H1' }, { label: 'H2' }],
      items: Array.from({ length: 17 }, (_, i) => `Row ${i + 1}`),
      data: Array.from({ length: 17 }, () => ['a', 'b']),
    };

    (splitTable as jest.Mock).mockReturnValue({
      separatedHeaders: [['H1', 'H2']],
      separatedData: [Array.from({ length: 17 }, () => ['a', 'b'])],
    });

    renderComponent(testState);

    expect(screen.getByText('1 / 1')).toBeInTheDocument();
  });
});
