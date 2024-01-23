import React from 'react';
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

import Link from '../../../components/atoms/Link';
import SocialLink from '../../../components/atoms/SocialLink';

import { navLink } from './Header.module.scss';

interface NavLinkProps {
  to: string;
  ariaLabel?: string;
  children: React.ReactNode;
  external?: boolean;
}

const NavLink = (props: NavLinkProps) => {
  return (
    <Link className={clsx('pr-3 pl-3', navLink)} {...props}>
      {props.children}
    </Link>
  );
};

export default function Header() {
  return (
    <header className="p-4 w-full absolute bg-black flex justify-between">
      <Link to="/">
        <StaticImage
          src="./images/HeaderLogo.webp"
          alt="Company Logo"
          width={60}
          placeholder="none"
        />
      </Link>
      <nav className="flex">
        <NavLink to="https://blog.macondogames.com/">Blog</NavLink>
        <NavLink to="/press" external>
          Press
        </NavLink>
        <NavLink to="mailto:info@macondogames.com">Contact</NavLink>
        <div className="px-3">
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
      </nav>
    </header>
  );
}
