import React, { useState, useEffect, useContext } from "react";
import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../containers/CardContainer2";
import Title from "../../components/Title";
import { topicApi } from "../../api";
import GlobalContext from "../../store/GlobalContext";
import TopicCard from "../../components/Cards/TopicCard";
const Topics = () => {
  const { type } = useContext(GlobalContext);
  const [topicList, setTopicList] = useState([]);
  const getTopicList = async () => {
    const res = await topicApi.getAllTopics();
    //console.log(res);
    if (res.success) {
      setTopicList(res.data);
      console.log(res);
    }
  };

  useEffect(() => {
    getTopicList();
  }, []);
  return (
    <>
      {topicList.length && (
        <>
          <Title
            title={`Select a Topic`}
            sub_title={`${
              type == 0 ? "Solve" : "Set"
            } problems for particular topic right
        on our site`}
          />
          <CardContainer col={2}>
            {topicList.map(
              (topic, index) =>
                topic.isLive && (
                  <TopicCard
                    key={index}
                    id={`Topic ${index + 1}`}
                    topic_id={topic.id}
                    name={topic.name}
                    image={topic.logo}
                    path={`/topics/${topic.id}`}
                    action="View Series"
                  />
                )
            )}
          </CardContainer>
        </>
      )}
    </>
  );
};

export default Topics;
