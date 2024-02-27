import React, { useEffect, useState } from "react";
import ImageLoader from "../ImageLoaders/ImageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setterActivityApi } from "api";
import {
  faFacebook,
  faGithub,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faUserPlus,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";

const SetterCard = ({ setterId, name, image, position, detail, email }) => {
  const [numberOfProblems, setNumberOfProblems] = useState();
  const getAllProblems = async () => {
    const result = await setterActivityApi.getAllProblems(setterId);
    if (result.success) {
      setNumberOfProblems(result.data.length);
    }
  };
  const SocialIcon = (props) => {
    return (
      <a href={props.href} className="transition bu-text-subtitle-hover">
        {props.icon}
      </a>
    );
  };
  useEffect(() => {
    getAllProblems();
  }, [setterId]);
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
      <div className="p-3 px-5 w-full flex flex-col items-center justify-start h-full gap-3">
        <div className="flex flex-col gap-3">
          <h3 className="text-l md:text-xl font-bold tracking-tight bu-text-primary whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full flex-center">
            <a href="#">{name}</a>
          </h3>
          <div className="flex flex-row gap-5 justify-center">
            <span
              className={
                "text-sm md:text-base bu-text-primary text border-2 px-2 rounded-full font-semibold cursor-default flex flex-row gap-2 items-center " +
                (position == "owner" ? "bg-[#aadfcf]" : "bg-gray-200")
              }
            >
              <FontAwesomeIcon
                icon={position === "owner" ? faUserTie : faUserPlus}
              />

              {position}
            </span>
            <Tooltip
              title={
                <h1 className="text-lg text-white text-center">
                  {name} has created {numberOfProblems} problems
                </h1>
              }
              placement="top"
              arrow
              size="large"
            >
              <span className="text-sm md:text-base bu-text-primary font-semibold text border-2 px-2 rounded-full cursor-default bg-gray-200">
                # {numberOfProblems}
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <ul className="w-full flex flex-row space-x-4 sm:mt-0 justify-center items-center">
            <li>
              <SocialIcon
                href="#"
                icon={<FontAwesomeIcon icon={faFacebook} />}
              />
            </li>
            <li>
              <SocialIcon
                href={"mailto:" + email}
                icon={<FontAwesomeIcon icon={faEnvelope} />}
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

export default SetterCard;
