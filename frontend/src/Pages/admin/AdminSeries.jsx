import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CustomCard from "../../Components/Cards/CustomCard";
import CardContainer from "../../Components/Containers/CardContainer";
import Cookies from "universal-cookie";
import Title from "../../Components/Title";
import TopicCard from "../../Components/Cards/TopicCard";
import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Layout4 from "../../Components/Layouts/Layout4";

import SeriesController from "../../controller/seriesController";
const seriesController = new SeriesController();

const AdminSeries = () => {
  const [type, setType] = useState(-1);
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [seriesList, setSeriesList] = useState([]);
  const baseURL = "https";

  const getSeriesList = async () => {
    const res = await seriesController.getAllSeries();
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
    <>
      <Title title={`Series`} sub_title={`Add/Delete/Update Series`} />

      {!loading && (
        <CardContainer col={3}>
          {seriesList.map((series, index) => (
            <CustomCard
              id={`Series ${index + 1}`}
              name={series.name}
              image={series.logo}
              path={`/admin/series/${series.series_id}`}
              action="View Series"
            />
          ))}
        </CardContainer>
      )}
    </>
  );
};

export default AdminSeries;
