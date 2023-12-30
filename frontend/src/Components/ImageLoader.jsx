import React, { useContext, useEffect, useState } from "react";

import { setLoading } from "../App";
const ImageLoader = ({ src, alt, style, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="smooth-image-wrapper">
      <img
        src={src}
        alt={alt}
        className={
          `transition-opacity duration-1000 opacity-${
            imageLoaded ? "100" : "0"
          } ` + className
        }
        onLoad={() => {
          setLoading(false);
          setImageLoaded(true);
        }}
        style={style}
      />
      {!imageLoaded && (
        <div style={style}>
          <span className="loader" />
        </div>
      )}
    </div>
  );
};

export default ImageLoader;
