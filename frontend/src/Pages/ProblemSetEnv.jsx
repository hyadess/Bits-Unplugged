import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CanvasContainer from "../Components/Canvas/CanvasContainer";
import SolutionChecker from "./SolutionChecker";
import { Button } from "@mui/material";
import ProblemController from "../controller/problemController";
import ProbSetTab from "../Components/ProbSetTab";
import ProblemStatement from "./Statement";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import "./ProblemSetEnv.scss";
import Confirmation from "../Components/Confirmation";
import {
  faSave,
  faTrashCan,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectionField, SelectionField2 } from "../Components/InputFields";

import CanvasController from "../controller/canvasController";
import { setLoading } from "../App";
import { Save } from "@mui/icons-material";
const problemController = new ProblemController();
const canvasController = new CanvasController();


export default function ProblemSetEnv() {
  const { prob_id } = useParams();
  const [params, setParams] = useState({});
  const [uiParams, setUiParams] = useState({});
  const [controlParams, setControlParams] = useState({});
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const getProblem = async () => {
    //console.log(prob_id)
    const res = await problemController.getProblemById(prob_id);
    if (res.success) {
      setInput(JSON.parse(JSON.stringify(res.data[0].canvas_data)));
      setBackup(JSON.parse(JSON.stringify(res.data[0].canvas_data)));
      setTitle(res.data[0].title);
      setProblemStatement(res.data[0].statement);
      setCode(res.data[0].solution_checker);
      setCanvasId(res.data[0].canvas_id);
      setBackupId(res.data[0].canvas_id);
      setParams(res.data[0].params);
      setUiParams(res.data[0].ui_params);
      setControlParams(res.data[0].control_params);
      setLoading(false);
    }
  };

  //title.......................
  const [backupId, setBackupId] = useState(null);
  const [canvasId, setCanvasId] = useState(null);
  const [title, setTitle] = useState("Title");
  const [isTextEditable, setIsTextEditable] = useState(false);

  const handleTextClick = () => {
    setIsTextEditable(!isTextEditable);
  };
  const handleTextChange = (event) => {
    setTitle(event.target.value);
  };

  //statement.......................
  const [problemStatement, setProblemStatement] = useState(" "); // Replace with your actual problem statement

  // Function to handle changes in the textarea

  const [output, setOutput] = useState("");
  const [stdout, setStdout] = useState([]);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [backup, setBackup] = useState(null);
  const [input, setInput] = useState(null);
  const canvasRef = useRef();
  const [activeComponent, setActiveComponent] = useState("statement");
  const [canvasList, setCanvasList] = useState([]);
  const [canvasFullList, setCanvasFullList] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(false);
  const getCanvasList = async () => {
    const res = await canvasController.getAllCanvas();
    if (res.success) {
      setCanvasFullList(res.data);
      const newArray = res.data.map((item) => ({
        value: item.canvas_id,
        label: item.name,
      }));

      setCanvasList(newArray);
      console.log(res);
    }
  };

  const reset = async () => {
    // const result = await problemController.getProblemById(prob_id);
    // if (result.success)
    {
      setInput(JSON.parse(JSON.stringify(backup)));
      if (backupId !== canvasId) {
        setCanvasId(backupId);
        changeCanvas(backupId);
      }
      setResetTrigger(!resetTrigger);
    }
  };

  const changeCanvas = (canvas_id) => {
    setCanvasId(canvas_id);
    var res = canvasFullList.find((element) => {
      return element.canvas_id == canvas_id;
    });

    if (res) {
      setCode(res.template);
      setInput(null);
      setParams(res.params);
      setUiParams(res.ui_params);
      setControlParams(res.control_params);
    }
  };
  const handleCanvasChange = (prop) => (e) => {
    changeCanvas(e.target.value);
  };

  useEffect(() => {
    canvasRef.current !== undefined && canvasRef.current.handleReset();
  }, [resetTrigger]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "statement":
        return (
          <ProblemStatement
            problemStatement={problemStatement}
            setStatement={setProblemStatement}
          />
        );
      case "canvas":
        return (
          <>
            <SelectionField2
              label="Choose Canvas"
              onChange={handleCanvasChange}
              id="canvas_id"
              value={canvasId == null ? "" : canvasId}
              options={canvasList}
            />
            {canvasId && (
              <CanvasContainer
                id={canvasId}
                input={input}
                setInput={setInput}
                ref={canvasRef}
                mode="edit"
                params={params}
                setParams={setParams}
                uiParams={uiParams}
                setUiParams={setUiParams}
                controlParams={controlParams}
                setControlParams={setControlParams}
              />
            )}

            <div
              className="flex py-5"
              style={{ justifyContent: "space-between", marginLeft: "auto" }}
            >
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={() => {
                  reset();
                  // canvasRef.current.handleReset();
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
                  // setInput(canvasRef.current.getData());
                  updateCanvas();
                  updateCode();
                }}
                size="large"
                startIcon={
                  <SaveIcon sx={{ fontSize: "2rem", color: "white" }} />
                }
              >
                Save
              </Button>
            </div>
          </>
        );
      case "solution":
        return (
          <SolutionChecker
            code={code}
            setCode={setCode}
            input={input}
            stdout={stdout}
            output={output}
            setOutput={setOutput}
            setStdout={setStdout}
            checkSubmit={handleCheckSolution}
          />
        );
      default:
        return null;
    }
  };

  const deleteProblem = async () => {
    const res = await problemController.deleteProblem(prob_id);
    if (res.success) {
      switchPath("/problemSet");
    }
  };

  const handleCheckSolution = async () => {
    try {
      const result = await problemController.checkSolution(code, input);
      setOutput(result.output);
      setStdout(result.stdout);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTitle = async () => {
    const res = await problemController.updateTitle(prob_id, title);
    if (res.success) {
      console.log(res);
    }
  };
  const updateStatement = async () => {
    const res = await problemController.updateStatement(
      prob_id,
      problemStatement
    );
    if (res.success) {
      console.log(res);
    }
  };

  const updateCanvas = async () => {
    const res = await problemController.updateCanvas(
      prob_id,
      canvasId,
      input,
      params,
      uiParams,
      controlParams
    );
    if (res.success) {
      console.log(res);
    }
  };

  const updateCode = async () => {
    const res = await problemController.updateSolutionChecker(prob_id, code);
    if (res.success) {
      console.log(res);
    }
  };

  const updateAll = async () => {
    await updateTitle();
    await updateStatement();
    await updateCanvas();
    await updateCode();
    await problemController.submitProblem(prob_id);
  };

  useEffect(() => {
    getCanvasList();
  }, []);

  useEffect(() => {
    console.log(prob_id);
    if (prob_id != undefined) {
      getProblem();
    }

    return () => {
      console.log("Leaving MyComponent");
    };
  }, [prob_id]);

  return (
    <div>
      <div>
        <div class="items-center py-4 mx-auto max-w-screen-2xl md:grid md:grid-cols-2 sm:pt-16">
          <div class="mt-4 md:mt-0 flex flex-row items-center">
            <h2 class="text-center md:text-left text-5xl tracking-tight font-extrabold ">
              <span class="bu-text-title">
                <div onClick={handleTextClick} style={{ cursor: "pointer" }}>
                  {isTextEditable ? (
                    <input
                      className="border title text-4xl rounded-lg border-[#1C5B5F] outline-none focus:border-green-800 focus:ring-green-800 focus:ring-4 h-[3.5rem]"
                      type="text"
                      autoFocus
                      value={title}
                      onChange={handleTextChange}
                      onClick={(e) => e.stopPropagation()} // Prevent the click event from propagating to the div
                      onBlur={() => {
                        updateTitle();
                        handleTextClick();
                      }}
                    />
                  ) : (
                    title
                  )}
                </div>
              </span>
            </h2>
            {/* <div className="bu-text-primary text-3xl bu-button-primary p-3 rounded-lg">
              <FontAwesomeIcon icon={faSave} />
            </div> */}
          </div>
          <div className="souvik-button-container gap-2">
            <button
              className="submit-button"
              class="text-white font-medium rounded-lg text-lg px-7 py-3.5 text-center bu-button-delete flex flex-row gap-4 items-center"
              // onClick={deleteProblem}
              onClick={() => setOpen(true)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              DELETE
            </button>
            <button
              className="submit-button"
              class="text-white font-medium rounded-lg text-lg px-7 py-3.5 text-center bu-button-primary flex flex-row gap-4 items-center"
              onClick={updateAll}
            >
              <FontAwesomeIcon icon={faUpload} />
              PUBLISH
            </button>
          </div>
        </div>
      </div>
      <ProbSetTab activeTab={activeComponent} click={setActiveComponent} />

      <div className="component-container">{renderComponent()}</div>
      <Confirmation open={open} setOpen={setOpen} onConfirm={deleteProblem} />
    </div>
  );
}
