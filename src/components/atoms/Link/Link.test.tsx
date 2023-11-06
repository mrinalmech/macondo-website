import React from 'react';
import { render, screen } from '@testing-library/react';

import Link from './Link';

describe('Link', () => {
  const Component = () => <Link to="/test-url">Test</Link>;

  test('Expect Link to be presented', () => {
    render(<Component />);

    expect(screen.getByRole('link', { name: 'Test' })).toBeInTheDocument();
  });

  test('Expect Link to be point to correct destination', () => {
    render(<Component />);

    expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute('href', '/test-url');
  });
});
