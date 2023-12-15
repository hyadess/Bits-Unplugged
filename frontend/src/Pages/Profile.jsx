import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../Components/Title";
export default function Profile() {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const baseURL = "https";
  const getData = async () => {
    try {
      const res = await axios.get(`${baseURL}/courses`);
      setData(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    //getData()
  }, []);
  return (
    <div className="flex flex-col bg-gray-900">
      <div class="  bg-gray-900">
        <Title title={"Profile Page"} />
      </div>
    </div>
  );
}
