import React, { useState, useEffect } from "react";

import Footer from "../Components/Footer";
import TeamCard from "../Components/Cards/TeamCard";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Banner from "../Components/Banner";
import ImageLoader from "../Components/ImageLoader";
import "./Home.scss";
import { setLoading } from "../App";

const Home = () => {
  const [type, setType] = useState(-1);
  const navigator = useNavigate();
  useEffect(() => {
    const cookies = new Cookies();
    const isLoggedIn = !!cookies.get("token");
    const userType = cookies.get("type");
    // if (isLoggedIn) {
    //   navigator(userType === 0 ? "/topics" : "/problemSet");
    // }
    setType(userType);
  }, []);
  return (
    <div>
      <div class="gap-8 h-screen items-center py-8 px-4 mx-auto max-w-screen-xl flex flex-col md:flex-row sm:py-16 lg:px-6 xl:gap-16">
        {/* <img
            class="w-full dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="dashboard image"
          /> */}
        <div className="flex flex-row gap-0">
          <ImageLoader
            className="w-full home-cover-light"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="dashboard image"
          />
          <ImageLoader
            className="w-full home-cover-dark"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
            alt="dashboard image"
          />
        </div>

        <div class="mt-4 md:mt-0">
          <h2 class="mb-4 text-center md:text-left text-4xl tracking-tight font-extrabold bu-text-primary">
            {" "}
            A platform for learning{" "}
            <span class="text-[#1C5B5F] text-5xl">Computer Science</span>{" "}
            without coding{" "}
          </h2>

          <p class="mb-6 text-center md:text-left  font-light bu-text-subtitle md:text-lg">
            Bits unplugged is a platform for students to learn complex CS
            concepts without needing to write a single line of code through an
            interactive medium
          </p>

          <div
            onClick={() => {
              setLoading(true);
              type === 2
                ? navigator("/admin/topics")
                : type === 1
                ? navigator("/problemSet")
                : navigator("/topics");
            }}
            class="inline-flex text-center items-center font-medium rounded-lg text-sm px-5 py-2.5 bu-button-secondary bu-text-primary cursor-pointer"
          >
            Get started
            <svg
              class="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <section>
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold bu-text-primary">
              Our Team
            </h2>

            <p class="font-light lg:mb-16 sm:text-xl bu-text-subtitle">
              Meet our dynamic team who are here to help you at each step of
              your journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 place-items-center mx-auto gap-8 h-full w-full md:w-75%">
            <TeamCard
              name="Sayem Shahad Soummo"
              position="1905064"
              detail="Frontend Developer"
              image="https://i.pinimg.com/736x/ec/9d/ac/ec9dac50ce3b1faa401a3ad7ea1711de.jpg"
            />
            <TeamCard
              name="Mahir Labib Dihan"
              position="1905072"
              detail="Devops"
              image="https://i.pinimg.com/564x/7c/0b/89/7c0b8922957831dc3ef513b08157de73.jpg"
            />
            <TeamCard
              name="Souvik Ghosh"
              position="1905073"
              detail="Backend Developer"
              image="https://openseauserdata.com/files/1d823e6999a056302a4415abf07f2c10.jpg"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
