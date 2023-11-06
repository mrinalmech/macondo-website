import React from 'react';
import { render, screen } from '@testing-library/react';

import FadeInElement from './FadeInElement';

describe('FadeInElement', () => {
  const Component = () => <FadeInElement fadeIn={false}>TestContent</FadeInElement>;

  test('Displays the correct title', () => {
    render(<Component />);

    expect(screen.getByText(/TestContent/i)).toBeInTheDocument();

    const element = screen.getByText(/TestContent/i).parentElement;

    const styles = element && getComputedStyle(element);

    if (styles) {
      console.log(styles);
    }
  });
});
