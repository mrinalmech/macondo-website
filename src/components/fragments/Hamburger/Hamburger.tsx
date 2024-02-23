import React from 'react';
import clsx from 'clsx';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Hamburger({ isOpen, setIsOpen }: Props) {
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const commonClass = 'bg-white block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm';

  return (
    <button
      onClick={handleClick}
      className="flex flex-col lg:hidden justify-center items-center -mt-2"
      aria-label={isOpen ? 'Close the menu' : 'Open the menu'}
      aria-expanded={isOpen}
      aria-controls="drawer"
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
