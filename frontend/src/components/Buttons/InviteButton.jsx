import React from "react";
import { Add as AddIcon } from "@mui/icons-material";

const InviteButton = ({ onClick }) => {
  return (
    <div className="fixed top-20 z-10 right-10 hidden md:flex items-center justify-center">
      <div
        onClick={onClick}
        className="w-32 h-16 rounded-lg inline-flex items-center text-white font-medium text-sm p-4 text-center cursor-pointer shadow-lg bg-blue-500 hover:bg-blue-600"
      >
        <div className="text-[#ebebeb] dark:text-gray-900">
          Invite
        </div>
      </div>
    </div>
  );
};

export default InviteButton;

