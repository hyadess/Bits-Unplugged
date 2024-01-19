import React, { useState, useEffect, useRef } from "react";
import ProblemController from "../../../controller/problemController";
import ProblemStatement from "../../../components/Statement";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CanvasController from "../../../controller/canvasController";
const problemController = new ProblemController();
const canvasController = new CanvasController();

const DetailsTab = ({
  title,
  setTitle,
  problemStatement,
  setProblemStatement,
  problemid,
}) => {
  return (
    <>
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
        <div className="bu-text-primary text-2xl font-medium">Statement</div>
        <ProblemStatement
          statement={problemStatement}
          setStatement={setProblemStatement}
        />
        <button
          className="bu-button-primary flex flex-row items-center justify-center gap-3 rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white focus:outline-none"
          onClick={async () => {
            await problemController.updateProblem(problemid, {
              title: title,
              statement: problemStatement,
            });
          }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} size="sm" />
          SAVE
        </button>
      </div>
    </>
  );
};

export default DetailsTab;
