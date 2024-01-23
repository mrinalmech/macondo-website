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
    ? clsx(socialLinkSmall, 'mr-4 md:mr-3')
    : clsx(socialLinkBig, 'mx-1 sm:mx-2 md:mx-3 flex items-center justify-center');
  return (
    <a href={to} className={styles} target="_blank" rel="noreferrer" aria-label={ariaLabel}>
      <FontAwesomeIcon icon={icon} size={isSmallIcon ? '1x' : '2x'} />
    </a>
  );
}
