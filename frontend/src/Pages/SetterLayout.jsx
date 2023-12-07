import React from "react";
const SetterLayout = (props) => {
  return (
    <div
      className="mx-auto pb-5 overflow-hidden p-5 pt-0 md:p-0 md:mt-20 w-full md:w-3/5"
      // style={{ width: "60%" }}
    >
      {props.children}
    </div>
  );
};
export default SetterLayout;
