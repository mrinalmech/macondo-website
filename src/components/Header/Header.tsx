import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

import { navBar, navBarFixed, navLink, socialLink } from './Header.module.scss';
import Link from '../Link';

interface LinkProps {
  to: string;
  ariaLabel?: string;
  children: React.Node;
  external?: boolean;
}

const NavLink = (props: LinkProps) => {
  return (
    <Link to={props.to} className={clsx('nav-link pr-3 pl-3', navLink)} {...props}>
      {props.children}
    </Link>
  );
};

const SocialLink = (props: LinkProps) => (
  <a
    href={props.to}
    className={clsx(socialLink, 'mr-4 mr-md-3')}
    aria-label={props?.ariaLabel}
    target="_blank"
    rel="noreferrer"
  >
    {props.children}
  </a>
);

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
          <NavLink to="/press/" external>
            Press
          </NavLink>
          <NavLink to="mailto:info@macondogames.com">Contact</NavLink>
          <div className="d-flex align-items-center pr-3 pl-3 pb-2 pb-md-0 pt-2 pt-md-0">
            <SocialLink
              to="https://store.steampowered.com/app/1073970/Global_Steel/"
              ariaLabel="Steam"
            >
              <FontAwesomeIcon icon={faSteam} size="1x" />
            </SocialLink>
            <SocialLink to="https://twitter.com/macondostudios" ariaLabel="Twitter">
              <FontAwesomeIcon icon={faTwitter} size="1x" />
            </SocialLink>
            <SocialLink to="https://www.facebook.com/macondostudios" ariaLabel="Facebook">
              <FontAwesomeIcon icon={faFacebookF} size="1x" />
            </SocialLink>
            <SocialLink to="https://www.instagram.com/globalsteelgame" ariaLabel="Instagram">
              <FontAwesomeIcon icon={faInstagram} size="1x" />
            </SocialLink>
            <SocialLink
              to="https://www.youtube.com/channel/UCfYKziK0Ll8UZ9AiMTZT9DA"
              ariaLabel="Youtube"
            >
              <FontAwesomeIcon icon={faYoutube} size="1x" />
            </SocialLink>
            <SocialLink to="https://discord.gg/qVBvuy7Ny3" ariaLabel="Discord">
              <FontAwesomeIcon icon={faDiscord} size="1x" />
            </SocialLink>
            <SocialLink to="https://www.twitch.tv/macondogames" ariaLabel="Twitch">
              <FontAwesomeIcon icon={faTwitch} size="1x" />
            </SocialLink>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
