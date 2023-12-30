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
      <div className="flex flex-col items-center h-full md:px-0">
        <div className="flex flex-col max-w-sm border rounded-lg shadow-lg bu-card-primary h-full">
          <h5 className="mt-4 text-2xl text-center font-bold tracking-tight bu-text-primary px-3">
            {id}
          </h5>
          <h5 className="flex items-center justify-center mb-4 text-3xl text-center font-bold tracking-tight  bu-text-title px-3 h-full">
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
              width: 500,
              height: 200,
              objectFit: "cover",
            }}
          />
          <div className="w-full flex items-center justify-center cursor-pointer">
            <div
              onClick={() => {
                setLoading(true);
                switchPath(path);
              }}
              className="inline-flex my-8 items-center  font-medium rounded-lg text-sm px-5 py-2.5 text-center bu-button-secondary"
            >
              <h5 className="text-lg text-center font-bold tracking-tight bu-text-primary">
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
