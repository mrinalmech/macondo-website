import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import clsx from 'clsx';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faDiscord,
  faTwitch,
  faSteam,
} from '@fortawesome/free-brands-svg-icons';
import { StaticImage } from 'gatsby-plugin-image';

import { navBar, navBarFixed, navLink } from './Header.module.scss';

import Link from '../../atoms/Link';
import SocialLink from '../../atoms/SocialLink';

interface NavLinkProps {
  to: string;
  ariaLabel?: string;
  children: React.ReactNode;
  external?: boolean;
}

const NavLink = (props: NavLinkProps) => {
  return (
    <Link className={clsx('nav-link pr-3 pl-3', navLink)} {...props}>
      {props.children}
    </Link>
  );
};

interface Props {
  fixed?: boolean;
}

export default function Header({ fixed }: Props) {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className={clsx(navBar, { [navBarFixed]: fixed })}>
      <Navbar.Brand>
        <Link to="/">
          <StaticImage
            src="./images/HeaderLogo.webp"
            alt="Company Logo"
            width={34}
            placeholder="none"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto align-items-end align-items-md-center">
          <NavLink to="https://blog.macondogames.com/">Blog</NavLink>
          <NavLink to="/press" external>
            Press
          </NavLink>
          <NavLink to="mailto:info@macondogames.com">Contact</NavLink>
          <div className="d-flex align-items-center pr-3 pl-3 pb-2 pb-md-0 pt-2 pt-md-0">
            <SocialLink
              to="https://store.steampowered.com/app/1073970/Global_Steel/"
              ariaLabel="Steam"
              type="small"
              icon={faSteam}
            />
            <SocialLink
              to="https://twitter.com/macondostudios"
              ariaLabel="Twitter"
              type="small"
              icon={faTwitter}
            />
            <SocialLink
              to="https://www.facebook.com/macondostudios"
              ariaLabel="Facebook"
              type="small"
              icon={faFacebookF}
            />
            <SocialLink
              to="https://www.instagram.com/globalsteelgame"
              ariaLabel="Instagram"
              type="small"
              icon={faInstagram}
            />
            <SocialLink
              to="https://www.youtube.com/channel/UCfYKziK0Ll8UZ9AiMTZT9DA"
              ariaLabel="Youtube"
              type="small"
              icon={faYoutube}
            />
            <SocialLink
              to="https://discord.gg/qVBvuy7Ny3"
              ariaLabel="Discord"
              type="small"
              icon={faDiscord}
            />
            <SocialLink
              to="https://www.twitch.tv/macondogames"
              ariaLabel="Twitch"
              type="small"
              icon={faTwitch}
            />
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
