import React, { useState, useEffect } from 'react';
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

import { navLink, imgHolder, navHolder, imgLink } from './Header.module.scss';

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
  const [barBlack, setBarBlack] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;

      const isNotAtTop = position !== 0;
      setBarBlack(isNotAtTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={clsx('fixed w-full z-50')}>
      <div
        className={clsx(
          'p-4 pb-8 w-full flex justify-end z-50 transition-colors duration-150',
          navHolder,
          {
            'bg-black': barBlack,
          },
        )}
        data-testid="nav-holder"
      >
        <nav className="flex font-retro">
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
      </div>
      <Link to="/" className={clsx('absolute top-3 left-5', imgLink)}>
        <div
          className={clsx('p-2.5 pr-2 transition-colors duration-150', imgHolder, {
            'bg-black': barBlack,
          })}
        >
          <StaticImage
            src="./images/HeaderLogo.png"
            alt="Company Logo"
            width={60}
            placeholder="none"
          />
        </div>
      </Link>
    </header>
  );
}
