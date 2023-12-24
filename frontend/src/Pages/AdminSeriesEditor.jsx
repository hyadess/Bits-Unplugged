import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Cookies from "universal-cookie";
import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
import ProblemSetSeriesCard from "../Components/Cards/ProblemSetSeriesCard";
import Title from "../Components/Title";

import Layout4 from "../Components/Layouts/Layout4";
import AdminNavbar from "../Components/navbar/AdminNavbar";
import {
  SelectionField2,
  TextField,
  TextField2,
} from "../Components/InputFields";

import TopicController from "../controller/topicController";

import SeriesController from "../controller/seriesController";

const topicController = new TopicController();

const seriesController = new SeriesController();

const AdminSeriesEditor = () => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [type, setType] = useState(-1);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const handleChange = (prop) => (event) => {
    setSeries({ ...series, [prop]: event.target.value });
  };
  const getSeries = async () => {
    console.log(id);
    const res = await seriesController.getSeriesById(id);
    if (res.success) {
      setSeries(res.data[0]);
      setLoading(false);
      console.log(res);
    }
  };

  const getTopicList = async () => {
    const res = await topicController.getAllTopics();
    if (res.success) {
      const newArray = res.data.map((item) => ({
        value: item.topic_id,
        label: item.name,
      }));
      setTopicList(newArray);
      setLoading(false);
      console.log(res);
    }
  };

  const handleSave = async () => {
    const res = await seriesController.updateSeries(id, series);
    if (res.success) {
      setLoading(false);
      console.log(res);
    }
  };
  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));
    getSeries();
    getTopicList();
  }, []);
  return (
    <>
      <Title title={series.name} sub_title={series.description} />
      <div className="flex flex-col gap-5">
        <TextField2
          label="Series Name"
          onChange={handleChange}
          value={series.name}
          id="name"
        />
        <TextField2
          label="Description"
          onChange={handleChange}
          value={series.description}
          id="description"
        />
        <TextField2
          label="Logo URL"
          onChange={handleChange}
          value={series.logo}
          id="logo"
        />
        <SelectionField2
          label="Topic"
          onChange={handleChange}
          id="topic_id"
          value={series.topic_id}
          options={topicList}
        />
        <button
          className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary mt-5"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminSeriesEditor;
