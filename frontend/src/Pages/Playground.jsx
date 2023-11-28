import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PlaygroundCard from "../Components/Cards/PlaygroundCard";
import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
//<ReactTypingEffect speed={0.5} eraseSpeed={1} cursor={"_"} text={[""]}></ReactTypingEffect>
export default function Playground() {
  /**
     * https://i.postimg.cc/T1GDtZtZ/image-1.png
        https://i.postimg.cc/15mFw1nF/image-2.png
        https://i.postimg.cc/1Rc683tP/image-4.png
        https://i.postimg.cc/KjNgwJV4/image-5.png
     */
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const baseURL = "https";
  const getData = async () => {
    try {
      const res = await axios.get(`${baseURL}/courses`);
      setData(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    //getData()
  }, []);
  return (
    // <div className="flex flex-col min-h-screen bg-gray-900">
    <div>
      <div class=" bg-gray-900">
        <div class="gap-8 items-center py-4 mx-auto max-w-screen-xl xl:gap-16 sm:pt-16">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 text-white">
              <span class=" text-pink-500">Series Playground</span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg text-gray-400">
              We currently offer 2 playgrounds for our users. Many more series
              are coming soon
            </p>
          </div>
        </div>
      </div>

      {!loading && (
        <CardContainer>
          <CustomCard
            id={1}
            name="Graph"
            image="https://i.postimg.cc/7YFmXcjN/image.png"
            path="graph"
            action="View Playgorund"
          />
        </CardContainer>
      )}
    </div>
    // </div>
  );
}
