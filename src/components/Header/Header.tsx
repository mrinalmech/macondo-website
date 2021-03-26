import React from "react"
import { Link } from "gatsby"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HeaderLogo from './images/header-logo.png'

interface LinkProps {
  to: string
  children: React.Node | React.Node[]
}

const NavLink = (props: LinkProps) => <Link to={props.to} className="nav-link">{props.children}</Link>

export default function Header() {

  return <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand>
      <Link to="/">
        <img src={HeaderLogo} alt="" />
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dev-diary">Dev Diary</NavLink>
        <NavLink to="/press-kit">Press Kit</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}
