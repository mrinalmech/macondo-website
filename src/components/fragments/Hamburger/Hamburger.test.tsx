import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Hamburger from './Hamburger';

describe('Hamburger', () => {
  const mockIsOpen = jest.fn();

  test('Expect Hamburger to be presented', () => {
    render(<Hamburger isOpen={true} setIsOpen={mockIsOpen} />);

    expect(screen.getByTestId(/hamburger/)).toBeInTheDocument();
  });

  test('Expect setIsOpen to be called when hamburger clicked', () => {
    render(<Hamburger isOpen={true} setIsOpen={mockIsOpen} />);

    fireEvent.click(screen.getByTestId(/hamburger/));
    expect(mockIsOpen).toHaveBeenCalled();
  });
});
