import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import CanvasContainer from "../components/Canvases/CanvasContainer";
import { Button } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SendIcon from "@mui/icons-material/Send";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../App";
import "katex/dist/katex.css";
import MarkdownPreview from "../components/Markdown/MarkdownPreview";
import { useProblemContext } from "../store/ProblemContextProvider";
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

const Header = ({ type }) => {
  const navigate = useNavigate();
  const { state: problem, dispatch } = useProblemContext();
  return (
    <div className="flex flex-row justify-between">
      <Title problem={problem} />
      {type != 0 ? (
        <div className="flex items-center">
          <button
            className="bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
            onClick={() => {
              setLoading(true);
              navigate(
                type == 2
                  ? `/admin/problems/${problem.id}`
                  : `/problems/${problem.id}/edit`
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
              navigate(`/submissions/${problem.id}`);
            }}
          >
            <div className="flex flex-row items-center gap-4">SUBMISSIONS</div>
          </button>
        </div>
      )}
    </div>
  );
};

const Statement = ({ colorMode }) => {
  const { state: problem, dispatch } = useProblemContext();
  return (
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
            text={problem.statement ?? ""}
            customStyle={{ padding: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

const Canvas = forwardRef(({ onReset, onSubmit }, ref) => {
  const { state: problem, dispatch } = useProblemContext();
  return (
    problem.canvasId &&
    ref && (
      <div className="flex w-full flex-col gap-5">
        <CanvasContainer
          canvasId={problem.canvasId}
          input={problem.canvasData}
          setInput={(data) => {
            dispatch({
              type: "UPDATE_CANVAS",
              payload: { ...data },
            });
          }}
          mode={"preview"}
          ref={ref}
          editOptions={problem.editOptions}
          previewOptions={problem.previewOptions}
          activityData={problem.activityData}
          setActivityData={(data) => {
            dispatch({
              type: "UPDATE_USER_ACTIVITY",
              payload: { ...data },
            });
          }}
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
});

const ProblemsCanvasView = ({ onSubmit, onReset, colorMode, type }, ref) => {
  const { state: problem, dispatch } = useProblemContext();
  return (
    <div>
      {problem && (
        <>
          <div>
            <Header type={type} />
            <Statement statement={problem.statement} colorMode={colorMode} />
          </div>
          <Canvas
            ref={ref}
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
