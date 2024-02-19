import React from "react";
import ImageLoader from "../ImageLoaders/ImageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SetterCard = ({ name, image, position, detail }) => {
  const SocialIcon = (props) => {
    return (
      <a href={props.href} className="transition bu-text-subtitle-hover">
        {props.icon}
      </a>
    );
  };

  return (
    <div className="items-center rounded shadow flex w-half h-half md:w-76 bu-card-secondary">
      <div className="w-1/3">
        <a href="#">
          <ImageLoader
            className="w-full h-full rounded-l"
            style={{
              objectFit: "cover",
              aspectRatio: "1/1",
            }}
            src={image}
            alt="Loading..."
          />
        </a>
      </div>
      <div className="p-5 w-1/2 flex flex-col items-start justify-between">
        <h3 className="text-l md:text-xl font-bold tracking-tight bu-text-primary">
          <a href="#">{name}</a>
        </h3>
        <div className="flex flex-col items-start">
          <span className="text-sm md:text-base bu-text-subtitle text">
            {position}
          </span>

          <p className="mt-3 mb-4 font-light bu-text-subtitle text-sm md:text-base">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetterCard;
