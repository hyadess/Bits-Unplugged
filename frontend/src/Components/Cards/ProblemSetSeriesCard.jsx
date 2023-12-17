import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../components.scss";
import ProblemController from "../../controller/problemController";
import { Zoom } from "@mui/material";
import ImageLoader from "../ImageLoader";
import CancelIcon from "@mui/icons-material/Cancel";

const problemController = new ProblemController();
export default function ProblemSetSeriesCard({ idx, id, name, image, path }) {
  const navigator = useNavigate();

  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  //const [problemId, setProblemId] = useState(null);
  let problemId = -1;
  const getProblemId = async (title) => {
    const res = await problemController.addProblem(path);
    if (res.success) {
      problemId = res.data[0].problem_id;
      await problemController.updateTitle(res.data[0].problem_id, title);
      setLoading(false);
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
    e.preventDefault();
    setSubmittedValue(inputValue);
    closeModal();
    await getProblemId(inputValue);
    switchPath(`/problem/${problemId}/edit`);
  };

  return (
    <Zoom in={true}>
      <div class="flex flex-col items-center h-full md:px-0">
        <div class="flex flex-col max-w-sm  border border-gray-500 rounded-lg shadow-lg bg-gray-700 border-gray-700 h-full">
          <h5 class="mt-4 text-2xl text-center font-bold tracking-tight text-gray-900 text-white px-3">
            Series {idx}
          </h5>
          <h5
            class="flex items-center justify-center mb-4 text-3xl text-center font-bold tracking-tight text-gray-900 text-primary-500 px-3 h-full"
            // style={{ minHeight: "16%" }}
          >
            {name}
          </h5>
          <ImageLoader
            src={
              image
                ? image
                : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
            }
            alt=""
            style={{
              width: 500,
              height: 200,
              objectFit: "cover",
              // width: "100%",
            }}
          />
          <div className="w-full flex items-center justify-center cursor-pointer">
            <a
              onClick={openModal}
              class="inline-flex my-8  text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900"
            >
              <h5 class="text-lg text-center font-bold tracking-tight text-gray-900 text-white">
                Add Problems
              </h5>
            </a>
          </div>
          {modalIsOpen && (
            <div className="custom-modal-overlay">
              <div className="custom-modal relative">
                <button
                  onClick={closeModal}
                  className="modal-close-button absolute top-3 right-3"
                >
                  <CancelIcon />
                </button>
                <div className="modal-content ">
                  <h2>Enter Problem Title</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Problem title"
                      className="modal-input"
                    />
                    <button type="submit" className="modal-submit-button">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Zoom>
  );
}
