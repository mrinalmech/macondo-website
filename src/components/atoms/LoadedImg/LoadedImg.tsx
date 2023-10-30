import React, { useContext, useEffect, useRef, useState, forwardRef } from 'react';

import FadeInElement from '../FadeInElement';

import { ImageLoadedContext } from '../../../contexts/ImageLoadedContext';
import { LoadingContext } from '../../../contexts/LoadingContext';

interface Props {
  anim?: boolean;
  src: string;
  [prop: string]: any;
}

const LoadedImg = forwardRef(({ anim, refElem, src, alt = '', ...other }: Props, ref) => {
  const imgEl = useRef(null);

  const allImgsLoaded = !useContext(LoadingContext);
  const imageLoaded = useContext(ImageLoadedContext);

  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    if (!loaded) {
      imageLoaded();
    }
  };

  useEffect(() => {
    const img = imgEl.current;
    if (img && img.complete) {
      setLoaded(true);
      imageLoaded();
    }
    setLaterSrc(src);
  }, []);

  const [laterSrc, setLaterSrc] = useState(null);

  if (anim) {
    return (
      <FadeInElement
        type="img"
        fadeIn={allImgsLoaded}
        onLoad={handleLoad}
        ref={ref}
        src={laterSrc}
        alt={alt}
        {...other}
      />
    );
  }

  return <img onLoad={handleLoad} ref={refElem || imgEl} src={laterSrc} alt={alt} {...other} />;
});

export default LoadedImg;
