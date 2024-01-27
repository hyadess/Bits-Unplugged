import React, { useState, useEffect, useContext, Suspense } from "react";

import Layout1 from "../../components/Layouts/Layout1";
import PublicNavbar from "./PublicNavbar";
import Hero from "./Hero";
import Solving from "./Solving";
import Setting from "./Setting";
import Navbar from "../../components/Navbar";
const Team = React.lazy(() => import("./Team"));
const Footer = React.lazy(() => import("../../components/Footer"));
const Home = () => {
  const [nav, setNav] = useState(0);
  return (
    <Layout1>
      <Navbar>
        <PublicNavbar nav={nav} setNav={setNav} />
      </Navbar>

      <Hero setNav={setNav} />
      <Solving setNav={setNav} />
      <Setting />
      <Suspense fallback={<div>Loading...</div>}>
        <Team setNav={setNav} />
        <Footer />
      </Suspense>
    </Layout1>
  );
};

export default Home;
