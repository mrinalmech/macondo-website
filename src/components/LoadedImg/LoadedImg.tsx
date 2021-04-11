import React, { useEffect, useRef, useState } from "react"
import { animated } from 'react-spring'

interface Props {
  anim?: boolean
  onLoad: () => any
  refElem?: React.MutableRefObject<any>
  [prop: string]: any
}

export default function LoadedImg({ anim, onLoad, refElem, ...other }: Props) {

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
  }, [])

  if (anim) {
    return <animated.img
      onLoad={handleLoad}
      ref={refElem || imgEl}
      {...other}
    />
  }

  return <img
    onLoad={handleLoad}
    ref={refElem || imgEl}
    {...other}
  />
}
