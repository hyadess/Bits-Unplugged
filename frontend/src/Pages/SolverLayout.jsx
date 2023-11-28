import React from "react";
const SolverLayout = (props) => {
  return (
    <div>
      <div
        className="left w-1/4 p-5 md:mt-20"
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          top: "0",
          width: "20%",
        }}
      >
        <div
          className="max-w-sm  border border-slate-500 rounded-lg shadow-lg bg-slate-800 border-slate-800"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Put unsolved and bookmarked problems here
        </div>
      </div>
      <div className="mx-auto pb-5 overflow-hidden" style={{ width: "60%" }}>
        {props.children}
      </div>
      <div
        className="right p-5 flex flex-col gap-5 md:mt-20"
        style={{
          position: "fixed",
          right: "0",
          bottom: "0",
          top: "0",
          width: "20%",
        }}
      >
        <div
          className="max-w-sm  border border-slate-500 rounded-lg shadow-lg bg-slate-800 border-slate-800"
          style={{
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Put Stats here
        </div>
        <div
          className="max-w-sm  border border-slate-500 rounded-lg shadow-lg bg-slate-800 border-slate-800"
          style={{
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Put Stats here
        </div>
      </div>
    </div>
  );
};
export default SolverLayout;
