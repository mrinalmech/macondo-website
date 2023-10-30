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
  type: 'div' | 'img';
  fadeIn: boolean;
  className?: string;
  children?: React.ReactNode;
  animType?: 'normal' | 'delay' | 'doubleDelay';
  [prop: string]: any;
};

const InputText = props => <input {...props} />;

const FadeInElement = forwardRef(
  ({ type, fadeIn, className, children, animType = 'normal', ...other }: Props, ref) => {
    const fadeClass =
      animType === 'delay'
        ? fadeAnimDelay
        : animType === 'doubleDelay'
        ? fadeAnimDoubleDelay
        : fadeAnim;
    const animClass = fadeIn ? clsx(animImageFinal, fadeClass) : animImageInitial;
    const consolidatedClass = clsx(className, animClass);

    if (type == 'div') {
      return (
        <div className={consolidatedClass} {...other}>
          {children}
        </div>
      );
    } else {
      return <img className={consolidatedClass} ref={ref} {...other} />;
    }
  },
);

export default FadeInElement;
