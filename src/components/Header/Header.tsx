import React from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import clsx from "clsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faDiscord,
  faTwitch
} from '@fortawesome/free-brands-svg-icons'

import { navBar, navLink, socialLink } from "./Header.module.scss"
import Link from "../Link"

import HeaderLogo1x from "./images/header-logo@1x.png"
import HeaderLogo2x from "./images/header-logo@2x.png"
import HeaderLogo3x from "./images/header-logo@3x.png"
import HeaderLogo4x from "./images/header-logo@4x.png"

interface LinkProps {
  to: string
  children: React.Node
}

const NavLink = (props: LinkProps) => (
  <Link to={props.to} className={clsx("nav-link pr-3 pl-3", navLink)}>
    {props.children}
  </Link>
)

const SocialLink = (props: LinkProps) => (
  <a href={props.to} className={clsx(socialLink,"mr-4 mr-md-3")} target="_blank" rel="noreferrer">
    {props.children}
  </a>
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
        <Nav className="ml-auto align-items-end align-items-md-center">
          {/*<NavLink to="/dev-diary">Dev Diary</NavLink>
          <NavLink to="/press-kit">Press Kit</NavLink>*/}
          <NavLink to="mailto:info@macondogames.com">Contact</NavLink>
          <div className="d-flex align-items-center pr-3 pl-3 pb-2 pb-md-0 pt-2 pt-md-0">
            <SocialLink to="https://twitter.com/macondostudios">
              <FontAwesomeIcon icon={faTwitter} size="1x" />
            </SocialLink>
            <SocialLink to="https://www.facebook.com/macondostudios">
              <FontAwesomeIcon icon={faFacebookF} size="1x" />
            </SocialLink>
            <SocialLink to="https://www.instagram.com/globalsteelgame">
              <FontAwesomeIcon icon={faInstagram} size="1x" />
            </SocialLink>
            <SocialLink to="https://www.youtube.com/channel/UCfYKziK0Ll8UZ9AiMTZT9DA">
              <FontAwesomeIcon icon={faYoutube} size="1x" />
            </SocialLink>
            <SocialLink to="https://discord.gg/qVBvuy7Ny3">
              <FontAwesomeIcon icon={faDiscord} size="1x" />
            </SocialLink>
            <SocialLink to="https://www.twitch.tv/macondogames">
              <FontAwesomeIcon icon={faTwitch} size="1x" />
            </SocialLink>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
