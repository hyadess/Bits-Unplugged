import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CanvasContainer from "../Components/Canvas/CanvasContainer";
import ProblemController from "../controller/problemController";
import { Button } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import "./ProblemSetEnv.scss";
import "./Submitbtn.scss";
import Latex from "react-latex";
//<ReactTypingEffect speed={0.5} eraseSpeed={1} cursor={"_"} text={[""]}></ReactTypingEffect>
const problemController = new ProblemController();

export default function ProblemsCanvas() {
  /**
     * https://i.postimg.cc/T1GDtZtZ/image-1.png
        https://i.postimg.cc/15mFw1nF/image-2.png
        https://i.postimg.cc/1Rc683tP/image-4.png
        https://i.postimg.cc/KjNgwJV4/image-5.png
     */
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [input, setInput] = useState(null);
  const [canvas_id, setCanvas_Id] = useState(null);
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [canvas, setCanvas] = useState(null);
  const baseURL = "https";
  const canvasRef = useRef();

  useEffect(() => {
    renderProblem();
  }, []);

  const renderProblem = async () => {
    const result = await problemController.getProblemById(id);
    setProblem(result.data[0]);
    setInput(result.data[0].canvas_data);
    setCanvas_Id(result.data[0].canvas_id);
    setStatement(result.data[0].statement);
    setTitle(result.data[0].title);
    console.log(result.data[0].canvas_data);
  };

  const renderComponent = () => {
    return canvas_id ? (
      <CanvasContainer id={canvas_id} input={input} setInput={setInput} />
    ) : (
      <></>
    );
  };

  const handleSubmit = () => {
    problemController.checkSolution(problem.solution_checker, input);
  };

  return (
    <div>
      {problem && canvas_id && canvasRef ? (
        <>
          <div class="bg-gray-900">
            <div class="flex flex-col py-4 mx-auto max-w-screen-xl sm:pt-16 gap-3">
              <div class="mt-4 md:mt-0">
                <h2 class="text-left text-5xl tracking-tight font-extrabold text-gray-900 text-white">
                  <span class=" text-pink-500">{title}</span>
                </h2>
              </div>
              <span class="text-gray-500 text-xl">
                {problem
                  ? problem.topic_name + " > " + problem.series_name
                  : ""}
              </span>
            </div>
            <div class="items-center mx-auto max-w-screen-2xl">
              <p class="mb-6 text-left  font-light text-gray-500 md:text-lg text-gray-400">
                <div
                  style={{
                    width: "100%",
                    padding: "30px 0",
                    fontSize: "25px",
                    color: "azure",
                    border: "none",
                    borderRadius: "20px",
                  }}
                >
                  <h3>
                    <Latex>{statement}</Latex>
                  </h3>
                </div>
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-5 pb-5">
            {canvas_id && canvasRef ? (
              <CanvasContainer
                id={canvas_id}
                input={input}
                setInput={setInput}
                mode={"preview"}
                ref={canvasRef}
              />
            ) : (
              <></>
            )}
            <div
              className="flex flex-row justify-between"
              // style={{ justifyContent: "space-between", marginLeft: "auto" }}
            >
              {/* <button
          style={{ float: "right" }}
          type="submit"
          class="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-lg px-7 py-3.5 text-center bg-pink-600 hover:bg-pink-700 focus:ring-pink-800"
          onClick={() => {
            problemController.checkSolution(
              problem.solution_checker,
              canvasRef.current.getData()
            );
          }}
        >
          Submit
        </button> */}

              <Button
                variant="contained"
                color="success"
                onClick={() => canvasRef.current.handleReset()}
                startIcon={
                  <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
                }
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  problemController.checkSolution(
                    problem.solution_checker,
                    canvasRef.current.getData()
                  );
                }}
                endIcon={<SendIcon sx={{ fontSize: "2rem", color: "white" }} />}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
