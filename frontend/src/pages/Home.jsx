import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import TeamCard from "../components/Cards/TeamCard";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Banner from "../components/Banner";
import ImageLoader from "../components/ImageLoader";
import { setLoading } from "../App";

const Home = () => {
  const [type, setType] = useState(-1);
  const navigator = useNavigate();
  useEffect(() => {
    const cookies = new Cookies();
    const isLoggedIn = localStorage.hasOwnProperty("token");
    const userType = localStorage.getItem("type");
    // if (isLoggedIn) {
    //   navigator(userType === 0 ? "/topics" : "/problemSet");
    // }
    setType(userType || -1);
    console.log("Type:", userType || -1);
  }, [localStorage]);

  useEffect(() => {
    console.log("New Type:", type);
  }, [type]);
  return (
    <div>
      <div className="mx-auto flex h-screen max-w-screen-xl flex-col items-center gap-8 px-4 py-8 sm:py-16 md:flex-row lg:px-6 xl:gap-16">
        {/* <img
            className="w-full dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="dashboard image"
          /> */}
        <div className="flex flex-row gap-0">
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

        <div className="mt-4 md:mt-0">
          <h2 className="bu-text-primary mb-4 text-center text-4xl font-extrabold tracking-tight md:text-left">
            {" "}
            A platform for learning{" "}
            <span className="bu-text-title text-5xl">
              Computer Science
            </span>{" "}
            without coding{" "}
          </h2>

          <p className="bu-text-subtitle mb-6 text-center  font-light md:text-left md:text-lg">
            Bits unplugged is a platform for students to learn complex CS
            concepts without needing to write a single line of code through an
            interactive medium
          </p>

          <div
            onClick={() => {
              setLoading(true);
              type == 2
                ? navigator("/admin/topics")
                : type == 1
                  ? navigator("/problemSet")
                  : type == 0
                    ? navigator("/topics")
                    : navigator("/login");
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

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16 ">
          <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
            <h2 className="bu-text-primary mb-4 text-4xl font-extrabold tracking-tight">
              Our Team
            </h2>

            <p className="bu-text-subtitle font-light sm:text-xl lg:mb-16">
              Meet our dynamic team who are here to help you at each step of
              your journey
            </p>
          </div>
          <div className="mx-auto grid h-full w-full grid-cols-1 place-items-center gap-8 md:w-75% md:grid-cols-3">
            <TeamCard
              name="Sayem Shahad Soummo"
              position="1905064"
              detail="Frontend Developer"
              image="https://scontent.fdac19-1.fna.fbcdn.net/v/t1.6435-9/89262909_729184384280492_2611776918436970496_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd63ad&_nc_eui2=AeGbsVBatE9_94rhLSNjV6JzzUJTCWVFGxvNQlMJZUUbG2JTTmGJUoz-LXLp7DNJMrS6JCY-VJys9Ez5XGwMekxu&_nc_ohc=C3zdgLTy6O0AX89SFEG&_nc_ht=scontent.fdac19-1.fna&oh=00_AfCWqj737v-mchEXDJMEqwcr4XovFVgWSeb-cUx5is-nog&oe=65CFC7D8"
            />
            <TeamCard
              name="Mahir Labib Dihan"
              position="1905072"
              detail="Devops"
              image="https://scontent.fdac19-1.fna.fbcdn.net/v/t39.30808-6/342405302_162812986420549_8137144512048864097_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEUQVHrF_0obxtjOtPX8RXQxgMQYlgi39jGAxBiWCLf2PF-cQqTJSxB-cRURaoTbHPJ77YDLobgf14QduyLG-Ax&_nc_ohc=hKFk19oTtvcAX97cKiZ&_nc_ht=scontent.fdac19-1.fna&oh=00_AfCUsDhY88TrbGK6QLiCp4VHy9g_wnEXwgJbLrjQXA4I_Q&oe=65AE2B20"
            />
            <TeamCard
              name="Souvik Ghosh"
              position="1905073"
              detail="Backend Developer"
              image="https://scontent.fdac19-1.fna.fbcdn.net/v/t39.30808-6/271758037_1540772279631394_6944096475676658530_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeHmGOR-xrf1HKJskCja7ArKYViqE0OGSfVhWKoTQ4ZJ9XjZSonEhT4VRRN-ryf9LmBm7KdE7VDk6SzdNdrH24vw&_nc_ohc=C9YMiZ-ZHSkAX81GbW1&_nc_oc=AQlaPEYfU3-l_-VW0i9iMqRr-abUhnAhaXa_ysPFyoJhP-B5PRgSrcy-GEbTp8d0a4w&_nc_ht=scontent.fdac19-1.fna&oh=00_AfDMuy8A8jZ7I8hSw00r-MMfJZbt1VAAXNFRVYyQ5coywg&oe=65ADF420"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
