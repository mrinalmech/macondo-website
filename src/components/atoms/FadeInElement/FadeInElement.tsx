import clsx from 'clsx';
import React, { forwardRef, memo } from 'react';

import { fadeAnim, fadeAnimDelay, fadeAnimDoubleDelay } from './FadeInElement.module.scss';

interface Props {
  fadeIn: boolean;
  className?: string;
  children?: React.ReactNode;
  animType?: 'normal' | 'delay' | 'doubleDelay';
  testId?: string;
}

const FadeInElement = memo(
  forwardRef<HTMLDivElement, Props>(
    ({ fadeIn, className, children, animType = 'normal', testId }, ref) => {
      const normalAnim = animType === 'normal';
      const delayAnim = animType === 'delay';
      const doubleDelayAnim = animType === 'doubleDelay';

      const consolidatedClass = clsx(className, {
        'opacity-0': !fadeIn,
        'opacity-100': fadeIn,
        [fadeAnim]: normalAnim,
        [fadeAnimDelay]: delayAnim,
        [fadeAnimDoubleDelay]: doubleDelayAnim,
      });

      return (
        <div className={consolidatedClass} ref={ref} data-testid={testId}>
          {children}
        </div>
      );
    },
  ),
);

FadeInElement.displayName = 'FadeInElement';

export default FadeInElement;
