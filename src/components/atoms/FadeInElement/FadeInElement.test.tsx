import React from 'react';
import { render, screen } from '@testing-library/react';

import FadeInElement from './FadeInElement';

describe('FadeInElement', () => {
  const Component = () => <FadeInElement fadeIn>TestContent</FadeInElement>;

  test('Expect FadeInElement to be presented', () => {
    render(<Component />);

    expect(screen.getByText(/TestContent/i)).toBeInTheDocument();
  });
});
