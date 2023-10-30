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
  isImg?: boolean;
  fadeIn: boolean;
  className?: string;
  children?: React.ReactNode;
  animType?: 'normal' | 'delay' | 'doubleDelay';
  [prop: string]: any;
};

const InputText = props => <input {...props} />;

const FadeInElement = forwardRef(
  ({ isImg = false, fadeIn, className, children, animType = 'normal', ...other }: Props, ref) => {
    const fadeClass = clsx({
      [fadeAnim]: animType === 'normal',
      [fadeAnimDelay]: animType === 'delay',
      [fadeAnimDoubleDelay]: animType === 'doubleDelay',
    });

    const animClass = fadeIn ? clsx(animImageFinal, fadeClass) : animImageInitial;

    const consolidatedClass = clsx(className, animClass);

    if (!isImg) {
      return (
        <div className={consolidatedClass} {...other}>
          {children}
        </div>
      );
    }

    return <img className={consolidatedClass} ref={ref} {...other} />;
  },
);

export default FadeInElement;
