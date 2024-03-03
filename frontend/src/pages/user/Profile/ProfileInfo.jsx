import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Avatar, InputAdornment, Typography } from "@mui/material";
import { profileApi } from "../../../api";
import Title from "../../../components/Title";
import { ratingApi } from "../../../api";

export default function ProfileInfo() {
  const [curUser, setCurUser] = useState(null);


  const { username } = useParams();
  const fetchUser = async () => {
    const isLoggedIn = localStorage.hasOwnProperty("token");
    if (!isLoggedIn) {
      return;
    }
    const res = await profileApi.getProfileByUsername(username);
    if (res.success) setCurUser(res.data[0]);
    console.log(curUser);
    
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-row w-full shadow-md">
      <div className="flex justify-start md:flex w-3/5 md:w-1/3 cursor-pointer">
        <img
          className="h-80 w-80 rounded-full object-cover my-10"
          alt="blah"
          src={
            curUser != null
              ? curUser.image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
          }
        />
      </div>
      <div className="flex flex-col my-14">
        <p className="mb-4 text-center md:text-left  text-green-500 md:text-5xl font-bold">
          {curUser?.username}
        </p>
        <p className="mb-8 text-center md:text-left  font-light  md:text-lg bu-text-subtitle">
          {curUser?.fullname}
        </p>
        <p className="mb-3 text-center md:text-left  font-light  md:text-lg bu-text-subtitle">
          email: {curUser?.email}
        </p>
      </div>
    </div>
  );
}
