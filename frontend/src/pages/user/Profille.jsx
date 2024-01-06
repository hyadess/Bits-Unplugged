import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
export default function Profile() {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  useEffect(() => {
    //getData()
  }, []);

  return (
    <div className="flex flex-col">
      <Title title={"Profile Page"} />
    </div>
  );
}
