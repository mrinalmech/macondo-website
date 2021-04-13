import React from "react"
import Header from "../Header"

type Props = {
  children?: React.ReactNode
  fixedHeader?: boolean
}

export default function Layout({ children,fixedHeader }: Props) {
  return (
    <>
      <Header fixed={fixedHeader}/>
      {children}
    </>
  )
}
