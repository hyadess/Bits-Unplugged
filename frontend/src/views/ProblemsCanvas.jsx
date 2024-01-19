import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CanvasContainer from "../components/Canvases/CanvasContainer";
import ProblemController from "../controller/problemController";
import SubmissionController from "../controller/submissionController";
import UserActivityController from "../controller/userActivityController";

import { Button } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "universal-cookie";
import Latex from "react-latex";
import EditIcon from "@mui/icons-material/Edit";
// import Title from "../components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../App";
import MDEditor from "@uiw/react-md-editor";
import MarkdownEditor from "@uiw/react-markdown-editor";
import katex from "katex";
import "katex/dist/katex.css";
import { getCodeString } from "rehype-rewrite";

import MarkdownPreview from "../components/Markdown/MarkdownPreview";
// import ProblemsCanvasView from "../views/ProblemsCanvas";

const Title = ({ problem }) => {
  return (
    <div className="flex max-w-screen-xl flex-col gap-3 py-4 sm:pt-12">
      <div className="mt-4 md:mt-0">
        <h2 className="text-left text-5xl font-extrabold tracking-tight ">
          <span className="bu-text-title">{problem.title}</span>
        </h2>
      </div>
      <span className="bu-text-subtitle text-xl">
        {problem
          ? problem?.series?.topic?.name + " > " + problem?.series?.name
          : ""}
      </span>
    </div>
  );
};

const Header = ({ id, problem, type }) => {
  const navigator = useNavigate();
  return (
    <div className="flex flex-row justify-between">
      <Title problem={problem} />
      {type != 0 ? (
        <div className="flex items-center">
          <button
            className="bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
            onClick={() => {
              setLoading(true);
              navigator(
                type == 2 ? `/admin/problems/${id}` : `/problem/${id}/edit`
              );
            }}
          >
            <div className="flex flex-row items-center gap-4">
              <FontAwesomeIcon icon={faPenToSquare} size="sm" />
              EDIT
            </div>
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <button
            className="bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
            onClick={() => {
              setLoading(true);
              console.log(problem);
              navigator(`/submission/${id}`);
            }}
          >
            <div className="flex flex-row items-center gap-4">SUBMISSIONS</div>
          </button>
        </div>
      )}
    </div>
  );
};

const Statement = ({ statement, colorMode }) => (
  <div className="mx-auto max-w-screen-2xl items-center">
    <div className="bu-text-primary mb-6  text-left font-light md:text-lg">
      <div
        style={{
          width: "100%",
          padding: "30px 0",
          fontSize: "25px",
          border: "none",
          borderRadius: "20px",
        }}
      >
        <MarkdownPreview
          colorMode={colorMode}
          text={statement}
          customStyle={{ padding: "20px" }}
        />
      </div>
    </div>
  </div>
);

const Canvas = forwardRef(
  (
    {
      canvasId,
      input,
      setInput,
      activityData,
      setActivityData,
      editOptions,
      setEditOptions,
      previewOptions,
      setPreviewOptions,
      onReset,
      onSubmit,
    },
    ref
  ) => {
    useEffect(() => console.log(canvasId, ref));
    return (
      canvasId &&
      ref && (
        <div className="flex w-full flex-col gap-5">
          <CanvasContainer
            canvasId={canvasId}
            input={input}
            setInput={setInput}
            mode={"preview"}
            ref={ref}
            editOptions={editOptions}
            setEditOptions={setEditOptions}
            previewOptions={previewOptions}
            setPreviewOptions={setPreviewOptions}
            activityData={activityData}
            setActivityData={setActivityData}
          />
          <div className="flex flex-row justify-between">
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                onReset();
                // canvasRef.current.handleReset(); // Call this after reset
              }}
              startIcon={
                <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
              }
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={onSubmit}
              endIcon={<SendIcon sx={{ fontSize: "2rem", color: "white" }} />}
            >
              Submit
            </Button>
          </div>
        </div>
      )
    );
  }
);

const ProblemsCanvasView = (
  {
    id,
    problem,
    onSubmit,
    onReset,
    statement,
    canvasId,
    input,
    setInput,
    activityData,
    setActivityData,
    editOptions,
    setEditOptions,
    previewOptions,
    setPreviewOptions,
    colorMode,
    type,
  },
  ref
) => {
  return (
    <div>
      {problem && (
        <>
          <div>
            <Header id={id} problem={problem} type={type} />
            <Statement statement={statement} colorMode={colorMode} />
          </div>
          <Canvas
            ref={ref}
            canvasId={canvasId}
            input={input}
            setInput={setInput}
            editOptions={editOptions}
            setEditOptions={setEditOptions}
            previewOptions={previewOptions}
            setPreviewOptions={setPreviewOptions}
            activityData={activityData}
            setActivityData={setActivityData}
            onSubmit={onSubmit}
            onReset={onReset}
            colorMode={colorMode}
          />
        </>
      )}
    </div>
  );
};

export default forwardRef(ProblemsCanvasView);
