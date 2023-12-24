import React, { useContext, useEffect, useState } from "react";
import "./ImageLoader.scss";
import { setLoading } from "../App";
function ImageLoader({ src, alt, style, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="smooth-image-wrapper">
      <img
        src={src}
        alt={alt}
        className={
          `smooth-image image-${imageLoaded ? "visible" : "hidden"} ` +
          className
        }
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
}

export default ImageLoader;
