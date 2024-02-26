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
    <div className="items-center rounded shadow flex w-full h-full md:w-76 bu-card-secondary">
      <div className="w-1/4 h-[100%]">
        <ImageLoader
          className="rounded-l"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
          src={image}
          alt="Loading..."
        />
      </div>
      <div className="p-3 w-3/4 flex flex-col items-start justify-start h-full">
        <h3 className="text-l md:text-xl font-bold tracking-tight bu-text-primary whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
          <a href="#">{name}</a>
        </h3>
        <div className="flex flex-col items-start">
          <span className="text-sm md:text-base bu-text-subtitle text">
            {position}
          </span>
          {/* <p className="font-light bu-text-subtitle text-sm md:text-base">
            {detail}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default SetterCard;
