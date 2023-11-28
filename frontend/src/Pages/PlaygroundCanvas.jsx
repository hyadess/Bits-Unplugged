import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//<ReactTypingEffect speed={0.5} eraseSpeed={1} cursor={"_"} text={[""]}></ReactTypingEffect>
export default function PlaygroundCanvas() {
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
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
      {/* <Navbar /> */}
      <div class="  dark:bg-gray-900">
        <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-2xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              <span class="text-pink-600 dark:text-pink-500">
                Graphs Playground
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/** PUT CANVAS HERE */}
    </div>
  );
}
