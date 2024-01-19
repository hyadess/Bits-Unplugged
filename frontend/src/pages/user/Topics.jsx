import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../containers/CardContainer";
import Cookies from "universal-cookie";
import Title from "../../components/Title";
import TopicCard from "../../components/Cards/TopicCard";
import { setLoading } from "../../App";
import { topicApi } from "../../api";
const Topics = () => {
  const [type, setType] = useState(-1);

  const [topicList, setTopicList] = useState([]);

  const getTopicList = async () => {
    const res = await topicApi.getAllTopics();
    if (res.success) {
      setTopicList(res.data);
      console.log(res);
      // setLoading(false);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(localStorage.getItem("type"));
    getTopicList();
  }, []);
  return (
    <>
      {topicList.length && (
        <>
          <Title
            title={`Problem ${type == 0 ? "Solving" : "Setting"}`}
            sub_title={`${
              type == 0 ? "Solve" : "Set"
            } problems for particular series right
        on our site`}
          />
          <CardContainer col={3}>
            {topicList.map((topic, index) => (
              <CustomCard
                key={index}
                id={`Topic ${index + 1}`}
                name={topic.name}
                image={topic.logo}
                path={`/topics/${topic.id}`}
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
