import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Hamburger from './Hamburger';

describe('Hamburger', () => {
  const mockIsOpen = jest.fn();

  test('Expect Hamburger to be presented', () => {
    render(<Hamburger isOpen={false} setIsOpen={mockIsOpen} showHamburger />);

    expect(screen.getByLabelText(/hamburger_open/)).toBeInTheDocument();
  });

  test('Expect Hamburger to be invisible when showHamburger prop is false', () => {
    render(<Hamburger isOpen={false} setIsOpen={mockIsOpen} showHamburger={false} />);

    expect(screen.getByLabelText(/hamburger_open/)).toBeInTheDocument();
    expect(screen.getByLabelText(/hamburger_open/)).toHaveClass('opacity-0');
    expect(screen.getByLabelText(/hamburger_open/)).toHaveClass('pointer-events-none');
  });

  test('Expect setIsOpen to be called when hamburger clicked', () => {
    render(<Hamburger isOpen={false} setIsOpen={mockIsOpen} showHamburger />);

    fireEvent.click(screen.getByLabelText(/hamburger_open/));
    expect(mockIsOpen).toHaveBeenCalled();
  });
});
