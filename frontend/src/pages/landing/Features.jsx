import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import ImageLoader from "../../components/ImageLoaders/ImageLoader";
import { useContext, useEffect, useRef } from "react";
import GlobalContext from "../../store/GlobalContext";
import { useIsVisible } from "../../hooks/useIsVisible";
import Solving from "./Solving";
import Setting from "./Setting";

const Features = ({ setNav }) => {
  const navigate = useNavigate();
  const { type } = useContext(GlobalContext);
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (isVisible) {
      setNav("features");
    }
  }, [isVisible]);

  return (
    <div id="features" ref={ref}>
      <Solving />
      <Setting />
    </div>
  );
};

export default Features;
