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
    <div className="vbox">
      <div className="hbox">
        <textarea
          className="text-area w-50"
          placeholder=" "
          value={text}
          style={{ width: "50%", height: "50vh" }}
          onChange={(e) => handleProblemStatementChange(e)}
        ></textarea>
        {/* <h1 style={{ color: "white" }}> Latex </h1> */}
        <div
          style={{
            width: "50%",
            padding: "30px",
            fontSize: "25px",
            color: "azure",
            border: "none",
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
