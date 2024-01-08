import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Zoom } from "@mui/material";
import ImageLoader from "../ImageLoader";
import { setLoading } from "../../App";
const CustomCard = ({ id, name, image, path, action }) => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  return (
    <Zoom in={true}>
      <div className="flex h-full flex-col items-center md:px-0">
        <div className="bu-card-primary flex h-full md:w-full flex-col rounded-lg border shadow-lg">
          <h5 className="bu-text-primary mt-4 px-3 text-center text-2xl font-bold tracking-tight">
            {id}
          </h5>
          <h5 className="bu-text-title mb-4 flex h-full items-center justify-center px-3 text-center  text-3xl font-bold tracking-tight">
            {name}
          </h5>

          <ImageLoader
            src={
              image
                ? image
                : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
            }
            alt=""
            style={{
              // width: "15rem",
              // height: "14rem",
              objectFit: "cover",
              aspectRatio: "1/1",
            }}
            className="w-[18rem] md:w-full"
          />
          <div className="flex w-full cursor-pointer items-center justify-center">
            <div
              onClick={() => {
                setLoading(true);
                switchPath(path);
              }}
              className="bu-button-secondary my-8 inline-flex  items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium"
            >
              <h5 className="bu-text-primary text-center text-lg font-bold tracking-tight">
                {action}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default CustomCard;
