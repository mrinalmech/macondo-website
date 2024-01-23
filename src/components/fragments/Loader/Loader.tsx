import React, { useState } from 'react';
import clsx from 'clsx';
import { useInterval } from 'usehooks-ts';

import { LOADING_SCREEN_DURATION } from './constants';

import { root, transparent } from './Loader.module.scss';

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
      className={clsx(root, 'd-flex align-items-center justify-content-center', {
        [transparent]: appLoaded,
      })}
      style={{ transitionDuration: `${LOADING_SCREEN_DURATION}s` }}
      role="progressbar"
      aria-label="Loading"
    >
      <h2 className="m-0">Loading{dots}</h2>
    </div>
  );
}
