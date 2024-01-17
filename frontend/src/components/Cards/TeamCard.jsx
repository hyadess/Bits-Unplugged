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
      <a href={props.href} className="transition bu-text-subtitle-hover">
        {props.icon}
      </a>
    );
  };
  return (
    <div className="items-center rounded shadow flex flex-col  w-75% h-full md:w-64 bu-card-secondary">
      <a href="#">
        <ImageLoader
          className="w-full rounded"
          style={{
            // width: "15rem",
            // height: "14rem",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
          src={image}
          alt="Loading..."
        />
      </a>
      <div className="p-5 h-full w-full flex flex-col items-center justify-between">
        <h3 className="text-l md:text-xl text-center font-bold tracking-tight bu-text-primary">
          <a href="#">{name}</a>
        </h3>
        <div className="flex flex-col items-center">
          <span className="text-sm md:text-base bu-text-subtitle text">
            {position}
          </span>

          <p className="mt-3 mb-4 font-light bu-text-subtitle text-sm md:text-base">
            {detail}
          </p>

          <ul className="w-full flex flex-row space-x-4 sm:mt-0 justify-center items-center">
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