import clsx from 'clsx';
import { useSelector } from 'react-redux';
import React, { forwardRef, memo } from 'react';

import { fadeAnim, fadeAnimDelay, fadeAnimDoubleDelay } from './FadeInElement.module.scss';

import { selectAppLoaded } from '../../../store/appSlice';

interface Props {
  className?: string;
  children?: React.ReactNode;
  animType?: 'normal' | 'delay' | 'doubleDelay';
  testId?: string;
}

const FadeInElement = memo(
  forwardRef<HTMLDivElement, Props>(({ className, children, animType = 'normal', testId }, ref) => {
    const appLoaded = useSelector(selectAppLoaded);

    const normalAnim = animType === 'normal';
    const delayAnim = animType === 'delay';
    const doubleDelayAnim = animType === 'doubleDelay';

    const consolidatedClass = clsx(className, {
      'opacity-0': !appLoaded,
      'opacity-100': appLoaded,
      [fadeAnim]: normalAnim,
      [fadeAnimDelay]: delayAnim,
      [fadeAnimDoubleDelay]: doubleDelayAnim,
    });

    return (
      <div className={consolidatedClass} ref={ref} data-testid={testId}>
        {children}
      </div>
    );
  }),
);

FadeInElement.displayName = 'FadeInElement';

export default FadeInElement;
