import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { setLoading, showSuccess } from "../../../App";
import { problemApi } from "../../../api";
import ProblemContextProvider, {
  useProblemContext,
} from "../../../store/ProblemContextProvider";
import ProbSetTab from "../../ProbSetTab";
import Confirmation from "../../../components/Confirmation";
import SolutionCheckerTab from "../../SolutionCheckerTab";
import CanvasDesignTab from "../../CanvasDesignTab";
import DetailsTab from "./DetailsTab";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CanvasPreview from "pages/CanvasPreview";

const ProblemSetEnvView = () => {
  const backupProblem = useRef(null);
  const { problemid } = useParams(); // problem.id
  const [isFormDirty, setFormDirty] = useState(false); // pending
  const [open, setOpen] = useState(false); // decouple
  const navigate = useNavigate();
  const { state: problem, dispatch } = useProblemContext();
  const [activeComponent, setActiveComponent] = useState("Details"); // not related to database
  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  const testRef = useRef(null);

  const updateCanvas = async () => {
    dispatch({
      type: "UPDATE_CHECKER_CANVAS",
      payload: deepCopy(problem.canvasData),
    });
    console.log("Canvas Updated");
    backupProblem.current.canvasData = deepCopy(problem.canvasData);
    const res = await problemApi.updateProblem(problem.id, {
      canvasId: problem.canvasId,
      canvasData: problem.canvasData,
      editOptions: problem.editOptions,
      previewOptions: problem.previewOptions,
      checkerCode: problem.checkerCode,
      checkerCanvas: problem.checkerCanvas,
    });
    if (res.success) {
      // console.log(res);
      showSuccess("Canvas saved successfully", res);
    }
  };

  const deleteProblem = async () => {
    const res = await problemApi.deleteProblem(problem.id);
    if (res.success) {
      navigate("/problemSet");
    }
  };

  const getProblem = async () => {
    const res = await problemApi.getProblemById(problemid);
    console.log(problemid);
    if (res.success) {
      backupProblem.current = res.data;
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: JSON.parse(
          JSON.stringify({
            ...res.data,
            test: null,
            testActivity: {},
            checkerCanvas: res.data.checkerCanvas ?? res.data.canvasData,
          })
        ),
      });
      setLoading(false);
    }
  };

  const updateSolutionChecker = async (checkerType) => {
    if (checkerType == 0 && problem.checkerCode == null) return;
    if (checkerType == 1 && problem.checkerCanvas == null) return;
    const res = await problemApi.updateProblem(problem.id, {
      ...(checkerType == 0 && {
        checkerCode: problem.checkerCode,
      }),
      ...(checkerType == 1 && {
        checkerCanvas: problem.checkerCanvas,
      }),
    });
    if (res.success) {
      showSuccess("Checker saved successfully", res);
    }
  };

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
    if (problemid != undefined) {
      getProblem();
    }
  }, [problemid]);
  const onSubmit = async () => {};

  return (
    <div>
      <Header backupProblem={backupProblem} />
      <ProbSetTab
        activeTab={activeComponent}
        click={(tab) => {
          if (tab === "Test" && activeComponent !== "Test") {
            dispatch({
              type: "UPDATE_TEST_CANVAS",
              payload: deepCopy(problem.canvasData),
            });
            testRef?.current?.handleReset(deepCopy(problem.canvasData));
          }
          setActiveComponent(tab);
          // document.body.style.cursor = "default";
        }}
        tabs={["Details", "Canvas", "Solution", "Test"]}
      />

      <div className="component-container relative">
        <div
          className={
            "mt-5 flex flex-col gap-5 " +
            (activeComponent === "Details" ? "block" : "hidden")
          }
        >
          <DetailsTab />
        </div>
        <div className={activeComponent === "Canvas" ? "block" : "hidden"}>
          <CanvasDesignTab
            backupProblem={backupProblem}
            onSave={updateCanvas}
          />
        </div>
        <div className={activeComponent === "Solution" ? "block" : "hidden"}>
          <SolutionCheckerTab onSave={updateSolutionChecker} />
        </div>
        <div className={activeComponent === "Test" ? "block" : "hidden"}>
          <CanvasPreview
            ref={testRef}
            onSubmit={onSubmit}
            takeSnapshot={false}
          />
        </div>
      </div>
      <Confirmation open={open} setOpen={setOpen} onConfirm={deleteProblem} />
    </div>
  );
};
const ProblemSetEnv = () => {
  return (
    <ProblemContextProvider>
      <DndProvider backend={HTML5Backend}>
        <ProblemSetEnvView />
      </DndProvider>
    </ProblemContextProvider>
  );
};
export default ProblemSetEnv;
