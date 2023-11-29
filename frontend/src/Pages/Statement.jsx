import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Statement.scss";
import Latex from "react-latex";
import ProblemController from "../controller/problemController";
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
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-5">
        <textarea
          className="text-area w-full md:w-1/2 m-0"
          placeholder=" "
          value={text}
          style={{ height: "50vh" }}
          onChange={(e) => handleProblemStatementChange(e)}
        ></textarea>
        <div
          className="w-full md:w-1/2 border-2 border-gray-200"
          style={{
            height: "50vh",
            padding: "30px",
            fontSize: "25px",
            color: "azure",
            marginTop: "20px",
            // border: "black",
            borderRadius: "20px",
          }}
        >
          <h3>
            <Latex>{text}</Latex>
          </h3>
        </div>
      </div>

      <div className="flex-center" style={{ justifyContent: "flex-end" }}>
        <button
          onClick={updateStatement}
          className="export-button-statement"
        ></button>
      </div>
    </div>
  );
}

export default ProblemStatement;
