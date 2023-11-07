import React from 'react';
import { render, screen } from '@testing-library/react';

import Link from './Link';

describe('Link', () => {
  test('Expect Link to be presented', () => {
    render(<Link to="/test-url">Test</Link>);

    expect(screen.getByRole('link', { name: /Test/i })).toBeInTheDocument();
  });

  test('Expect internal link to point to correct destination', () => {
    render(<Link to="/test-url">Test</Link>);

    expect(screen.getByRole('link', { name: /Test/i })).toHaveAttribute('href', '/test-url');
  });

  test('Expect external link to point to correct destination', () => {
    render(
      <Link to="/test-url" external>
        Test
      </Link>,
    );

    expect(screen.getByRole('link', { name: /Test/i })).toHaveAttribute('href', '/test-url');
  });
});
