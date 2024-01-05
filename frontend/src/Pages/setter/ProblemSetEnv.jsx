import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useBeforeUnload } from "react-router-dom";
import CanvasContainer from "../../components/Canvas/CanvasContainer";
import SolutionChecker from "../SolutionChecker";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import ProblemController from "../../controller/problemController";
import ProbSetTab from "../../components/ProbSetTab";
import ProblemStatement from "./Statement";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import Confirmation from "../../components/Confirmation";

import {
  faExpand,
  faSave,
  faTrashCan,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectionField, SelectionField2 } from "../../components/InputFields";

import CanvasController from "../../controller/canvasController";
import { setLoading } from "../../App";
import { IconButton } from "@mui/material";
import Send from "@mui/icons-material/Send";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";

const problemController = new ProblemController();
const canvasController = new CanvasController();

const CanvasDesignTab = ({
  handleCanvasChange,
  canvasId,
  canvasList,
  input,
  setInput,
  canvasRef,
  params,
  setParams,
  uiParams,
  setUiParams,
  controlParams,
  setControlParams,
  reset,
  updateCanvas,
  updateSolutionChecker,
}) => {
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
            updateCanvas();
            updateSolutionChecker();
          }}
          size="large"
          startIcon={<SaveIcon sx={{ fontSize: "2rem", color: "white" }} />}
        >
          Save
        </Button>
      </div>
    </>
  );
};
const SolutionCheckerTab = ({
  checkerType,
  setCheckerType,
  code,
  setCode,
  input,
  canvasId,
  checkerCanvas,
  setCheckerCanvas,
  params,
  setParams,
  setUiParams,
  uiParams,
  controlParams,
  setControlParams,
  updateSolutionChecker,
  backup,
}) => {
  const [output, setOutput] = useState("");
  const [stdout, setStdout] = useState([]);
  const [test, setTest] = useState(null);
  const handleCheckSolution = async () => {
    try {
      const result = await problemController.checkSolution(
        code,
        checkerCanvas,
        test
      );
      console.log(result);
      setOutput(result.output);
      setStdout(result.stdout);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setTest(JSON.parse(JSON.stringify(input)));
  }, [input]);

  const resetChecker = () => {
    setCheckerCanvas(JSON.parse(JSON.stringify(input)));
    canvasRef.current !== undefined &&
      canvasRef.current !== null &&
      canvasRef.current.handleReset(JSON.parse(JSON.stringify(input)));
  };
  const canvasRef = useRef();
  const testRef = useRef();
  return (
    <>
      <SelectionField
        label="Choose Checker"
        onChange={setCheckerType}
        value={checkerType}
        options={[
          { label: "code", value: 0 },
          { label: "canvas", value: 1 },
        ]}
      />
      {checkerType == 0 ? (
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
      ) : (
        <CanvasContainer
          id={canvasId}
          input={checkerCanvas}
          setInput={setCheckerCanvas}
          ref={canvasRef}
          mode="preview"
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
            resetChecker();
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
            // updateCanvas();
            updateSolutionChecker();
          }}
          size="large"
          startIcon={<SaveIcon sx={{ fontSize: "2rem", color: "white" }} />}
        >
          Save
        </Button>
      </div>
      <div className="bu-bg-title text-white p-5 rounded-md text-2xl font-bold">
        Test Solution Checker
      </div>
      <CanvasContainer
        id={canvasId}
        input={test}
        setInput={setTest}
        ref={testRef}
        mode="preview"
        params={params}
        setParams={setParams}
        uiParams={uiParams}
        setUiParams={setUiParams}
        controlParams={controlParams}
        setControlParams={setControlParams}
      />
      <div className="flex flex-row justify-between py-5">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setTest(input);
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
          onClick={handleCheckSolution}
          endIcon={<Send sx={{ fontSize: "2rem", color: "white" }} />}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default function ProblemSetEnv() {
  const { prob_id } = useParams();
  const [params, setParams] = useState({});
  const [uiParams, setUiParams] = useState({});
  const [checkerCanvas, setCheckerCanvas] = useState(null);
  const [controlParams, setControlParams] = useState({});
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const [isFormDirty, setFormDirty] = useState(false);
  // Block navigating elsewhere when data has been entered into the input

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  const [checkerType, setCheckerType] = useState(0);
  const getProblem = async () => {
    //console.log(prob_id)
    const res = await problemController.getProblemById(prob_id);
    if (res.success) {
      // Just a problem json
      setInput(JSON.parse(JSON.stringify(res.data[0].canvas_data)));
      setBackup(JSON.parse(JSON.stringify(res.data[0].canvas_data)));
      setCheckerCanvas(JSON.parse(JSON.stringify(res.data[0].canvas_data)));
      setTitle(res.data[0].title);
      setProblemStatement(res.data[0].statement);
      setCheckerType(res.data[0].checker_type ? res.data[0].checker_type : 0);
      setCode(res.data[0].checker_code);
      if (res.data[0].checker_canvas !== null)
        setCheckerCanvas(res.data[0].checker_canvas);
      setCanvasId(res.data[0].canvas_id);
      setBackupId(res.data[0].canvas_id);
      setParams(res.data[0].params);
      setUiParams(res.data[0].ui_params);
      setControlParams(res.data[0].control_params);
      setLoading(false);
    }
  };

  const [output, setOutput] = useState("");
  const [stdout, setStdout] = useState([]);

  // useBeforeUnload((e) => {
  //   console.log("Route changed");
  // });
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
    setInput(JSON.parse(JSON.stringify(backup)));
    if (backupId !== canvasId) {
      setCanvasId(backupId);
      changeCanvas(backupId);
    }
    canvasRef.current !== undefined &&
      canvasRef.current !== null &&
      canvasRef.current.handleReset(JSON.parse(JSON.stringify(backup)));
    setResetTrigger(!resetTrigger);
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

  // useEffect(() => {
  //   canvasRef.current !== undefined &&
  //     canvasRef.current !== null &&
  //     canvasRef.current.handleReset();
  // }, [resetTrigger]);

  const deleteProblem = async () => {
    const res = await problemController.deleteProblem(prob_id);
    if (res.success) {
      switchPath("/problemSet");
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
    if (
      checkerCanvas == null ||
      JSON.stringify(backup) === JSON.stringify(checkerCanvas)
    )
      setCheckerCanvas(JSON.parse(JSON.stringify(input)));

    setBackup(JSON.parse(JSON.stringify(input)));
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

  const updateSolutionChecker = async () => {
    const res = await problemController.updateSolutionChecker(
      prob_id,
      checkerType == 0 ? code : checkerCanvas,
      checkerType
    );
    if (res.success) {
      console.log(res);
    }
  };

  const updateAll = async () => {
    // await updateTitle();
    // await updateStatement();
    // await updateCanvas();
    // await updateSolutionChecker();
    // Save all with a new api call
    await problemController.submitProblem(prob_id); // Or sent through this
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
        <div className="mx-auto max-w-screen-2xl items-center py-4 sm:pt-16 md:grid md:grid-cols-2">
          <div className="mt-4 flex flex-row items-center md:mt-0">
            <h2 className="text-center text-5xl font-extrabold tracking-tight md:text-left ">
              <span className="bu-text-title">
                <div onClick={handleTextClick} style={{ cursor: "pointer" }}>
                  {isTextEditable ? (
                    <input
                      className="title h-[3.5rem] rounded-lg border text-4xl outline-none focus:border-green-800 dark:focus:border-pink-600 !focus:ring-4 focus:ring-green-800 dark:focus:ring-pink-600 border-[#1C5B5F] dark:border-pink-800 dark:bg-gray-700"
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
          <div className="flex flex-row justify-end">
            <Tooltip
              title=<h1 className="text-lg text-white">Preview</h1>
              placement="top"
              // TransitionComponent={Zoom}
              arrow
              size="large"
            >
              <IconButton>
                <div
                  data-tooltip-target="tooltip-default"
                  className="bu-text-primary flex cursor-pointer items-center text-3xl"
                  onClick={() => {
                    setLoading(true);
                    switchPath(`/problem/${prob_id}/preview`);
                  }}
                >
                  <FontAwesomeIcon icon={faExpand} />
                </div>
              </IconButton>
            </Tooltip>
            <Tooltip
              title=<h1 className="text-lg text-white">Delete</h1>
              placement="top"
              // TransitionComponent={Zoom}
              arrow
              size="large"
            >
              <IconButton>
                <div
                  data-tooltip-target="tooltip-default"
                  className="bu-text-primary flex cursor-pointer items-center text-3xl"
                  onClick={() => setOpen(true)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </IconButton>
            </Tooltip>

            <Tooltip
              title=<h1 className="text-lg text-white">Save all</h1>
              placement="top"
              // TransitionComponent={Zoom}
              arrow
              size="large"
            >
              <IconButton>
                <div
                  data-tooltip-target="tooltip-default"
                  className="bu-text-primary flex cursor-pointer items-center text-3xl"
                  // onClick={() => setOpen(true)}
                  onClick={async () => {
                    await updateTitle();
                    await updateStatement();
                    await updateCanvas();
                    await updateSolutionChecker();
                  }}
                >
                  <FontAwesomeIcon icon={faSave} />
                </div>
              </IconButton>
            </Tooltip>

            <Tooltip
              title=<h1 className="text-lg text-white">Publish</h1>
              placement="top"
              // TransitionComponent={Zoom}
              // enterDelay={500}
              // leaveDelay={200}
              arrow
              size="large"
              // slotProps={{
              //   popper: {
              //     modifiers: [
              //       {
              //         name: "offset",
              //         options: {
              //           offset: [0, -5],
              //         },
              //       },
              //     ],
              //   },
              // }}
            >
              <IconButton>
                <div
                  data-tooltip-target="tooltip-default"
                  className="bu-text-primary flex cursor-pointer items-center text-3xl"
                  onClick={updateAll}
                >
                  <FontAwesomeIcon icon={faUpload} />
                </div>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <ProbSetTab activeTab={activeComponent} click={setActiveComponent} />

      <div className="component-container relative">
        {/* Slow Transition */}

        {/* Faster transition */}
        <div className={activeComponent === "statement" ? "block" : "hidden"}>
          <ProblemStatement
            statement={problemStatement}
            setStatement={setProblemStatement}
          />
        </div>
        <div className={activeComponent === "canvas" ? "block" : "hidden"}>
          <CanvasDesignTab
            handleCanvasChange={handleCanvasChange}
            canvasId={canvasId}
            canvasList={canvasList}
            input={input}
            setInput={setInput}
            canvasRef={canvasRef}
            params={params}
            setParams={setParams}
            uiParams={uiParams}
            setUiParams={setUiParams}
            controlParams={controlParams}
            setControlParams={setControlParams}
            reset={reset}
            updateCanvas={updateCanvas}
            updateSolutionChecker={updateSolutionChecker}
          />
        </div>
        <div className={activeComponent === "solution" ? "block" : "hidden"}>
          <SolutionCheckerTab
            checkerType={checkerType}
            setCheckerType={setCheckerType}
            code={code}
            setCode={setCode}
            input={input}
            canvasId={canvasId}
            checkerCanvas={checkerCanvas}
            setCheckerCanvas={setCheckerCanvas}
            params={params}
            setParams={setParams}
            setUiParams={setUiParams}
            uiParams={uiParams}
            controlParams={controlParams}
            setControlParams={setControlParams}
            updateSolutionChecker={updateSolutionChecker}
            backup={backup}
            canvasRef={canvasRef}
          />
        </div>
      </div>
      <Confirmation open={open} setOpen={setOpen} onConfirm={deleteProblem} />
    </div>
  );
}
