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
              class="inline-flex text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900"
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
              image="https://scontent.fdac14-1.fna.fbcdn.net/v/t1.6435-9/157160094_302953714522127_1093822864719188446_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_eui2=AeH6Q7_6awCabPTzZV-dhiY2Pqaq9Nppypg-pqr02mnKmCI7zdN2qyFqMORyuMzHjiC-JDeAhf1h6rR5Kgm3KKvH&_nc_ohc=4mNIKwxluowAX961-C6&_nc_ht=scontent.fdac14-1.fna&oh=00_AfB1FGzWU9ROR8Ghcif1zlfNNB00RkBI_AI3jGt-STx3CQ&oe=651D4A4C"
            />
            <TeamCard
              name="Arnab Bhattacharje"
              position="1905065"
              detail="Worked on database"
              image="https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/290965727_557427819193735_6502346577707822970_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=fe8171&_nc_eui2=AeGSW6hA2xrNS4Xv9aOP10MiDfQpMmJJIjcN9CkyYkkiNz-rSIBNIyMtcjcb29MW3oWoBYvmpEmAwrSo6oVIQgVA&_nc_ohc=SpertONv9K4AX9jRE3o&_nc_ht=scontent.fdac14-1.fna&oh=00_AfBWPQ5GKqprmTusswQQaAHt4_Aa-T8tUxsfAVzfvwjH1A&oe=64FB2815"
            />
            <TeamCard
              name="Sayem Shahad Soummo"
              position="1905064"
              detail="Worked on Problem setting"
              image="https://scontent.fdac14-1.fna.fbcdn.net/v/t1.6435-9/81749674_686656911866573_7365527402610425856_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeE9vhQJXDcVOfPVBej2gZud74e6qfF_uSPvh7qp8X-5I7oz3GuCanH6AD6oj7Rb8EsTyhJeb3RdfVJ5wb4NHZo2&_nc_ohc=v9XiFvanZ6EAX_gNk7m&_nc_ht=scontent.fdac14-1.fna&oh=00_AfC8wldN1MbABKd3MJYMWCe1wQFItQSVwWRCQ4PtdH9irg&oe=651D5601"
            />
            <TeamCard
              name="Mahir Labib Dihan"
              position="1905072"
              detail="Worked on the backend"
              image="https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/342405302_162812986420549_8137144512048864097_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=fe8171&_nc_eui2=AeHw-ardLyEMPZ05SvCKzkNYxgMQYlgi39jGAxBiWCLf2OU4ZKaDV5eMDUE7MfDEJoCa3p9eoteVz1MLhqjZc7Zc&_nc_ohc=nwQTIEvz8ikAX9oHkFi&_nc_ht=scontent.fdac14-1.fna&oh=00_AfCnajVEvgUv-8QKQhWh4tsbLwxA07D4NDtCOXnC4dmT8w&oe=64FA5A9A"
            />
            <TeamCard
              name="Souvik Ghosh"
              position="1905073"
              detail="Worked on Problem solving"
              image="https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/293068528_1664553273919960_3560586561912931674_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1b51e3&_nc_eui2=AeHAdjMutlfyhKhkiPAZBynNQ5OFoKCON-VDk4WgoI435bpICZ9U_nF2sJEvNXrs5hL3o2nF2Xda0mtF69n-A_ad&_nc_ohc=PjXZyE0rGUIAX8iXEGX&_nc_ht=scontent.fdac14-1.fna&oh=00_AfCclDPgWBfnhmVtFJ0jQWK2IyyEZcrebQehzoYNaiSt8Q&oe=64FAAC07"
            />
            <TeamCard
              name="Salman Sayeed"
              position="1905079"
              detail="Worked on the frontend"
              image="https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/357423938_1524821001621823_5548694083827731007_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=fe8171&_nc_eui2=AeHc5G1b-JOHaB2xCFqMza58CzHQXTUanJALMdBdNRqckHbXEMnysHdivY9rA5pcD3j6IRukUK6eLEuANjCz9aD7&_nc_ohc=Af7TkSqLGTIAX9hnSSi&_nc_ht=scontent.fdac14-1.fna&oh=00_AfCSN6P2ZH4EHeoeF0Wy_2KAH31osKIolB8_HEdquqVJ6w&oe=64FA80A7"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
