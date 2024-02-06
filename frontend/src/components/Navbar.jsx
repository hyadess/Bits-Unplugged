import React from "react";

const Navbar = (props) => {
  return (
    <div className="flex flex-row w-screen z-100 h-20 md:flex-col md:w-screen fixed bottom-0 md:top-0 justify-center z-50">
      {props.children}
    </div>
  );
};

export default Navbar;
