import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Zoom } from "@mui/material";
import ImageLoader from "../ImageLoader";
const TopicCard = ({ id, name, image, path, action }) => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  return (
    <Zoom in={true}>
      <div class="flex flex-col items-center h-full md:px-0">
        <div class="flex flex-row max-w-sm border rounded-lg shadow-lg bu-card-primary h-full w-full">
          <div class="flex flex-col justify-between w-full">
            <h5 class="mt-4 text-2xl text-center font-bold tracking-tight bu-text-primary px-3">
              {id}
            </h5>
            <h5 class="flex items-center justify-center mb-4 text-3xl text-center font-bold tracking-tight  bu-text-title px-3 h-full">
              {name}
            </h5>
            <div className="w-full flex items-center justify-center cursor-pointer">
              <div
                onClick={() => switchPath(path)}
                class="inline-flex my-8 items-center  font-medium rounded-lg text-sm px-5 py-2.5 text-center bu-button-secondary"
              >
                <h5 class="text-lg text-center font-bold tracking-tight bu-text-primary">
                  {action}
                </h5>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <ImageLoader
              src={
                image
                  ? image
                  : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
              }
              alt=""
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default TopicCard;
