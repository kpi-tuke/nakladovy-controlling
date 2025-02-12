import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('render button', () => {
  it('should render button', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toContainHTML('0');

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toContainHTML('1');
  });
});
