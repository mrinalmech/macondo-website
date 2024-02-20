import React from 'react';
import Container from 'react-bootstrap/Container';
import clsx from 'clsx';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faDiscord,
  faTwitch,
} from '@fortawesome/free-brands-svg-icons';

import SocialLink from '../../../components/atoms/SocialLink';

import { root } from './Footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Container
      fluid
      className={clsx(root, 'flex py-4 flex-col items-center justify-center')}
      as="footer"
    >
      <h2 className="dark-blue m-0 h3 font-retro">Keep up with us!</h2>
      <div className="mt-4 mb-5 flex">
        <SocialLink
          to="https://twitter.com/macondostudios"
          ariaLabel="Twitter"
          icon={faTwitter}
          type="big"
        />
        <SocialLink
          to="https://www.facebook.com/macondostudios"
          ariaLabel="Facebook"
          icon={faFacebookF}
          type="big"
        />
        <SocialLink
          to="https://www.instagram.com/globalsteelgame"
          ariaLabel="Instagram"
          icon={faInstagram}
          type="big"
        />
        <SocialLink
          to="https://www.youtube.com/channel/UCfYKziK0Ll8UZ9AiMTZT9DA"
          ariaLabel="Youtube"
          icon={faYoutube}
          type="big"
        />
        <SocialLink
          to="https://discord.gg/qVBvuy7Ny3"
          ariaLabel="Discord"
          icon={faDiscord}
          type="big"
        />
        <SocialLink
          to="https://www.twitch.tv/macondogames"
          ariaLabel="Twitch"
          icon={faTwitch}
          type="big"
        />
      </div>
      <p className="white m-0 text-center font-sans">
        {' '}
        Copyright © {currentYear} | Macondo Games Pvt. Ltd.{' '}
      </p>
    </Container>
  );
}
