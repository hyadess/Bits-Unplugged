import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PlaygroundCard from "../Components/PlaygroundCard";
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
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
      {/* <Navbar /> */}
      <div class="bg-white mt-20 dark:bg-gray-900">
        <div class="gap-8 items-center py-4 px-4 mx-auto max-w-screen-2xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 sm:pb-0 lg:px-10">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              <span class="text-pink-600 dark:text-pink-500">
                Algorithms Playground
              </span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg dark:text-gray-400">
              We currently offer 2 playgrounds for our users. Many more
              algorithms are coming soon
            </p>
          </div>
        </div>
      </div>

      {!loading && (
        <div className="flex flex-row flex-wrap items-center justify-between items-center pb-8 px-4 mx-auto max-w-screen-2xl xl:gap-16 md:grid md:grid-cols-4 sm:py-16 lg:px-6">
          {/* {
                data.map(a=>{
                
                    return (<CourseCard id={a.track_id} name={a.course_name} image={a.image} path={a.course_id} />)
                })
           } */}
          {/* <CourseCard id="1" name="Handicrafts" image="https://i.postimg.cc/T1GDtZtZ/image-1.png" path="handicrafts" />
                <CourseCard id="4" name="MS Word" image="https://i.postimg.cc/15mFw1nF/image-2.png" path="word" />
                <CourseCard id="4" name="MS Excel" image="https://i.postimg.cc/1Rc683tP/image-4.png" path="excel" />
                <CourseCard id="4" name="MS Powerpoint" image="https://i.postimg.cc/KjNgwJV4/image-5.png" path="powerpoint" /> */}
          <PlaygroundCard
            id={1}
            name="Graph"
            image="https://i.postimg.cc/7YFmXcjN/image.png"
            path="graph"
          />
        </div>
      )}
    </div>
  );
}
