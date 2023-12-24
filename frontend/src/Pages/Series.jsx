import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SeriesController from "../controller/seriesController";
import Cookies from "universal-cookie";
import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
import ProblemSetSeriesCard from "../Components/Cards/ProblemSetSeriesCard";
import Title from "../Components/Title";
import { setLoading } from "../App";
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
            {seriesList.map((series, index) =>
              type == 0 ? (
                <CustomCard
                  id={`Series ${index + 1}`}
                  name={series.name}
                  image={series.logo}
                  path={`/series/${series.series_id}`}
                  action="View Problems"
                />
              ) : (
                <ProblemSetSeriesCard
                  idx={index + 1}
                  id={series.series_id}
                  name={series.name}
                  image={series.logo}
                  path={series.series_id}
                />
              )
            )}
          </CardContainer>
        </>
      )}
    </div>
  );
}
