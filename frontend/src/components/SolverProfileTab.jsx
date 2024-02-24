import { profileApi } from "api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageLoader from "./ImageLoaders/ImageLoader";
import { set } from "date-fns";

const SolverProfileTab = (props) => {
  const tabs = ["Details", "Contests", "Submissions"];
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
    //console.log(res.data[0]);
  };
  useEffect(() => {
    setCurUser(null);
    fetchUser();
  }, [username]);

  return (
    <div className="flex flex-col w-full mx-auto justify-start gap-10">
      <div className="flex flex-col items-center">
        <ImageLoader
          className="w-full rounded"
          style={{
            width: "10rem",
            height: "10rem",
            objectFit: "cover",
            aspectRatio: "1/1",
            borderRadius: "50%",
          }}
          src={
            curUser != null
              ? curUser.image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
          }
          alt="Loading..."
        />
        <p className="mb-4 text-center md:text-left  text-green-500 md:text-5xl font-bold">
          {curUser?.username}
        </p>
        <p className="mb-8 text-center md:text-left  font-light  md:text-lg bu-text-subtitle">
          {curUser?.fullname}
        </p>
      </div>

      {/* <img
        className="h-80 w-80 rounded-full object-cover my-10"
        alt="blah"
        src={
          curUser != null
            ? curUser.image
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
        }
      /> */}
      <div className="p-0 flex flex-col justify-between w-full">
        {tabs.map((tab, index) => (
          <div
            className={`cursor-pointer flex-grow px-5 py-5 text-center  font-bold text-2xl hover:bg-gray-200 ${
              tab === props.activeTab
                ? "border-r-4 bu-text-title"
                : "bu-text-disable"
            }`}
            onClick={() => props.click(tab)}
            key={index}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolverProfileTab;
