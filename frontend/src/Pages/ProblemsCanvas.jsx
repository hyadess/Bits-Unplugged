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
import Cookies from "universal-cookie";
import Latex from "react-latex";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../Components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../App";
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
  const [data, setData] = useState();
  const [canvas, setCanvas] = useState(null);
  const [type, setType] = useState(-1);
  const baseURL = "https";
  const canvasRef = useRef();

  useEffect(() => {
    renderProblem();
    const cookies = new Cookies();
    const isLoggedIn = !!cookies.get("token");
    if (isLoggedIn) {
      setType(cookies.get("type"));
    }
  }, []);

  const renderProblem = async () => {
    const result = await problemController.getProblemById(id);
    if (result.success) {
      setProblem(result.data[0]);
      setInput(result.data[0].canvas_data);
      setCanvas_Id(result.data[0].canvas_id);
      setStatement(result.data[0].statement);
      setTitle(result.data[0].title);

      if (result.data[0].canvas_id === null) setLoading(false);
    }
  };

  return (
    <div>
      {problem ? (
        <>
          <div>
            <div className="flex flex-row justify-between">
              <div class="flex flex-col py-4 max-w-screen-xl sm:pt-12 gap-3">
                <div class="mt-4 md:mt-0">
                  <h2 class="text-left text-5xl tracking-tight font-extrabold ">
                    <span class="bu-text-title">{title}</span>
                  </h2>
                </div>
                <span class="bu-text-subtitle text-xl">
                  {problem
                    ? problem.topic_name + " > " + problem.series_name
                    : ""}
                </span>
              </div>
              {type == 1 ? (
                <div className="flex items-center">
                  <button
                    className="submit-button"
                    class="text-white font-medium rounded-lg text-lg px-7 py-3.5 text-center bu-button-primary"
                    onClick={() => {
                      setLoading(true);
                      navigator(`/problem/${problem.problem_id}/edit`);
                    }}
                  >
                    <div class="flex flex-row gap-4 items-center">
                      <FontAwesomeIcon icon={faPenToSquare} size="md" />
                      EDIT
                    </div>
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div class="items-center mx-auto max-w-screen-2xl">
              <p class="mb-6 text-left  font-light md:text-lg bu-text-primary">
                <div
                  style={{
                    width: "100%",
                    padding: "30px 0",
                    fontSize: "25px",
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
          {canvas_id && canvasRef && (
            <div className="w-full flex flex-col gap-5">
              <CanvasContainer
                id={canvas_id}
                input={input}
                setInput={setInput}
                mode={"preview"}
                ref={canvasRef}
              />
              <div className="flex flex-row justify-between">
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
                  endIcon={
                    <SendIcon sx={{ fontSize: "2rem", color: "white" }} />
                  }
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
