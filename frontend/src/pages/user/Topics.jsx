import React, { useState, useEffect, useContext } from "react";
import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../containers/CardContainer";
import Title from "../../components/Title";
import { topicApi } from "../../api";
import GlobalContext from "../../store/GlobalContext";
const Topics = () => {
  const { type } = useContext(GlobalContext);
  const [topicList, setTopicList] = useState([]);
  const getTopicList = async () => {
    const res = await topicApi.getAllTopics();
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
