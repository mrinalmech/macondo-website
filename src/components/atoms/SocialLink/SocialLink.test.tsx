import React from 'react';
import { render, screen } from '@testing-library/react';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

import SocialLink from './SocialLink';

describe('SocialLink', () => {
  test('Expect SocialLink to be presented', () => {
    render(
      <SocialLink to="/test-url" icon={faFacebookF} type="small" ariaLabel="test-aria-label" />,
    );

    expect(screen.getByRole('link', { name: /test-aria-label/i })).toBeInTheDocument();
  });

  test('Expect correct styles if type is small', () => {
    render(
      <SocialLink to="/test-url" icon={faFacebookF} type="small" ariaLabel="test-aria-label" />,
    );

    expect(screen.getByRole('link', { name: /test-aria-label/i })).toHaveClass('socialLinkSmall');
  });

  test('Expect correct styles if type is big', () => {
    render(<SocialLink to="/test-url" icon={faFacebookF} type="big" ariaLabel="test-aria-label" />);

    expect(screen.getByRole('link', { name: /test-aria-label/i })).toHaveClass('socialLinkBig');
  });

  test('Expect link to point to correct url', () => {
    render(<SocialLink to="/test-url" icon={faFacebookF} type="big" ariaLabel="test-aria-label" />);

    expect(screen.getByRole('link', { name: /test-aria-label/i })).toHaveAttribute(
      'href',
      '/test-url',
    );
  });
});
