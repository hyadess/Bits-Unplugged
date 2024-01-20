import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../containers/CardContainer";
import Title from "../../components/Title";
import { seriesApi } from "../../api";
import GlobalContext from "../../store/GlobalContext";

export default function Problems() {
  const { id } = useParams();
  const { type } = useContext(GlobalContext);
  const [seriesList, setSeriesList] = useState([]);
  const getSeriesList = async () => {
    const res = await seriesApi.getSeriesByTopic(id);
    if (res.success) {
      setSeriesList(res.data);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getSeriesList();
  }, []);
  return (
    <div>
      {seriesList.length && (
        <>
          <Title
            title={`Problem ${type == 0 ? "Solving" : "Setting"}`}
            sub_title={`${
              type == 0 ? "Solve" : "Set"
            } problems for particular series right
        on our site`}
          />

          <CardContainer col={3}>
            {seriesList.map((series, index) => (
              <CustomCard
                key={index}
                id={`Series ${index + 1}`}
                name={series.name}
                image={series.logo}
                path={`/series/${series.id}`}
                action="View Problems"
              />
            ))}
          </CardContainer>
        </>
      )}
    </div>
  );
}
