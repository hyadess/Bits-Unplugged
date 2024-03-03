import React, { useEffect, useState } from "react";
import ImageLoader from "../ImageLoaders/ImageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setterActivityApi } from "api";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
const SetterCard = ({ setterId, name, image, email, position, detail }) => {
  const [totalProblems, setTotalProblems] = useState(0);
  const SocialIcon = (props) => {
    return (
      <a href={props.href} className="transition bu-text-subtitle-hover">
        {props.icon}
      </a>
    );
  };

  const GetInfo = async () => {
    const result = await setterActivityApi.getSetterInfo(setterId);
    console.log("in setter", setterId, result.data);
    if (result.success && result.data.length > 0) {
      setTotalProblems(result.data[0].totalProblems);
    }
  };

  useEffect(() => {
    GetInfo();
  }, []);

  return (
    <div className="items-center rounded shadow flex w-full h-full md:w-100 bu-card-secondary">
      <div className="w-1/3 h-[100%]">
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
        <div className="flex flex-col items-start">
          <span className="text-sm md:text-base bu-text-subtitle text">
            email: {email}
          </span>
          {/* <p className="font-light bu-text-subtitle text-sm md:text-base">
            {detail}
          </p> */}
        </div>
        <div className="flex flex-col items-start pt-5">
          <span className="text-sm md:text-base font-bold bu-text-subtitle text">
            <FontAwesomeIcon icon={faPenNib} />
            {totalProblems}
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
