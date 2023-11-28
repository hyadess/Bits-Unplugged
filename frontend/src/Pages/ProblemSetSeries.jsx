import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SeriesController from "../controller/seriesController";
import ProblemSetSeriesCard from "../Components/Cards/ProblemSetSeriesCard";
const seriesController = new SeriesController();

export default function ProblemSetSeries() {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

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
    getSeriesList();
  }, []);
  return (
    <div>
      <div class="  dark:bg-gray-900">
        <div class="gap-8 items-center py-4 mx-auto max-w-screen-xl xl:gap-16 sm:pt-16">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              <span class="text-pink-600 dark:text-pink-500">
                Problem Setting
              </span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg dark:text-gray-400">
              Solve problems for particular series right on our site
            </p>
          </div>
        </div>
      </div>

      {!loading && (
        <div className="flex flex-row flex-wrap items-center justify-between items-center pb-8 mx-auto max-w-screen-2xl xl:gap-8 x:gap:16 gap-8 md:grid md:grid-cols-3">
          {seriesList.map((series, index) => (
            <ProblemSetSeriesCard
              idx={index + 1}
              id={series.series_id}
              name={series.name}
              image={series.logo}
              path={series.series_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
