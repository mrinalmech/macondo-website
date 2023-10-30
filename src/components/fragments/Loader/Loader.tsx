import React, { useState } from 'react';
import clsx from 'clsx';
import { useInterval } from 'usehooks-ts';

import { root } from './Loader.module.scss';

export default function Loader() {
  const [dots, setDots] = useState('.');

  const updateDots = () => {
    const newDots = `${dots.length <= 2 ? dots : ''}.`;
    setDots(newDots);
  };

  useInterval(() => {
    updateDots();
  }, 500);

  return (
    <div className={clsx(root, 'd-flex align-items-center justify-content-center')}>
      <h2 className="m-0">Loading{dots}</h2>
    </div>
  );
}
