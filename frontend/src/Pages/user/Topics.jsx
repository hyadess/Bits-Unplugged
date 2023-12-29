import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopicController from "../../controller/topicController";
import CustomCard from "../../Components/Cards/CustomCard";
import CardContainer from "../../Components/Containers/CardContainer";
import Cookies from "universal-cookie";
import Title from "../../Components/Title";
import TopicCard from "../../Components/Cards/TopicCard";
import { setLoading } from "../../App";
const topicController = new TopicController();

const Topics = () => {
  const [type, setType] = useState(-1);

  const [topicList, setTopicList] = useState([]);

  const getTopicList = async () => {
    const res = await topicController.getAllTopics();
    if (res.success) {
      setTopicList(res.data);
      console.log(res);
      // setLoading(false);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));
    getTopicList();
  }, []);
  return (
    <>
      {topicList.length && (
        <>
          <Title
            title={`Problem ${type === 0 ? "Solving" : "Setting"}`}
            sub_title={`${
              type == 0 ? "Solve" : "Set"
            } problems for particular series right
        on our site`}
          />
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
        </>
      )}
    </>
  );
};

export default Topics;
