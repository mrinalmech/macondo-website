import React from "react"
import { Link } from "gatsby"
import HeaderLogo from './images/header-logo.png'


const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default function Header() {
  return (
    <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
        <img src={HeaderLogo} alt=""/>
      </Link>
      <ul style={{ listStyle: `none`, float: `right` }}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/dev-diary">Dev Diary</ListLink>
        <ListLink to="/press-kit">Press Kit</ListLink>
      </ul>
    </header>
  )
}
