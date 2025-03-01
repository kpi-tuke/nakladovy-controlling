import '@testing-library/jest-dom';
import { TableData } from '@renderer/components/tables/TableData';
import { render } from '@testing-library/react';
import { matchers } from '@emotion/jest';

expect.extend(matchers);

describe('TableData styled component', () => {
  it('should have overflow: auto by default', () => {
    const { container } = render(<TableData>Content</TableData>);
    expect(container.firstChild).toHaveStyleRule('overflow', 'auto');
  });

  it('should set overflow to unset in print media query', () => {
    const { container } = render(<TableData>Content</TableData>);
    expect(container.firstChild).toHaveStyleRule('overflow', 'unset', {
      media: 'print',
    });
  });

  it('matches the snapshot', () => {
    const { container } = render(<TableData>Content</TableData>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
