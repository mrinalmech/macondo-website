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
    ? clsx(socialLinkSmall, 'px-4 md:px-3 last-of-type:pr-0')
    : clsx(socialLinkBig, 'mx-1 sm:!mx-2 md:!mx-3');
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
