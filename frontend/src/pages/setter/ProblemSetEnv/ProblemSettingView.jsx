import React, { useRef, useState } from "react";
import ProbSetTab from "../../../components/ProbSetTab";
import Confirmation from "../../../components/Confirmation";
import TestTab from "./TestTab";
import SolutionCheckerTab from "./SolutionCheckerTab";
import CanvasDesignTab from "./CanvasDesignTab";
import DetailsTab from "./DetailsTab";
import Header from "./Header";
import { useProblemContext } from "./Model";
import { problemApi } from "../../../api";
import { useNavigate } from "react-router-dom";

const ProblemSettingView = ({ backupProblem }) => {
  const [open, setOpen] = useState(false); // decouple
  const navigate = useNavigate();
  const { state: problem, dispatch } = useProblemContext();
  const [activeComponent, setActiveComponent] = useState("Details"); // not related to database
  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  const testRef = useRef();
  const deleteProblem = async () => {
    const res = await problemApi.deleteProblem(problem.id);
    if (res.success) {
      navigate("/problemSet");
    }
  };

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
        }}
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
          <CanvasDesignTab backupProblem={backupProblem} />
        </div>
        <div className={activeComponent === "Solution" ? "block" : "hidden"}>
          <SolutionCheckerTab />
        </div>
        <div className={activeComponent === "Test" ? "block" : "hidden"}>
          <TestTab testRef={testRef} />
        </div>
      </div>
      <Confirmation open={open} setOpen={setOpen} onConfirm={deleteProblem} />
    </div>
  );
};

export default ProblemSettingView;
