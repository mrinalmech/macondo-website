import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import clsx from 'clsx';

import { root } from './Hamburger.module.scss';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  showHamburger: boolean;
  className?: string;
  disableAriaLabel?: boolean;
}

export default function Hamburger({
  isOpen,
  setIsOpen,
  showHamburger,
  className,
  disableAriaLabel = false,
}: Props) {
  const { t } = useTranslation();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const commonClass = 'bg-white block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm';

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'flex flex-col lg:hidden justify-center items-center -mt-2',
        root,
        {
          'opacity-0': !showHamburger,
          'pointer-events-none': !showHamburger,
        },
        className,
      )}
      aria-label={
        disableAriaLabel
          ? ''
          : isOpen
          ? t('hamburger_close') || 'Close the menu'
          : t('hamburger_open') || 'Open the menu'
      }
      aria-expanded={isOpen}
      aria-controls="drawer"
      id="hamburger"
    >
      <span
        className={clsx(commonClass, {
          'rotate-45 translate-y-1': isOpen,
          '-translate-y-0.5': !isOpen,
        })}
        aria-hidden
      />
      <span
        className={clsx(commonClass, 'my-0.5', { 'opacity-0': isOpen, 'opacity-100': !isOpen })}
        aria-hidden
      />
      <span
        className={clsx(commonClass, {
          '-rotate-45 -translate-y-1': isOpen,
          'translate-y-0.5': !isOpen,
        })}
        aria-hidden
      />
    </button>
  );
}
