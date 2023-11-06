import React from 'react';
import { render, screen } from '@testing-library/react';

import Link from './Link';

interface Props {
  external?: boolean;
  activeClassName?: string;
  partiallyActive?: boolean;
}

describe('Link', () => {
  const Component = (props: Props) => (
    <Link to="/test-url" {...props}>
      Test
    </Link>
  );

  test('Expect Link to be presented', () => {
    render(<Component />);

    expect(screen.getByRole('link', { name: 'Test' })).toBeInTheDocument();
  });

  test('Expect internal link to point to correct destination', () => {
    render(<Component />);

    expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute('href', '/test-url');
  });

  test('Expect external link to point to correct destination', () => {
    render(<Component external={true} />);

    expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute('href', '/test-url');
  });
});
