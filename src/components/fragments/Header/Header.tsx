import React, { lazy, useState, useEffect, useCallback } from 'react';
import { Link as IntLink, useI18next, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
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

import { useBreakpointRegion } from '../../../hooks/useBreakpointRegion';

import { navLink, langLink, imgHolder, navHolder, imgLink } from './Header.module.scss';

import Link from '../../../components/atoms/Link';
import SocialLink from '../../../components/atoms/SocialLink';
import Hamburger from '../Hamburger';

const Drawer = lazy(() => import('../Drawer'));

interface NavLinkProps {
  to: string;
  ariaLabel?: string;
  children: React.ReactNode;
  external?: boolean;
}

const NavLink = (props: NavLinkProps) => {
  return (
    <Link className={clsx('mb-4 lg:mb-0 px-0 lg:px-4 text-xl white', navLink)} {...props}>
      {props.children}
    </Link>
  );
};

export default function Header() {
  const { languages, originalPath, i18n } = useI18next();
  const { t } = useTranslation();

  const [barBlack, setBarBlack] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const breakpointRegion = useBreakpointRegion();
  const onTablet =
    breakpointRegion === 'xs' || breakpointRegion === 'sm' || breakpointRegion === 'md';

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (!onTablet && isOpen) {
      setIsOpen(false);
    }
  }, [onTablet, isOpen]);

  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    const isNotAtTop = position !== 0;

    setBarBlack(isNotAtTop);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const links = (
    <>
      <NavLink to="https://blog.macondogames.com/">
        <Trans i18nKey="blog">Blog</Trans>
      </NavLink>
      <NavLink to="/press" external>
        <Trans i18nKey="press">Press</Trans>
      </NavLink>
      <NavLink to="mailto:info@macondogames.com">
        <Trans i18nKey="contact">Contact</Trans>
      </NavLink>
    </>
  );

  const socialLinks = (
    <div className="mt-2 lg:mt-0 lg:px-3 flex flex-col lg:flex-row items-center">
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
  );

  const languageChanger = (
    <div className="flex items-center mt-3 lg:mt-0 ml-0 lg:ml-3">
      {languages.map(lng => (
        <IntLink
          to={originalPath === '/home/' ? '/' : originalPath}
          language={lng}
          placeholder={lng}
          key={lng}
          className={clsx('flex mr-2 last-of-type:mr-0 font-sans white', langLink, {
            'underline underline-offset-4': i18n.resolvedLanguage === lng,
          })}
        >
          {lng}
        </IntLink>
      ))}
    </div>
  );

  return (
    <>
      <header className="fixed w-full z-50">
        <div
          className={clsx(
            'px-6 pt-4 pb-8 w-full flex justify-end transition-colors duration-300',
            navHolder,
            {
              'bg-black': barBlack,
            },
          )}
          data-testid="nav-holder"
        >
          <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} showHamburger={domLoaded} />
          <nav className="hidden lg:flex font-retro">
            {links}
            {socialLinks}
            {languageChanger}
          </nav>
        </div>
        <Link
          to="/"
          className={clsx('absolute top-1 left-1 sm:top-2 sm:left-2 lg:top-3 lg:left-5', imgLink)}
          aria-label={t('company_logo_label')}
        >
          <div
            className={clsx('p-2.5 pr-2 transition-colors duration-300', imgHolder, {
              'bg-black': barBlack,
            })}
          >
            <StaticImage
              src="./images/HeaderLogo.png"
              alt={t('company_logo_alt')}
              width={60}
              placeholder="none"
            />
          </div>
        </Link>
      </header>
      {domLoaded && (
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          {links}
          {socialLinks}
          {languageChanger}
        </Drawer>
      )}
    </>
  );
}
