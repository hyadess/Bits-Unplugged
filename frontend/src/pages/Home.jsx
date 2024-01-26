import React, { useState, useEffect, useContext, Suspense } from "react";

import { useNavigate } from "react-router-dom";
import ImageLoader from "../components/ImageLoader";
import { setLoading } from "../App";
import GlobalContext from "../store/GlobalContext";
const Team = React.lazy(() => import("./Team"));
const Footer = React.lazy(() => import("../components/Footer"));
const Home = () => {
  const { type } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Loaded");
  }, []);
  return (
    <div>
      <div
        id="home"
        className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center gap-8 px-4 py-8 sm:py-16 md:flex-row  md:justify-end lg:px-6 xl:gap-16"
      >
        {/* <img
            className="w-full dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="dashboard image"
          /> */}
        <div className="flex flex-row gap-0 md:w-50%">
          <ImageLoader
            className="block w-full dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="dashboard image"
          />
          <ImageLoader
            className="hidden w-full dark:block"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
            alt="dashboard image"
          />
        </div>

        <div className="mt-4 md:mt-0 md:w-50%">
          <h2 className="bu-text-primary mb-4 text-center text-4xl font-extrabold tracking-tight md:text-left">
            A platform for exploring{" "}
            <span className="bu-text-title text-5xl">Computer Science</span>{" "}
            without coding{" "}
          </h2>

          <p className="bu-text-subtitle mb-6 text-center  font-light md:text-left md:text-lg">
            Bits unplugged is a platform for students to solve CS problems
            without needing to write a single line of code through an
            interactive medium
          </p>

          <div
            onClick={() => {
              setLoading(true);
              type == 2
                ? navigate("/admin/topics")
                : type == 1
                  ? navigate("/problemSet")
                  : type == 0
                    ? navigate("/topics")
                    : navigate("/login");
            }}
            className="bu-button-secondary bu-text-primary inline-flex cursor-pointer items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium"
          >
            Get started
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div
        id="features"
        className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center gap-8 px-4 py-8 sm:py-16 md:flex-row  md:justify-end lg:px-6 xl:gap-16"
      >
        <div className="mt-4 md:mt-0 md:w-50%">
          <h2 className="bu-text-primary mb-4 text-center text-4xl font-extrabold tracking-tight md:text-left">
            Unleash Solutions with our{" "}
            <span className="bu-text-title text-5xl">Interactive</span> canvases
          </h2>

          <p className="bu-text-subtitle mb-6 text-center  font-light md:text-left md:text-lg">
            There are plenty of canvases to choose from. Each canvas is designed
            to help you understand a particular topic in a fun and interactive
            way.
          </p>

          <div
            onClick={() => {
              setLoading(true);
              type == 2
                ? navigate("/admin/topics")
                : type == 1
                  ? navigate("/problemSet")
                  : type == 0
                    ? navigate("/topics")
                    : navigate("/login?type=solver");
            }}
            className="bu-button-secondary bu-text-primary inline-flex cursor-pointer items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium"
          >
            Sign In
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <div className="flex flex-row gap-0 md:w-50%">
          <ImageLoader
            className="block w-full dark:hidden"
            src="/gifs/toh_light.gif"
            alt="dashboard image"
          />
          <ImageLoader
            className="hidden w-full dark:block"
            src="/gifs/toh_dark.gif"
            alt="dashboard image"
          />
        </div>
      </div>

      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center gap-8 px-4 py-8 sm:py-16 md:flex-row  md:justify-end lg:px-6 xl:gap-16">
        <div className="flex flex-row gap-0 md:w-50%">
          <video className="block w-full dark:hidden" autoPlay loop muted>
            <source src="/videos/graph_light.mp4" type="video/mp4" />
          </video>
          {/* <ImageLoader
            className="block w-full dark:hidden"
            src="/gifs/toh_light.gif"
            alt="dashboard image"
          /> */}
          <video className="hidden w-full dark:block" autoPlay loop muted>
            <source src="/videos/graph_dark.mp4" type="video/mp4" />
          </video>
          {/* <ImageLoader
            className="hidden w-full dark:block"
            src="/gifs/toh_dark.gif"
            alt="dashboard image"
          /> */}
        </div>

        <div className="mt-4 md:mt-0 md:w-50%">
          <h2 className="bu-text-primary mb-4 text-center text-4xl font-extrabold tracking-tight md:text-left">
            Design exciting{" "}
            <span className="bu-text-title text-5xl">Challenges</span> for the
            users
          </h2>

          <p className="bu-text-subtitle mb-6 text-center  font-light md:text-left md:text-lg">
            You can design your own challenges for the users to solve. You can
            also arrange your own contests.
          </p>

          <div
            onClick={() => {
              setLoading(true);
              type == 2
                ? navigate("/admin/topics")
                : type == 1
                  ? navigate("/problemSet")
                  : type == 0
                    ? navigate("/topics")
                    : navigate("/login?type=setter");
            }}
            className="bu-button-secondary bu-text-primary inline-flex cursor-pointer items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium"
          >
            Sign In
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Team />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
