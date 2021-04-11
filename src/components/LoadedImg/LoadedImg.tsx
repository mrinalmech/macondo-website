import React, { useEffect, useRef, useState } from "react"
import { animated } from 'react-spring'

interface Props {
  anim?: boolean
  onLoad: () => any
  refElem?: React.MutableRefObject<any>
  src: string
  [prop: string]: any
}

export default function LoadedImg({ anim, onLoad, refElem,src, ...other }: Props) {

  const imgEl = useRef(null)

  const [loaded,setLoaded] = useState(false)

  const handleLoad = () => {
    if(!loaded){
      onLoad()
    }
  }

  useEffect(() => {
    const img = imgEl.current;
    if (img && img.complete) {
      setLoaded(true)
      handleLoad()
    }
    setLaterSrc(src)
  }, [])

  const [laterSrc, setLaterSrc] = useState(null)

  if (anim) {
    return <animated.img
      onLoad={handleLoad}
      ref={refElem || imgEl}
      src={laterSrc}
      {...other}
    />
  }

  return <img
    onLoad={handleLoad}
    ref={refElem || imgEl}
    src={laterSrc}
    {...other}
  />
}
