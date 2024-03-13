import React from 'react';
import { config, IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { socialLinkSmall, socialLinkBig } from './SocialLink.module.scss';

config.autoAddCss = false;

interface LinkProps {
  to: string;
  ariaLabel?: string;
  icon: IconProp;
  type: 'small' | 'big';
}

export default function SocialLink({ to, ariaLabel, icon, type }: LinkProps) {
  const isSmallIcon = type === 'small';
  const styles = isSmallIcon
    ? clsx(socialLinkSmall, 'py-3 lg:py-0 lg:px-3 first-of-type:pt-0 lg:last-of-type:pr-0')
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
