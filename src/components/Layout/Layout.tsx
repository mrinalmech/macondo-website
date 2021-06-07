import React from "react"
import Header from "../Header"
import Footer from "../Footer"

type Props = {
  children?: React.ReactNode
  fixedHeader?: boolean
}

export default function Layout({ children, fixedHeader }: Props) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header fixed={fixedHeader} />
      <div className="flex-grow-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}
