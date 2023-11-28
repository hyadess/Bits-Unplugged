import React from "react";
const SetterLayout = (props) => {
  return (
    <div className="mx-auto pb-5 overflow-hidden" style={{ width: "60%" }}>
      {props.children}
    </div>
  );
};
export default SetterLayout;
