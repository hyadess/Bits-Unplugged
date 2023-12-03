import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TeamCard from "../Components/Cards/TeamCard";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Home = () => {
  const [type, setType] = useState(-1);
  const navigator = useNavigate();
  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));
  }, []);
  return (
    <div>
      <div class="bg-gray-900">
        <div class="gap-8 h-screen items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          {/* <img
            class="w-full hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="dashboard image"
          /> */}
          <img
            class="w-full block"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
            alt="dashboard image"
          />
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-4xl tracking-tight font-extrabold text-gray-900 text-white">
              {" "}
              A platform for learning{" "}
              <span class=" text-pink-500">Programming Concepts </span> without
              coding{" "}
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg text-gray-400">
              Bits unplugged is a platform for students to learn complex
              programming concepts without needing to write a single line of
              code through an interactive medium
            </p>

            <a
              onClick={() =>
                type == 0 ? navigator("/topics") : navigator("/problemSet")
              }
              class="inline-flex text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900 cursor-pointer"
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
            </a>
          </div>
        </div>
      </div>

      <section class=" bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 text-white">
              Our Team
            </h2>

            <p class="font-light text-gray-500 lg:mb-16 sm:text-xl text-gray-400">
              Meet our dynamic team who are here to help you at each step of
              your journey
            </p>
          </div>
          <div className="grid grid-cols-2">
            <TeamCard
              name="Nazmus Sakib"
              position="1905061"
              detail="Worked on the Red Black Tree Implementation"
              image="https://i.pinimg.com/564x/7c/0b/89/7c0b8922957831dc3ef513b08157de73.jpg"
            />
            <TeamCard
              name="Arnab Bhattacharje"
              position="1905065"
              detail="Worked on database"
              image="https://dgbijzg00pxv8.cloudfront.net/6eb7968b-189a-4950-be66-2596c01538b5/000000-0000000000/41934988350297194397358372099130021676442103478114883670507566882701035188871/ITEM_PREVIEW1.jpeg "
            />
            <TeamCard
              name="Sayem Shahad Soummo"
              position="1905064"
              detail="Worked on Problem setting"
              image="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg"
            />
            <TeamCard
              name="Mahir Labib Dihan"
              position="1905072"
              detail="Worked on the backend"
              image="https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
            />
            <TeamCard
              name="Souvik Ghosh"
              position="1905073"
              detail="Worked on Problem solving"
              image="https://i.pinimg.com/736x/ec/9d/ac/ec9dac50ce3b1faa401a3ad7ea1711de.jpg"
            />
            <TeamCard
              name="Salman Sayeed"
              position="1905079"
              detail="Worked on the frontend"
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
