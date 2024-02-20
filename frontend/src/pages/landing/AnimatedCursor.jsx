import React from "react";
import AnimatedCursor from "react-animated-cursor";

const AnimateCursor = () => {
  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color="0, 100, 100"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
      />
    </>
  );
};

export default AnimateCursor;
