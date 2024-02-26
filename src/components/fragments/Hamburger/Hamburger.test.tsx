import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Hamburger from './Hamburger';

describe('Hamburger', () => {
  const mockIsOpen = jest.fn();

  test('Expect Hamburger to be presented', () => {
    render(<Hamburger isOpen={false} setIsOpen={mockIsOpen} />);

    expect(screen.getByLabelText(/Open the menu/)).toBeInTheDocument();
  });

  test('Expect setIsOpen to be called when hamburger clicked', () => {
    render(<Hamburger isOpen={false} setIsOpen={mockIsOpen} />);

    fireEvent.click(screen.getByLabelText(/Open the menu/));
    expect(mockIsOpen).toHaveBeenCalled();
  });
});
