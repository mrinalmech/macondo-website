import React from "react"
import Container from "react-bootstrap/Container"
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

import { root, socialLink } from "./Footer.module.scss"

interface LinkProps {
  to: string
  children: React.Node
}

const SocialLink = (props: LinkProps) => (
  <a
    href={props.to}
    className={clsx(
      socialLink,
      "mr-1 ml-1 ml-sm-2 mr-sm-2 ml-md-3 mr-md-3 d-inline-block d-flex align-items-center justify-content-center"
    )}
    target="_blank"
    rel="noreferrer"
  >
    {props.children}
  </a>
)


export default function Footer() {

  const currentYear = new Date().getFullYear();

  return <Container fluid className={clsx(root, "d-flex pt-4 pb-4 flex-column align-items-center justify-content-center")}>
    <h5 className="dark-blue m-0">Keep up with us!</h5>
    <div className="mt-4 mb-5 d-flex">
      <SocialLink to="https://twitter.com/macondostudios">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </SocialLink>
      <SocialLink to="https://www.facebook.com/macondostudios">
        <FontAwesomeIcon icon={faFacebookF} size="2x" />
      </SocialLink>
      <SocialLink to="https://www.instagram.com/globalsteelgame">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </SocialLink>
      <SocialLink to="https://www.youtube.com/channel/UCfYKziK0Ll8UZ9AiMTZT9DA">
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </SocialLink>
      <SocialLink to="https://discord.gg/qVBvuy7Ny3">
        <FontAwesomeIcon icon={faDiscord} size="2x" />
      </SocialLink>
      <SocialLink to="https://www.twitch.tv/macondogames">
        <FontAwesomeIcon icon={faTwitch} size="2x" />
      </SocialLink>
    </div>
    <p className="open-sans white m-0 text-center"> Copyright © {currentYear} | Macondo Games Pvt. Ltd. </p>
  </Container>
}
