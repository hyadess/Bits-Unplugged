import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { profileApi } from "../../api";

export default function ProfileInfo() {
  const [curUser, setCurUser] = useState(null);

  const { username } = useParams();
  const fetchUser = async () => {
    const isLoggedIn = localStorage.hasOwnProperty("token");
    if (!isLoggedIn) {
      return;
    }
    const res = await profileApi.getProfile();
    if (res.success) setCurUser(res.data[0]);
    console.log(curUser);
    //console.log(res.data[0]);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-row w-full justify-between md:justify-center shadow-md">
      <h1>Profile Info</h1>
      <p>{curUser?.username}</p>
      <p>{curUser?.email}</p>
    </div>
  );
}
