import React, { useContext, useEffect, useRef, useState } from 'react';

import FadeInElement from '../FadeInElement';

import { LoadingContext } from '../../../contexts/LoadingContext';

interface Props {
  anim?: boolean;
  onLoad: () => any;
  refElem?: React.MutableRefObject<any>;
  src: string;
  [prop: string]: any;
}

export default function LoadedImg({ anim, onLoad, refElem, src, alt = '', ...other }: Props) {
  const imgEl = useRef(null);
  const allImgsLoaded = !useContext(LoadingContext);

  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    if (!loaded) {
      onLoad();
    }
  };

  useEffect(() => {
    const img = imgEl.current;
    if (img && img.complete) {
      setLoaded(true);
      handleLoad();
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
        ref={refElem || imgEl}
        src={laterSrc}
        alt={alt}
        {...other}
      />
    );
  }

  return <img onLoad={handleLoad} ref={refElem || imgEl} src={laterSrc} alt={alt} {...other} />;
}
