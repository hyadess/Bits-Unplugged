import React, { useContext, useEffect, useState } from "react";


export default function ProfileInfo(props) {
  
  return (
    <div className="flex flex-row w-full shadow-md">
      <div className="flex justify-start md:flex w-3/5 md:w-1/3 cursor-pointer">
        <img
          className="h-80 w-80 rounded-full object-cover my-10"
          alt="blah"
          src={
            props.image != null
              ? props.image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
          }
        />
      </div>
      <div className="flex flex-col my-14">
        <p className="mb-4 text-center md:text-left  text-green-500 md:text-5xl font-bold">
          {props.username}
        </p>
        <p className="mb-8 text-center md:text-left  font-light  md:text-lg bu-text-subtitle">
          {props.fullname}
        </p>
        <p className="mb-3 text-center md:text-left  font-light  md:text-lg bu-text-subtitle">
          email: {props.email}
        </p>
      </div>
    </div>
  );
}
