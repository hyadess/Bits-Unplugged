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

const CustomSelectionField = (props) => {
  return (
    <div className="w-full">
      <label
        for={props.name}
        class="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <select
        value={props.value}
        type="text"
        name={props.name}
        id={props.id}
        class="border sm:text-sm rounded-lg block w-full p-2.5 bu-input-primary"
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange(props.id)}
      >
        <option value="" disabled hidden></option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function ProblemSetEnv() {
  const { prob_id } = useParams();

  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const getProblem = async () => {
    //console.log(prob_id)
    const res = await problemController.getProblemById(prob_id);
    if (res.success) {
      setInput(res.data[0].canvas_data);
      setTitle(res.data[0].title);
      setProblemStatement(res.data[0].statement);
      setCode(res.data[0].solution_checker);
      setCanvasId(res.data[0].canvas_id);
      setLoading(false);
    }
  };

  //title.......................
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
  const [input, setInput] = useState("");
  const canvasRef = useRef();
  const [activeComponent, setActiveComponent] = useState("statement");
  const [canvasList, setCanvasList] = useState([]);
  const [canvasFullList, setCanvasFullList] = useState([]);
  const getCanvasList = async () => {
    const res = await canvasController.getAllCanvas();
    if (res.success) {
      setCanvasFullList(res.data);
      const newArray = res.data.map((item) => ({
        value: item.canvas_id,
        label: item.name,
      }));
      console.log("::::::", newArray);
      setCanvasList(newArray);
      console.log(res);
    }
  };

  const getCanvas = async () => {};

  const handleCanvasChange = (prop) => (e) => {
    setCanvasId(e.target.value);
    var res = canvasFullList.find((element) => {
      return element.canvas_id == e.target.value;
    });

    if (res) {
      console.log("Found: ", res.template);
      setCode(res.template);
      setInput(null);
    }
  };

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
                  setInput(canvasRef.current.getData());
                  updateCanvas(canvasRef.current.getData());
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

  const updateCanvas = async (canvas_data) => {
    const res = await problemController.updateCanvas(
      prob_id,
      canvasId,
      canvas_data
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
    await updateCanvas(input);
    await updateCode();
    await problemController.submitProblem(prob_id);
  };

  // useEffect(() => {
  //   updateCanvas();
  // }, [input]);

  useEffect(() => {
    getCanvasList();
  }, []);
  // useEffect(() => {
  //   updateStatement();
  // }, [problemStatement]);

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
                      className="title text-4xl"
                      type="text"
                      on
                      value={title}
                      onChange={handleTextChange}
                      onClick={(e) => e.stopPropagation()} // Prevent the click event from propagating to the div
                      onBlur={() => updateTitle()}
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
