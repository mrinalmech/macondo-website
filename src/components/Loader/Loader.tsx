import React, { useEffect, useState } from "react";
import clsx from "clsx"
import useInterval from '@use-it/interval';

import { root } from "./Loader.module.scss"

interface Props {
  loading: boolean
}
export default function Loader({ loading }: Props) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, [])

  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = 'auto';
    }
  }, [loading])


  const [dots, setDots] = useState(".")

  const updateDots = () => {
    if (dots.length <= 2) {
      setDots(dots + ".")
    } else {
      setDots(".")
    }
  }

  useInterval(() => {
    if(loading){
      updateDots()
    }
  }, 500);

  if (!loading) {
    return null
  }

  return <div className={clsx(root, "d-flex align-items-center justify-content-center")}>
    <h2 className="m-0">
      Loading{dots}
    </h2>

  </div>
}
