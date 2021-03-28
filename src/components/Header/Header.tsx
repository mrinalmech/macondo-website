import React from "react"
import { Link } from "gatsby"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import clsx from "clsx"
import { navBar, navLink } from "./Header.module.scss"

import HeaderLogo1x from "./images/header-logo@1x.png"
import HeaderLogo2x from "./images/header-logo@2x.png"
import HeaderLogo3x from "./images/header-logo@3x.png"
import HeaderLogo4x from "./images/header-logo@4x.png"


interface LinkProps {
  to: string
  children: React.Node
}

const NavLink = (props: LinkProps) => (
  <Link to={props.to} className={clsx("nav-link", navLink)}>
    {props.children}
  </Link>
)

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className={navBar}>
      <Navbar.Brand>
        <Link to="/">
          <img
            src={HeaderLogo1x}
            srcSet={
              `${HeaderLogo4x} 4x,
              ${HeaderLogo3x} 3x,
              ${HeaderLogo2x} 2x,
              ${HeaderLogo1x} 1x`
            }
            alt="Company Logo"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/*<NavLink to="/dev-diary">Dev Diary</NavLink>
          <NavLink to="/press-kit">Press Kit</NavLink>*/}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
