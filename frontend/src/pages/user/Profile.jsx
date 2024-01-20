import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
export default function Profile() {
  const navigate = useNavigate();
  useEffect(() => {
    //getData()
  }, []);

  return (
    <div className="flex flex-col">
      <Title title={"Profile Page"} />
    </div>
  );
}
