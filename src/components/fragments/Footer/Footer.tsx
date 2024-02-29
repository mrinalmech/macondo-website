import React from 'react';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
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
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={clsx(root, '-mt-12 flex pt-8 pb-6 flex-col items-center justify-center bg-black')}
    >
      <h2 className="red m-0 px-1 font-retro text-center text-xl sm:text-2xl">
        <Trans i18nKey="footer_text">Keep up with us!</Trans>
      </h2>
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
      <p className="red px-1 text-center font-sans text-sm sm:text-base">
        {`${t('copyright')} © ${currentYear} | Macondo Games Pvt. Ltd.`}
      </p>
    </footer>
  );
}
