import React from 'react';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { socialLinkSmall, socialLinkBig } from './SocialLink.module.scss';

interface LinkProps {
  to: string;
  ariaLabel?: string;
  icon: IconDefinition;
  type: 'small' | 'big';
}

export default function SocialLink({ to, ariaLabel, icon, type }: LinkProps) {
  const isSmallIcon = type === 'small';
  const styles = isSmallIcon
    ? clsx(socialLinkSmall, 'py-3 lg:py-0 lg:px-3 first-of-type:pt-0 lg:last-of-type:pr-0')
    : clsx(socialLinkBig, 'mx-1.5 sm:!mx-2 md:!mx-3');
  return (
    <a
      href={to}
      className={clsx(styles, 'flex items-center justify-center')}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}
