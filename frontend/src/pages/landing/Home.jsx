import React, {
  useState,
  useEffect,
  useContext,
  Suspense,
  useRef,
} from "react";
import smoothscroll from "smoothscroll-polyfill";
import Layout1 from "../../components/Layouts/Layout1";
import PublicNavbar from "./PublicNavbar";
import Hero from "./Hero";
import Solving from "./Solving";
import Setting from "./Setting";
import Navbar from "../../components/Navbar";
import { useIsVisible } from "../../hooks/useIsVisible";
const Team = React.lazy(() => import("./Team"));
const Footer = React.lazy(() => import("../../components/Footer"));
const Home = () => {
  const [nav, setNav] = useState(0);
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutusRef = useRef(null);
  const settingRef = useRef(null);
  const handleClick = (newNav) => {
    setNav(newNav);
    smoothscroll.polyfill();
    if (newNav === "home") {
      homeRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (newNav === "features") {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (newNav === "aboutus") {
      aboutusRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Layout1>
      <Navbar>
        <PublicNavbar nav={nav} setNav={handleClick} />
      </Navbar>
      <Hero setNav={setNav} ref={homeRef} />
      <Solving setNav={setNav} ref={featuresRef} />
      <Setting setNav={setNav} ref={settingRef} />
      <Suspense fallback={<div>Loading...</div>}>
        <Team setNav={setNav} ref={aboutusRef} />
        <Footer />
      </Suspense>
    </Layout1>
  );
};

export default Home;
