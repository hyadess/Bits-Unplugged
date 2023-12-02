import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopicController from "../controller/topicController";
import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
import Cookies from "universal-cookie";
const topicController = new TopicController();

export default function Problems() {
  const [type, setType] = useState(-1);
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [topicList, setTopicList] = useState([]);
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

  const getTopicList = async () => {
    const res = await topicController.getAllTopics();
    if (res.success) {
      setTopicList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));

    getTopicList();
  }, []);
  return (
    <div>
      <div class=" bg-gray-900">
        <div class="gap-8 items-center py-4 mx-auto max-w-screen-xl xl:gap-16 sm:pt-16">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 text-white">
              <span class=" text-pink-500">
                Problem {type == 0 ? "Solving" : "Setting"}
              </span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg text-gray-400">
              {type == 0 ? "Solve" : "Set"} problems for particular series right
              on our site
            </p>
          </div>
        </div>
      </div>

      {!loading && (
        <CardContainer>
          {topicList.map((topic, index) => (
            <CustomCard
              id={`Topic ${index + 1}`}
              name={topic.name}
              image={topic.logo}
              path={
                type == 0
                  ? `/topics/${topic.topic_id}`
                  : `/problemSet/topics/${topic.topic_id}`
              }
              action="View Series"
            />
          ))}
        </CardContainer>
      )}
    </div>
  );
}
