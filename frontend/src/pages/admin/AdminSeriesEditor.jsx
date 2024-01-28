import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Cookies from "universal-cookie";

import Title from "../../components/Title";

import { SelectionField2, TextField2 } from "../../components/InputFields";
import { setLoading, showSuccess } from "../../App";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faFire,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import { seriesApi, topicApi } from "../../api";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ProblemSetCard from "../../components/Cards/ProblemSetCard";
import ProblemCard from "../../components/Cards/AdminProblemCard";
import HowToReg from "@mui/icons-material/HowToReg";
import TableContainer from "../../containers/TableContainer";

const DraggableProblemCard = ({
  id,
  name,
  index,
  moveCard,
  problem,
  setProblem,
  deleteProblem,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (item.index !== index && monitor.isOver({ shallow: true })) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="w-full"
    >
      <ProblemCard
        // idx={index + 1}
        id={problem.id}
        name={problem.title}
        // image={problem.logo}
        path={`/problems/${problem.id}`}
        // action="Get Started"
        // topic={problem.series.topic.name}
        // series={problem.series.name}
        // acceptance={Math.round(Math.random() * 100)}
        // difficulty={["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)]}
        isSolved={
          problem.activities.length > 0
            ? problem.activities[0].isSolved === null
              ? -1
              : problem.activities[0].isSolved
                ? 1
                : 0
            : -1
        }
        isLive={problem.isLive}
        setProblem={setProblem}
        deleteAction={deleteProblem}
        isEdit={true}
      />
    </div>
  );
};

const AdminSeriesEditor = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [topicList, setTopicList] = useState([]);
  const [problemList, setProblemList] = useState([]);

  const handleChange = (prop) => (event) => {
    setSeries({ ...series, [prop]: event.target.value });
  };

  // const deleteSeries = (seriesId) => {
  //   setSeriesList((prev) => prev.filter((series) => series.id !== seriesId));
  // };

  const deleteProblem = (problemId) => {
    setProblemList((prev) =>
      prev.filter((problem) => problem.id !== problemId)
    );
  };

  // const setSeries = (id, data) => {
  //   // set series in given id with given data
  //   setSeriesList((prev) =>
  //     prev.map((series) => (series.id === id ? { ...series, ...data } : series))
  //   );
  // };

  const setProblem = (id, data) => {
    // set problem in given id with given data
    setProblemList((prev) =>
      prev.map((problem) =>
        problem.id === id ? { ...problem, ...data } : problem
      )
    );
  };

  const moveCard = (dragIndex, hoverIndex) => {
    setProblemList((prev) => {
      const dragCard = prev[dragIndex];
      const coppiedArray = [...prev];
      coppiedArray.splice(dragIndex, 1);
      coppiedArray.splice(hoverIndex, 0, dragCard);
      return coppiedArray;
    });
  };

  const getSeries = async () => {
    console.log(id);
    const res = await seriesApi.getSeriesById(id);
    if (res.success) {
      setSeries(res.data);
      setLoading(false);
    }
  };

  const getProblemList = async () => {
    const res = await seriesApi.getAllProblems(id);
    if (res.success) {
      setProblemList(res.data);
      console.log(res.data);
    }
  };

  const getTopicList = async () => {
    const res = await topicApi.getAllTopics();
    if (res.success) {
      const newArray = res.data.map((topic) => ({
        value: topic.id,
        label: topic.name,
      }));
      setTopicList(newArray);
    }
  };

  const handleSave = async () => {
    // const series = seriesList.map((item, index) => ({
    //   ...item,
    //   serialNo: seriesList.length - index,
    // }));

    // console.log(series);
    // await topicApi.updateSeries(id, series);
    // setSeriesList(series);

    const problems = problemList.map((item, index) => ({
      ...item,
      serialNo: problemList.length - index,
    }));

    console.log(problems);
    await seriesApi.updateProblems(id, problems);
    setProblemList(problems);

    const res = await seriesApi.updateSeries(id, series);
    if (res.success) {
      console.log(res);
      showSuccess("Changes are saved", res);
    }
  };
  useEffect(() => {
    getSeries();
    getProblemList();
    getTopicList();
  }, []);
  return (
    series && (
      <DndProvider backend={HTML5Backend}>
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
            id="topicId"
            value={series.topicId == null ? "" : series.topicId}
            options={topicList}
          />
          <div className="bu-bg-title text-white p-5 rounded-md text-3xl font-bold">
            Problems
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
              <div className="text-xl w-[45%] font-medium">Name</div>
              <div className="text-xl w-[20%] font-medium flex gap-2 items-center justify-center">
                {/* <FontAwesomeIcon icon={faCheckDouble} /> */}
                <HowToReg />
                Acceptance
              </div>
              <div className="text-xl w-20% font-medium flex gap-2 items-center justify-center">
                <FontAwesomeIcon icon={faFire} />
                Difficulty
              </div>
              <div className="text-xl w-15% font-medium flex gap-2 items-center justify-center">
                <FontAwesomeIcon icon={faHeartPulse} />
                Action
              </div>
            </div>
            {problemList.length && (
              <TableContainer>
                {problemList.map((problem, index) => (
                  <DraggableProblemCard
                    key={problem.id}
                    id={problem.id}
                    index={index}
                    name={problem.name}
                    image={problem.logo}
                    problem={problem}
                    setProblem={setProblem}
                    deleteProblem={deleteProblem}
                    moveCard={moveCard}
                  />
                ))}
              </TableContainer>
            )}
          </div>
          <button
            className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </DndProvider>
    )
  );
};

export default AdminSeriesEditor;
