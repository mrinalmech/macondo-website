import React from 'react';
import { render, screen } from '@testing-library/react';

import Drawer from './Drawer';

describe('Drawer', () => {
  const mockIsOpen = jest.fn();

  test('Expect Drawer to be presented if isOpen prop is true', () => {
    render(
      <Drawer isOpen={true} setIsOpen={mockIsOpen}>
        Test
      </Drawer>,
    );

    expect(screen.getByText(/Test/)).toBeInTheDocument();
  });

  test('Expect Drawer to be not present if isOpen prop is false', () => {
    render(
      <Drawer isOpen={false} setIsOpen={mockIsOpen}>
        Test
      </Drawer>,
    );

    expect(screen.queryByText(/Test/)).not.toBeInTheDocument();
  });
});
