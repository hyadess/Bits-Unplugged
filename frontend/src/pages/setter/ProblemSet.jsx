import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import ProblemSetCard from "../../components/Cards/ProblemSetCard";
import ProblemController from "../../controller/problemController";
import TopicController from "../../controller/topicController";
import TableContainer from "../../components/Containers/TableContainer";
import CancelIcon from "@mui/icons-material/Cancel";

import Title from "../../components/Title";
import AddIcon from "@mui/icons-material/Add";
import { setLoading } from "../../App";
import SetterProblems from "./SetterProblems";

const problemController = new ProblemController();
const topicController = new TopicController();

const ProblemSet = () => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  let problemId = -1;
  const getProblemId = async (title) => {
    const res = await problemController.createProblem(title);
    if (res.success) {
      problemId = res.data.id;
      // setLoading(false);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log("Submitted: ", inputValue);
    if (inputValue !== "") {
      setLoading(true);
      closeModal();
      await getProblemId(inputValue);
      switchPath(`/problem/${problemId}/edit`);
    }
  };

  return (
    <div>
      <Title
        title={`Problem Setting Interface`}
        sub_title={`Set problems for particular series right on our site`}
      />

      <div className="fixed bottom-10 z-10 right-10 hidden md:flex items-center justify-center ">
        <div
          onClick={openModal}
          className="w-16 h-16 rounded-full justify-center inline-flex items-center text-white font-medium text-sm p-4 text-center ursor-pointer shadow-lg cursor-pointer bu-button-secondary "
        >
          <div className="text-primary-900 dark:text-gray-900">
            <AddIcon sx={{ fontSize: "4rem" }} />
          </div>
        </div>
      </div>

      <div className="flex md:hidden items-center justify-center">
        <div
          onClick={openModal}
          className="w-full justify-center inline-flex my-8  text-center bu-button-secondary font-medium rounded-lg text-sm p-4   cursor-pointer gap-3 items-center"
        >
          <AddIcon sx={{ fontSize: "2rem" }} />
          <h5 className="text-2xl md:text-3xl text-center font-bold tracking-tight ">
            New Problem
          </h5>
        </div>
      </div>

      <SetterProblems />

      {modalIsOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg shadow-md p-[20px] text-center relative bu-nav-color w-[300px]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 bu-text-primary"
            >
              <CancelIcon />
            </button>
            <div className="p-5">
              <h2 className="bu-text-primary mb-[10px]">Enter Problem Title</h2>
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Problem title"
                  className="bu-input-primary w-full p-[10px] mb-[10px] border border-solid border-gray-300 rounded-md outline-none"
                />
                <button
                  onClick={handleSubmit}
                  className="font-medium rounded-lg text-lg px-7 py-2 text-center w-full bu-button-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemSet;
