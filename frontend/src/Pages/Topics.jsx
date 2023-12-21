import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopicController from "../controller/topicController";
import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
import Cookies from "universal-cookie";
import Title from "../Components/Title";
import TopicCard from "../Components/Cards/TopicCard";
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
      <Title
        title={`Problem ${type === 0 ? "Solving" : "Setting"}`}
        sub_title={`${
          type == 0 ? "Solve" : "Set"
        } problems for particular series right
        on our site`}
      />

      {!loading && (
        <CardContainer col={3}>
          {topicList.map((topic, index) => (
            <CustomCard
              id={`Topic ${index + 1}`}
              name={topic.name}
              image={topic.logo}
              path={`/topics/${topic.topic_id}`}
              action="View Series"
            />
          ))}
        </CardContainer>
      )}
    </div>
  );
}
