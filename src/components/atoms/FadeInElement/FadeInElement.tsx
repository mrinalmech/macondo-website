import clsx from 'clsx';
import React, { forwardRef } from 'react';

import {
  animImageInitial,
  animImageFinal,
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

const InputText = props => <input {...props} />;

const FadeInElement = forwardRef(
  ({ fadeIn, className, children, animType = 'normal' }: Props, ref) => {
    const fadeClass = clsx({
      [fadeAnim]: animType === 'normal',
      [fadeAnimDelay]: animType === 'delay',
      [fadeAnimDoubleDelay]: animType === 'doubleDelay',
    });

    const animClass = fadeIn ? clsx(animImageFinal, fadeClass) : animImageInitial;

    const consolidatedClass = clsx(className, animClass);

    return (
      <div className={consolidatedClass} ref={ref}>
        {children}
      </div>
    );
  },
);

export default FadeInElement;
