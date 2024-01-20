import React, { useState } from "react";
import ProbSetTab from "../../../components/ProbSetTab";
import Confirmation from "../../../components/Confirmation";
import TestTab from "./TestTab";
import SolutionCheckerTab from "./SolutionCheckerTab";
import CanvasDesignTab from "./CanvasDesignTab";
import DetailsTab from "./DetailsTab";
import Header from "./Header";
import { useProblemContext } from "./Model";

const ProblemSettingView = ({
  handleCanvasChange,
  saveAll,
  updateAll,
  setTest,
  input,
  setInput,
  testRef,
  canvasRef,
  canvasList,
  editOptions,
  setEditOptions,
  previewOptions,
  setPreviewOptions,
  reset,
  updateCanvas,
  updateSolutionChecker,
  checkerType,
  setCheckerType,
  checkerCanvas,
  setCheckerCanvas,
  handleCheckSolution,
  testActivity,
  setTestActivity,
  open,
  setOpen,
  deleteProblem,
  test,
}) => {
  const [activeComponent, setActiveComponent] = useState("Details"); // not related to database
  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  return (
    <div>
      <Header saveAll={saveAll} updateAll={updateAll} />
      <ProbSetTab
        activeTab={activeComponent}
        click={(tab) => {
          if (tab === "Test" && activeComponent !== "Test") {
            setTest(deepCopy(input));
            testRef?.current?.handleReset(deepCopy(input));
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
          <CanvasDesignTab
            handleCanvasChange={handleCanvasChange}
            canvasList={canvasList}
            input={input}
            setInput={setInput}
            canvasRef={canvasRef}
            editOptions={editOptions}
            setEditOptions={setEditOptions}
            previewOptions={previewOptions}
            setPreviewOptions={setPreviewOptions}
            reset={reset}
            updateCanvas={updateCanvas}
            updateSolutionChecker={updateSolutionChecker}
          />
        </div>
        <div className={activeComponent === "Solution" ? "block" : "hidden"}>
          <SolutionCheckerTab
            checkerType={checkerType}
            setCheckerType={setCheckerType}
            input={input}
            checkerCanvas={checkerCanvas}
            setCheckerCanvas={setCheckerCanvas}
            updateSolutionChecker={updateSolutionChecker}
            canvasRef={canvasRef}
            handleCheckSolution={handleCheckSolution}
          />
        </div>
        <div className={activeComponent === "Test" ? "block" : "hidden"}>
          <TestTab
            test={test}
            setTest={setTest}
            testActivity={testActivity}
            setTestActivity={setTestActivity}
            handleCheckSolution={handleCheckSolution}
            input={input}
          />
        </div>
      </div>
      <Confirmation open={open} setOpen={setOpen} onConfirm={deleteProblem} />
    </div>
  );
};

export default ProblemSettingView;
