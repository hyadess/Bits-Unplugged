import React from "react";
import ImageLoader from "../ImageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faGithub,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const TeamCard = ({ name, image, position, detail }) => {
  const SocialIcon = (props) => {
    return (
      <a href={props.href} class="transition bu-text-subtitle-hover">
        {props.icon}
      </a>
    );
  };
  return (
    <div class="items-center rounded shadow flex flex-col  w-75% h-full md:w-64 bu-card-secondary">
      <a href="#">
        <ImageLoader className="w-full rounded" src={image} alt="Loading..." />
      </a>
      <div class="p-5 h-full w-full flex flex-col items-center justify-between">
        <h3 class="text-l md:text-xl text-center font-bold tracking-tight bu-text-primary">
          <a href="#">{name}</a>
        </h3>
        <div className="flex flex-col items-center">
          <span class="text-sm md:text-base bu-text-subtitle text">
            {position}
          </span>

          <p class="mt-3 mb-4 font-light bu-text-subtitle text-sm md:text-base">
            {detail}
          </p>

          <ul class="w-full flex flex-row space-x-4 sm:mt-0 justify-center items-center">
            <li>
              <SocialIcon
                href="#"
                icon={<FontAwesomeIcon icon={faFacebook} />}
              />
            </li>
            <li>
              <SocialIcon
                href="#"
                icon={<FontAwesomeIcon icon={faTwitter} />}
              />
            </li>
            <li>
              <SocialIcon href="#" icon={<FontAwesomeIcon icon={faGithub} />} />
            </li>
            <li>
              <SocialIcon
                href="#"
                icon={<FontAwesomeIcon icon={faLinkedinIn} />}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;