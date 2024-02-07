import React, { useContext, useEffect, useState } from "react";

import { setLoading } from "../App";
const ImageLoader = ({ src, alt, style, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="smooth-image-wrapper" style={{ zIndex: 10 }}>
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-1000 opacity-${
          imageLoaded ? "100" : "0"
        } ${className ? className : ""}`}
        onLoad={() => {
          setLoading(false);
          setImageLoaded(true);
        }}
        style={style}
      />
      {!imageLoaded && (
        <div className="smooth-preloader">
          <span className="loader" />
        </div>
      )}
    </div>
  );
};

export default ImageLoader;
