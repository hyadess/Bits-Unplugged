import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Cookies from "universal-cookie";
import Title from "../../components/Title";

import {
  SelectionField2,
  TextField,
  TextField2,
} from "../../components/InputFields";

import TopicController from "../../controller/topicController";

import SeriesController from "../../controller/seriesController";
import ProblemController from "../../controller/problemController";
import { Switch } from "@mui/material";
import { setLoading } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
const problemController = new ProblemController();
const topicController = new TopicController();
const seriesController = new SeriesController();

const AdminProblemEditor = () => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [type, setType] = useState(-1);
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [seriesList, setSeriesList] = useState([]);
  const handleChange = (prop) => (event) => {
    setProblem({ ...problem, [prop]: event.target.value });
  };
  const handleSeriesChange = (prop) => (event) => {
    setProblem({
      ...problem,
      [prop]: event.target.value == "" ? null : event.target.value,
    });
  };
  const getProblem = async () => {
    console.log(id);
    const res = await problemController.getProblemById(id);
    if (res.success) {
      setProblem(res.data[0]);
      setLoading(false);
    }
  };

  const getSeriesList = async () => {
    const res = await seriesController.getAllSeries();
    if (res.success) {
      const newArray = [
        { value: "", label: "Unassigned" },
        ...res.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ];
      setSeriesList(newArray);
      console.log(newArray);
    }
  };

  const handleSave = async () => {
    {
      const res = await problemController.updateSeries(id, problem.seriesId);
      if (res.success) {
        console.log(res);
      }
    }

    {
      const res = (await problem.isLive)
        ? problemController.publishProblem(id)
        : problemController.unpublishProblem(id);
      if (res.success) {
        console.log(res);
      }
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));
    getProblem();
    getSeriesList();
  }, []);
  return (
    problem && (
      <>
        <div className="flex flex-row justify-between">
          <Title title={problem.title} sub_title={""} />
          <div className="flex flex-row items-center">
            <button
              className="font-medium rounded-lg text-lg px-7 py-3.5 text-center flex flex-row gap-4 items-center bu-button bg-teal-300 hover:bg-teal-400 active:ring-teal-300 dark:bg-green-600 dark:hover:bg-green-700 dark:active:ring-green-600"
              onClick={() => {
                setLoading(true);
                switchPath(`/admin/problems/${id}/preview`);
              }}
              // onClick={() => setOpen(true)}
            >
              <FontAwesomeIcon icon={faExpand} />
              PREVIEW
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {/* <TextField2
          label="Problem Name"
          onChange={handleChange}
          value={problem.name}
          id="name"
        />
        <TextField2
          label="Description"
          onChange={handleChange}
          value={problem.description}
          id="description"
        />
        <TextField2
          label="Logo URL"
          onChange={handleChange}
          value={problem.logo}
          id="logo"
        /> */}
          <SelectionField2
            label="Series"
            onChange={handleSeriesChange}
            id="seriesId"
            value={problem.seriesId == null ? "" : problem.seriesId}
            options={seriesList}
          />
          <div className="flex flex-row items-center">
            <h1 className="bu-text-primary">Live</h1>
            <Switch
              checked={problem.isLive}
              onChange={() => {
                setProblem((prevJson) => ({
                  ...prevJson,
                  isLive: !prevJson.isLive,
                }));
              }}
            />
          </div>

          <button
            className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary mt-5"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </>
    )
  );
};

export default AdminProblemEditor;
