import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import SeriesController from "../../controller/seriesController";
import Cookies from "universal-cookie";
import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../components/Containers/CardContainer";
import Title from "../../components/Title";
import { setLoading } from "../../App";
const seriesController = new SeriesController();

export default function Problems() {
  const [type, setType] = useState(-1);
  const { id } = useParams();
  const [seriesList, setSeriesList] = useState([]);
  const getSeriesList = async () => {
    const res = await seriesController.getSeriesByTopic(id);
    if (res.success) {
      setSeriesList(res.data);
      // setLoading(false);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));

    getSeriesList();
  }, []);
  return (
    <div>
      {seriesList.length && (
        <>
          <Title
            title={`Problem ${type == 0 ? "Solving" : "Setting"}`}
            sub_title={`${
              type === 0 ? "Solve" : "Set"
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
                path={`/series/${series.series_id}`}
                action="View Problems"
              />
            ))}
          </CardContainer>
        </>
      )}
    </div>
  );
}
