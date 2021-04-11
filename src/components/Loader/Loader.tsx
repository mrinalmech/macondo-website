import React,{useEffect} from "react";
import clsx from "clsx"

import { root, spinner, inner } from "./Loader.module.scss"

interface Props{
  loading: boolean
}
export default function Loader({loading}:Props) {

  useEffect(()=>{
    document.body.style.overflow = 'hidden';
  },[])

  useEffect(()=>{
    if(!loading){
      document.body.style.overflow = 'auto';
    }
  },[loading])


  if(!loading){
    return null
  }

  return <div className={clsx(root,"d-flex align-items-center justify-content-center")}>
    <div className={spinner}>
      <div className={inner}>
        <div>
          <div/>
          <div/>
          <div/>
          <div/>
          <div/>
          <div/>
        </div>
      </div>
    </div>
  </div>
}
