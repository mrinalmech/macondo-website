import React, { useState } from 'react';
import clsx from 'clsx';
import { useInterval } from 'usehooks-ts';

import { LOADING_SCREEN_DURATION } from './constants';

import { root } from './Loader.module.scss';

interface Props {
  appLoaded: boolean;
}

export default function Loader({ appLoaded }: Props) {
  const [dots, setDots] = useState('.');

  const updateDots = () => {
    const newDots = `${dots.length <= 2 ? dots : ''}.`;
    setDots(newDots);
  };

  useInterval(() => {
    updateDots();
  }, 500);

  return (
    <div
      className={clsx(
        root,
        'flex items-center justify-center h-screen w-screen fixed z-50 font-retro',
        {
          'opacity-0': appLoaded,
        },
      )}
      style={{ transitionDuration: `${LOADING_SCREEN_DURATION}s` }}
      role="progressbar"
      aria-label="Loading"
    >
      <h1 className="text-4xl">Loading{dots}</h1>
    </div>
  );
}
