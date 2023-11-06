import React from 'react';
import { render, screen } from '@testing-library/react';

import FadeInElement from './FadeInElement';

interface Props {
  fadeIn: boolean;
}

describe('FadeInElement', () => {
  const Component = ({ fadeIn }: Props) => (
    <FadeInElement fadeIn={fadeIn}>TestContent</FadeInElement>
  );

  test('Expect FadeInElement to be presented when invisible', () => {
    render(<Component fadeIn={false} />);

    expect(screen.getByText(/TestContent/i)).toBeInTheDocument();
    expect(screen.getByText(/TestContent/i)).toHaveClass('animInitial');
  });

  test('Expect FadeInElement to be presented when visible', () => {
    render(<Component fadeIn />);

    expect(screen.getByText(/TestContent/i)).toBeInTheDocument();
    expect(screen.getByText(/TestContent/i)).toHaveClass('animFinal');
  });
});
