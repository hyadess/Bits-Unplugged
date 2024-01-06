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
  faFloppyDisk,
  faSave,
  faTrashCan,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  SelectionField,
  SelectionField2,
  TextField,
} from "../../components/InputFields";

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

      {canvasId && (
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
      )}

      <SelectionField2
        label="Choose Canvas"
        onChange={handleCanvasChange}
        id="canvas_id"
        value={canvasId == null ? "" : canvasId}
        options={canvasList}
      />
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
          save={updateSolutionChecker}
        />
      ) : checkerType == 1 ? (
        <>
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
        </>
      ) : (
        <></>
      )}
      <SelectionField
        label="Choose Checker"
        onChange={setCheckerType}
        value={checkerType}
        options={[
          { label: "code", value: 0 },
          { label: "canvas", value: 1 },
        ]}
      />
    </>
  );
};

export default function ProblemSetEnv() {
  const { prob_id } = useParams();
  const [params, setParams] = useState({});
  const [uiParams, setUiParams] = useState({});
  const [checkerCanvas, setCheckerCanvas] = useState(null);
  const [controlParams, setControlParams] = useState({});
  const [test, setTest] = useState(null);
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
  const testRef = useRef();
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
  const [activeComponent, setActiveComponent] = useState("Details");
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
    setTest(JSON.parse(JSON.stringify(input)));
  }, [input]);

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
      {/* <div className="fixed left-2 w-40 h-40 bg-black top-1/2 transform -translate-y-1/2"></div> */}
      <div>
        <div className="mx-auto max-w-screen-2xl items-center py-4 pt-8 md:grid md:grid-cols-2">
          <div className="flex flex-row items-center md:mt-0 w-full text-center text-5xl font-extrabold tracking-tight md:text-left bu-text-title">
            {title.length == 0 ? "Untitled" : title}
          </div>
          <div className="flex flex-row justify-end">
            <Tooltip
              title={<h1 className="text-lg text-white">Preview</h1>}
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
            {/* <Tooltip
              title={<h1 className="text-lg text-white">Delete</h1>}
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
            </Tooltip> */}

            <Tooltip
              title={<h1 className="text-lg text-white">Save all</h1>}
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
              title={<h1 className="text-lg text-white">Publish</h1>}
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
        <div
          className={
            "mt-5 flex flex-col gap-5 " +
            (activeComponent === "Details" ? "block" : "hidden")
          }
        >
          <div className="flex flex-col gap-2">
            <div className="bu-text-primary text-2xl font-medium">Title</div>
            <input
              value={title}
              type="text"
              name="title"
              className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
              placeholder="Example Problem Name"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="bu-text-primary text-2xl font-medium">
              Statement
            </div>
            <ProblemStatement
              statement={problemStatement}
              setStatement={setProblemStatement}
            />
            <button
              className="bu-button-primary flex flex-row items-center justify-center gap-3 rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white focus:outline-none"
              onClick={async () => {
                await updateTitle();
                await updateStatement();
              }}
            >
              <FontAwesomeIcon icon={faFloppyDisk} size="sm" />
              SAVE
            </button>
          </div>
        </div>
        <div className={activeComponent === "Canvas" ? "block" : "hidden"}>
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
        <div className={activeComponent === "Solution" ? "block" : "hidden"}>
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
        <div className={activeComponent === "Test" ? "block" : "hidden"}>
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
        </div>
      </div>
      <Confirmation open={open} setOpen={setOpen} onConfirm={deleteProblem} />
    </div>
  );
}
