import { profileApi, ratingApi } from "api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageLoader from "./ImageLoaders/ImageLoader";
import { set } from "date-fns";

const SolverProfileTab = (props) => {
  const tabs = ["Details", "Contests", "Submissions"];
  const [curUser, setCurUser] = useState(null);
  const [rating, setRating] = useState(null);
  const [userId, setUserId] = useState(null);
  const [position, setPosition] = useState(null);
  const { username } = useParams();

  const getId = async () => {
    const res = await profileApi.getIdByUsername(username);
    if (res.success) {
      console.log("data for id", res.data);
      setUserId(res.data[0].id);
    }
  };

  const getRating = async () => {
    console.log("userId before rating fetch", userId);
    const res = await ratingApi.getRating(userId);
    if (res.success && res.data.length > 0) {
      setRating(res.data[0].rating);
      setPosition(res.data[0].position);
    }
  };
  const fetchUser = async () => {
    const isLoggedIn = localStorage.hasOwnProperty("token");
    if (!isLoggedIn) {
      return;
    }
    const res = await profileApi.getProfileByUsername(username);
    if (res.success) setCurUser(res.data[0]);
    console.log(curUser);

    // const res2 = await ratingApi.getRating();
    // setRating(res2.data[0]);

    //console.log(res.data[0]);
  };
  useEffect(() => {
    setCurUser(null);
    getId();
    fetchUser();
  }, [username]);

  useEffect(() => {
    if (userId === null) return;
    //setLoading(true);
    getRating();
  }, [userId]);
  return (
    <div className="flex flex-col w-full mx-auto justify-start gap-10">
      <div className="items-start rounded shadow flex flex-col bu-card-secondary mt-3">
        <ImageLoader
          className="w-full rounded"
          style={{
            // width: "10rem",
            // height: "10rem",
            objectFit: "cover",
            aspectRatio: "1/1",
            // borderRadius: "50%",
          }}
          src={
            curUser != null
              ? curUser.image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
          }
          alt="Loading..."
        />
        <div className="flex flex-col p-3">
          <p className="text-center md:text-left bu-text-title md:text-3xl font-bold">
            {curUser?.fullname}
          </p>
          <div className="flex flex-row justify-between">
            <p className="text-center md:text-left md:text-xl bu-text-primary">
              @{curUser?.username}
            </p>
            <div className="bu-text-primary">
              {rating === null ? "Unranked" : rating}
            </div>
          </div>
        </div>

        {/* <p className="mb-8 text-center md:text-left  font-light  md:text-lg bu-text-subtitle">
          {"Rating : " + rating?.rating}
        </p> */}
      </div>
      <div className="p-0 flex flex-col justify-between w-full">
        {tabs.map((tab, index) => (
          <div
            className={`cursor-pointer flex-grow px-5 py-3 text-center  font-bold text-2xl ${
              tab === props.activeTab
                ? "border-r-4 bu-text-title bg-white"
                : "bu-text-disable hover:bg-gray-200"
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
