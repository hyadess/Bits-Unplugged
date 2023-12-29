import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CanvasContainer from "../Components/Canvas/CanvasContainer";
import ProblemController from "../controller/problemController";
import { Button } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "universal-cookie";
import Latex from "react-latex";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../Components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../App";
import MDEditor from "@uiw/react-md-editor";
import MarkdownEditor from "@uiw/react-markdown-editor";
import katex from "katex";
import "katex/dist/katex.css";
import { getCodeString } from "rehype-rewrite";
import "./ProblemsCanvas.scss";
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
  const [backup, setBackup] = useState(null);
  const [input, setInput] = useState(null);
  const [canvasId, setCanvasId] = useState(null);
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [data, setData] = useState();
  const [canvas, setCanvas] = useState(null);
  const [type, setType] = useState(-1);
  const [resetTrigger, setResetTrigger] = useState(false);
  const baseURL = "https";
  const canvasRef = useRef();
  const [params, setParams] = useState({});
  const [uiParams, setUiParams] = useState({});
  const [controlParams, setControlParams] = useState({});

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
      setInput(JSON.parse(JSON.stringify(result.data[0].canvas_data)));
      setBackup(JSON.parse(JSON.stringify(result.data[0].canvas_data)));
      setCanvasId(result.data[0].canvas_id);
      setStatement(result.data[0].statement);
      setParams(result.data[0].params);
      setUiParams(result.data[0].ui_params);
      setControlParams(result.data[0].control_params);
      setTitle(result.data[0].title);
      if (result.data[0].canvas_id === null) setLoading(false);
    }
  };

  const reset = async () => {
    // const result = await problemController.getProblemById(id);
    // if (result.success)
    {
      setInput(JSON.parse(JSON.stringify(backup)));
      setResetTrigger(!resetTrigger);
    }
  };
  const calculateNumberOfLines = (content) => {
    return content.split("\n").length;
  };

  function getColorModeFromLocalStorage() {
    return localStorage.getItem("color-theme") || "light";
  }

  const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

  useEffect(() => {
    const handleStorageChange = (event) => {
      setColorMode(getColorModeFromLocalStorage);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {}, [backup]);
  useEffect(() => {
    canvasRef.current !== undefined && canvasRef.current.handleReset();
  }, [resetTrigger]);
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
              {type !== 0 ? (
                <div className="flex items-center">
                  <button
                    className="text-white font-medium rounded-lg text-lg px-7 py-3.5 text-center bu-button-primary"
                    onClick={() => {
                      setLoading(true);
                      navigator(
                        type == 2
                          ? `/admin/problems/${problem.problem_id}`
                          : `/problem/${problem.problem_id}/edit`
                      );
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
                  <div data-color-mode={colorMode} className="text-2xl">
                    <div className="wmde-markdown-var "> </div>
                    {/* <MDEditor value={text} onChange={setText} /> */}
                    <MDEditor
                      height={
                        60 +
                        35 * calculateNumberOfLines(statement) +
                        statement.length / 2
                      }
                      preview="preview"
                      hideToolbar={true}
                      enableScroll={false}
                      visibleDragbar={false}
                      className="border-none"
                      value={statement}
                      style={{
                        whiteSpace: "pre-wrap",
                        padding: "20px",
                        borderRadius: "20px",
                        border: 0,
                        // fontSize: "23px !important;",
                      }}
                      previewOptions={{
                        components: {
                          code: ({ children = [], className, ...props }) => {
                            if (
                              typeof children === "string" &&
                              /\$\$(.*)\$\$/.test(children)
                            ) {
                              const html = katex.renderToString(
                                children.replace(/\$\$(.*)\$\$/, "$1"),
                                {
                                  throwOnError: false,
                                }
                              );
                              return (
                                <code
                                  dangerouslySetInnerHTML={{ __html: html }}
                                  style={{ background: "transparent" }}
                                />
                              );
                            }
                            const code =
                              props.node && props.node.children
                                ? getCodeString(props.node.children)
                                : children;
                            if (
                              typeof code === "string" &&
                              typeof className === "string" &&
                              /language-katex/.test(
                                className.toLocaleLowerCase()
                              )
                            ) {
                              const html = katex.renderToString(code, {
                                throwOnError: false,
                              });
                              return (
                                <code
                                  style={{ fontSize: "150%" }}
                                  dangerouslySetInnerHTML={{ __html: html }}
                                />
                              );
                            }
                            return (
                              <code className={String(className)}>
                                {children}
                              </code>
                            );
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </p>
            </div>
          </div>
          {canvasId && canvasRef && (
            <div className="w-full flex flex-col gap-5">
              <CanvasContainer
                id={canvasId}
                input={input}
                setInput={setInput}
                mode={"preview"}
                ref={canvasRef}
                params={params}
                setParams={setParams}
                uiParams={uiParams}
                setUiParams={setUiParams}
                controlParams={controlParams}
                setControlParams={setControlParams}
              />
              <div className="flex flex-row justify-between">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    reset();
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
                  onClick={() => {
                    // setBackup({ ...input });
                    problemController.checkSolution(
                      problem.solution_checker,
                      input
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
