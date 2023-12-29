import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Statement.scss";
import Latex from "react-latex";
import ProblemController from "../../controller/problemController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
const problemController = new ProblemController();
function ProblemStatement(props) {
  const { prob_id } = useParams();
  const [text, setText] = useState(props.problemStatement);

  const handleProblemStatementChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setText(props.problemStatement);
  }, [props.problemStatement]);

  const updateStatement = async () => {
    console.log(text);
    props.setStatement(text);
    const res = await problemController.updateStatement(prob_id, text);
    if (res.success) {
      console.log(res);
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-5">
      <div className="flex flex-col md:flex-row gap-0 md:gap-5">
        <textarea
          className="text-area w-full md:w-1/2 m-0 bu-text-primary bu-bg-color hover:border-black leading-normal p-[20px] text-[25px] border-none rounded-[20px] resize-none mt-[20px]"
          placeholder=" "
          value={text}
          style={{ height: "50vh" }}
          onChange={(e) => handleProblemStatementChange(e)}
        ></textarea>

        <div
          className="w-full md:w-1/2 border-2 border-gray-500 dark:border-gray-200 bu-text-primary preview-area"
          style={{
            height: "50vh",
            padding: "20px",
            fontSize: "25px",
            // color: "azure",
            marginTop: "20px",
            // border: "black",
            borderRadius: "20px",
            overflow: "scroll",
          }}
        >
          <h3>
            <Latex>{text}</Latex>
          </h3>
        </div>
      </div>
      <button
        className="text-white font-medium rounded-lg text-lg px-7 py-3.5 text-center bu-button-primary flex flex-row gap-3 items-center justify-center focus:outline-none"
        onClick={updateStatement}
      >
        <FontAwesomeIcon icon={faFloppyDisk} size="md" />
        SAVE
      </button>
    </div>
  );
}

export default ProblemStatement;
