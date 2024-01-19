import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useBeforeUnload } from "react-router-dom";
import ProblemController from "../../../controller/problemController";
import CanvasController from "../../../controller/canvasController";
import { setLoading } from "../../../App";
import ProblemSettingView from "./ProblemSettingView";
const problemController = new ProblemController();
const canvasController = new CanvasController();

export default function ProblemSetEnv() {
  // title, statement, input, options, checker, test
  const backupProblem = useRef(null);
  const [problem, setProblem] = useState({});
  // const [canvas,setCanvas] = useState({});
  // const [activity,setActivity] = useState({});
  // const [options,setOptions] = useState({edit:{},preview:{}});
  // const [checker,setChecker] = useState({canvas:{},code:""});
  // const [canvasList,setCanvasList] = useState([]);
  // const canvasRef = useRef(); -> Send where reset button is

  // Things needed to compare solution
  // canvasdata.drawingData
  // canvasdata.additionalData
  // answer.drawingData
  // canvasdata.additionalData
  const { problemid } = useParams(); // problem.id
  const [editOptions, setEditOptions] = useState({}); // options.preview
  const [previewOptions, setPreviewOptions] = useState({}); // options.preview

  const [checkerCanvas, setCheckerCanvas] = useState(null); // checker.canvas
  const [code, setCode] = useState(""); // checker.code

  const testRef = useRef();
  const [test, setTest] = useState(null); // Temporary canvas data. Not connected to database.
  const [testActivity, setTestActivity] = useState({});

  const [isFormDirty, setFormDirty] = useState(false); // pending

  const [canvasId, setCanvasId] = useState(null); // problem.canvasdata.canvasId
  //
  const [title, setTitle] = useState("Title"); // problem.title

  const [problemStatement, setProblemStatement] = useState(" "); // Replace with your actual problem statement

  // Function to handle changes in the textarea

  const [open, setOpen] = useState(false); // decouple
  const [input, setInput] = useState(null); // problem.canvasdata.drawingData
  const canvasRef = useRef();

  // try to make the 2 list one
  const [canvasList, setCanvasList] = useState([]);
  const [canvasFullList, setCanvasFullList] = useState([]);
  // const [resetTrigger, setResetTrigger] = useState(false);
  const [checkerType, setCheckerType] = useState(0); // send to solution checker tab

  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const init = (problem) => {
    setProblem(deepCopy(problem));
    setInput(deepCopy(problem.canvasData));
    setCheckerCanvas(deepCopy(problem.canvasData));
    setTitle(problem.title);
    setProblemStatement(problem.statement);
    setCheckerType(1);
    setCode(problem.checkerCode);
    if (problem.checkerCanvas !== null) setCheckerCanvas(problem.checkerCanvas);
    setCanvasId(problem.canvasId);
    setEditOptions(problem.editOptions);
    setPreviewOptions(problem.previewOptions);
    setLoading(false);
  };
  const getProblem = async () => {
    //// console.log(problemid)
    const res = await problemController.getProblemById(problemid);
    if (res.success) {
      backupProblem.current = res.data;
      init(backupProblem.current);
    }
  };

  const getCanvasList = async () => {
    const res = await canvasController.getAllCanvas();
    if (res.success) {
      setCanvasFullList(res.data);
      const newArray = res.data.map((canvas) => ({
        value: canvas.id,
        label: canvas.name,
      }));

      setCanvasList(newArray);
      // console.log("=->", res);
    }
  };

  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  const reset = async () => {
    setInput(backupProblem?.current?.canvasData);
    setEditOptions(backupProblem?.current?.editOptions);
    setPreviewOptions(backupProblem?.current?.previewOptions);
    if (backupProblem.current.canvasId !== canvasId) {
      setCanvasId(backupProblem.current.canvasId);
      var res = canvasFullList.find((canvas) => {
        return canvas.id == canvasId;
      });
      if (res) {
        setCode(res.template);
        setCheckerCanvas(deepCopy(backupProblem.current.canvasData));
        setEditOptions(res.editOptions);
        setPreviewOptions(res.previewOptions);
      }
    }
    canvasRef?.current?.handleReset(deepCopy(backupProblem.current.canvasData));
  };

  const changeCanvas = (canvasId) => {
    setCanvasId(canvasId);

    if (canvasId == backupProblem.current.canvasId) {
      const problem = backupProblem.current;
      setInput(deepCopy(problem.canvasData));
      setCheckerCanvas(deepCopy(problem.checkerCanvas ?? problem.canvasData));
      setCode(problem.checkerCode);
      setEditOptions(problem.editOptions);
      setPreviewOptions(problem.previewOptions);
      canvasRef?.current?.handleReset(
        deepCopy(backupProblem.current.canvasData)
      );
    } else {
      var res = canvasFullList.find((canvas) => {
        return canvas.id == canvasId;
      });
      if (res) {
        setCode(res.template);
        setInput(null);
        setCheckerCanvas(null);
        setEditOptions(res.editOptions);
        setPreviewOptions(res.previewOptions);
      }
    }
  };

  const handleCanvasChange = (prop) => (e) => {
    changeCanvas(e.target.value);
  };

  const deleteProblem = async () => {
    const res = await problemController.deleteProblem(problemid);
    if (res.success) {
      switchPath("/problemSet");
    }
  };

  const updateCanvas = async () => {
    setCheckerCanvas(deepCopy(input));
    backupProblem.current.canvasData = input;
    const res = await problemController.updateProblem(problemid, {
      canvasId,
      canvasData: input,
      editOptions,
      previewOptions,
      checkerCode: code,
      checkerCanvas,
    });
    if (res.success) {
      // console.log(res);
    }
  };

  const updateSolutionChecker = async () => {
    if (checkerType == 0 && code == null) return;
    if (checkerType == 1 && checkerCanvas == null) return;
    const res = await problemController.updateProblem(problemid, {
      ...(checkerType == 0 && {
        checkerCode: code,
      }),
      ...(checkerType == 1 && {
        checkerCanvas: checkerCanvas,
      }),
    });
    if (res.success) {
      // console.log(res);
    }
  };
  const handleCheckSolution = async () =>
    // checkerCode,
    // checkerCanvas,
    // userCanvas,
    // userActivity
    {
      // console.log("Run COde");
      try {
        const result = await problemController.checkSolution(
          code,
          checkerCanvas,
          test,
          testActivity
        );
        return result;
      } catch (error) {
        console.error(error);
      }
    };
  const saveAll = async () => {
    await problemController.updateProblem(problemid, {
      title: title,
      statement: problemStatement,
    });
    await updateCanvas(); // solutionChecker
    await updateSolutionChecker();
  };
  const updateAll = async () => {
    // Save all with a new api call
    await problemController.submitProblem(problemid); // Or send through this
  };

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

  useEffect(() => {
    getCanvasList();
  }, []);

  useEffect(() => {
    if (problemid != undefined) {
      getProblem();
    }
  }, [problemid]);

  return (
    <ProblemSettingView
      title={title}
      setTitle={setTitle}
      problemStatement={problemStatement}
      setProblemStatement={setProblemStatement}
      canvasId={canvasId}
      problemid={problemid}
      handleCanvasChange={handleCanvasChange}
      saveAll={saveAll}
      updateAll={updateAll}
      setTest={setTest}
      input={input}
      setInput={setInput}
      testRef={testRef}
      canvasRef={canvasRef}
      canvasList={canvasList}
      editOptions={editOptions}
      setEditOptions={setEditOptions}
      previewOptions={previewOptions}
      setPreviewOptions={setPreviewOptions}
      reset={reset}
      updateCanvas={updateCanvas}
      updateSolutionChecker={updateSolutionChecker}
      checkerType={checkerType}
      setCheckerType={setCheckerType}
      code={code}
      setCode={setCode}
      checkerCanvas={checkerCanvas}
      setCheckerCanvas={setCheckerCanvas}
      handleCheckSolution={handleCheckSolution}
      testActivity={testActivity}
      setTestActivity={setTestActivity}
      open={open}
      setOpen={setOpen}
      deleteProblem={deleteProblem}
      test={test}
    />
  );
}
