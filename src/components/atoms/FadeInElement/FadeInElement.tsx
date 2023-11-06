import clsx from 'clsx';
import React, { forwardRef, memo } from 'react';

import {
  animInitial,
  animFinal,
  fadeAnim,
  fadeAnimDelay,
  fadeAnimDoubleDelay,
} from './FadeInElement.module.scss';

type Props = {
  fadeIn: boolean;
  className?: string;
  children?: React.ReactNode;
  animType?: 'normal' | 'delay' | 'doubleDelay';
};

const FadeInElement = memo(
  forwardRef(({ fadeIn, className, children, animType = 'normal' }: Props, ref) => {
    const fadeClass = clsx({
      [fadeAnim]: animType === 'normal',
      [fadeAnimDelay]: animType === 'delay',
      [fadeAnimDoubleDelay]: animType === 'doubleDelay',
    });

    const animClass = fadeIn ? clsx(animFinal, fadeClass) : animInitial;

    const consolidatedClass = clsx(className, animClass);

    return (
      <div className={consolidatedClass} ref={ref}>
        {children}
      </div>
    );
  }),
);

export default FadeInElement;
