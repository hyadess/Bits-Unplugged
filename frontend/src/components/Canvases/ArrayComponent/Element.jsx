import { Divider } from "@mui/material";
import { useEffect } from "react";

export default function Element({ label, row, col }) {
  useEffect(() => {
    console.log("Label:", label);
  }, []);
  return (
    <div className="bu-nav-color rounded-lg w-[100%] cursor-pointer flex flex-col relative">
      <div className="flex-center text-3xl font-semibold bu-text-primary p-4">
        {label}
      </div>
      {/* <Divider /> */}
      <div className="absolute top-0 right-1">{col}</div>
      <div className="absolute bottom-0 left-1">{row}</div>
    </div>
  );
}
