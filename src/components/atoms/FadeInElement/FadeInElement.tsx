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
      const fadeClass = clsx({
        [fadeAnim]: animType === 'normal',
        [fadeAnimDelay]: animType === 'delay',
        [fadeAnimDoubleDelay]: animType === 'doubleDelay',
      });

      const animClass = fadeIn ? clsx('opacity-100', fadeClass) : 'opacity-0';

      const consolidatedClass = clsx(className, animClass);

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
