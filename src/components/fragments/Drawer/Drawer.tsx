import React from 'react';
import clsx from 'clsx';
import Drawer from '@mui/material/Drawer';

import { paper } from './Drawer.module.scss';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children?: React.ReactNode;
}

export default function HeaderDrawer({ isOpen, setIsOpen, children }: Props) {
  const handleClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClick={handleClose}
      anchor="right"
      classes={{
        root: '!z-10 lg:hidden',
        paper: clsx(paper, 'w-full flex flex-col justify-start items-end pr-4 font-retro'),
      }}
      id="drawer"
      data-testid="drawer"
      aria-labelledby="hamburger"
    >
      {children}
    </Drawer>
  );
}
