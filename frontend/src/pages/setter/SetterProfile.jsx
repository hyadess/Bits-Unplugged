import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import ProfileInfo from "pages/user/Profile/ProfileInfo";
import { setLoading } from "App";
export default function SetterProfile() {
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div>
      <ProfileInfo />
    </div>
  );
}
