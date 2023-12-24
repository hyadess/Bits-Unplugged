import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Cookies from "universal-cookie";
import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
import ProblemSetSeriesCard from "../Components/Cards/ProblemSetSeriesCard";
import Title from "../Components/Title";

import TopicController from "../controller/topicController";
import Layout4 from "../Components/Layouts/Layout4";
import AdminNavbar from "../Components/navbar/AdminNavbar";
import { TextField, TextField2 } from "../Components/InputFields";
import { setLoading } from "../App";
const topicController = new TopicController();

const AdminTopicEditor = () => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [type, setType] = useState(-1);
  const { id } = useParams();

  const [topic, setTopic] = useState([]);
  const [data, setData] = useState();
  const handleChange = (prop) => (event) => {
    setTopic({ ...topic, [prop]: event.target.value });
  };
  const getTopic = async () => {
    console.log(id);
    const res = await topicController.getTopicById(id);
    if (res.success) {
      setTopic(res.data[0]);
      setLoading(false);
      console.log(res);
    }
  };

  const handleSave = async () => {
    const res = await topicController.updateTopic(id, topic);
    if (res.success) {
      console.log(res);
    }
  };
  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));
    getTopic();
  }, []);
  return (
    <>
      <Title title={topic.name} sub_title={topic.description} />
      <div className="flex flex-col gap-5">
        <TextField2
          label="Topic Name"
          onChange={handleChange}
          value={topic.name}
          id="name"
        />
        <TextField2
          label="Description"
          onChange={handleChange}
          value={topic.description}
          id="description"
        />
        <TextField2
          label="Logo URL"
          onChange={handleChange}
          value={topic.logo}
          id="logo"
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

export default AdminTopicEditor;
