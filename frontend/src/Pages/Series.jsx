import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SeriesController from "../controller/seriesController";
import Cookies from "universal-cookie";
import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
import ProblemSetSeriesCard from "../Components/Cards/ProblemSetSeriesCard";
import Title from "../Components/Title";
const seriesController = new SeriesController();

export default function Problems() {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [type, setType] = useState(-1);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [seriesList, setSeriesList] = useState([]);
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

  const getSeriesList = async () => {
    const res = await seriesController.getSeriessByTopic(id);
    if (res.success) {
      setSeriesList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));

    getSeriesList();
  }, []);
  return (
    <div>
      <Title
        title={`Problem ${type == 0 ? "Solving" : "Setting"}`}
        sub_title={`${
          type == 0 ? "Solve" : "Set"
        } problems for particular series right
        on our site`}
      />
      {/* <div class="  bg-gray-900">
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
      </div> */}

      {!loading && (
        <CardContainer>
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
      )}
    </div>
  );
}
