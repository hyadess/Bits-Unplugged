import { setLoading } from "App";
import React, { useState, useEffect } from "react";

export default function SetterHome() {
  useEffect(() => {
    // document.title = "Bits Unplugged | Home";
    setLoading(false);
  }, []);
  return <div></div>;
}
// Path: frontend/src/pages/setter/SetterHome.jsx
