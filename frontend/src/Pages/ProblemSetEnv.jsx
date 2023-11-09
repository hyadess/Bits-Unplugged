import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlaygroundCard from "../Components/PlaygroundCard";
import GraphComponent from "../Components/Canvas/GraphComponent";
import CanvasRedirection from "../Components/Canvas/CanvasRedirection";
import SolutionChecker from "./SolutionChecker";
import { Button } from "@mui/material";
import ProblemController from "../controller/problemController";
import ProbSetTab from "../Components/ProbSetTab";
import ProblemStatement from "./Statement";
import "./ProblemSetEnv.scss";
const problemController = new ProblemController();

//<ReactTypingEffect speed={0.5} eraseSpeed={1} cursor={"_"} text={[""]}></ReactTypingEffect>
export default function ProblemSetEnv() {
  const { prob_id } = useParams();

  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const getProblem = async () => {
    //console.log(prob_id)
    const res = await problemController.getProblemById(prob_id);
    if (res.success) {
      //const data=JSON.parse(res.data[0].canvas_data);
      setInput(res.data[0].canvas_data);
      setTitle(res.data[0].title);
      setProblemStatement(res.data[0].statement);
      setCode(res.data[0].solution_checker);
      setCanvasId(res.data[0].canvas_id);
      console.log(res.data[0]);
      setLoading(false);
    }
  };

  //title.......................
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

  const [loading, setLoading] = useState(false);

  const [output, setOutput] = useState("");
  const [stdout, setStdout] = useState([]);

  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const [activeComponent, setActiveComponent] = useState("statement");
  const renderComponent = () => {
    switch (activeComponent) {
      case "statement":
        return (
          <ProblemStatement
            problemStatement={problemStatement}
            setStatement={setProblemStatement}
          />
        );
      case "canvas":
        return (
          <CanvasRedirection id={canvasId} input={input} setInput={setInput} />
        );
      case "solution":
        return (
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
        );
      default:
        return null;
    }
  };

  const handleCheckSolution = async () => {
    try {
      const result = await problemController.checkSolution(code, input);
      setOutput(result.output);
      setStdout(result.stdout);
    } catch (error) {
      console.error(error);
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
    console.log(input);
    //const string_input=JSON.stringify(input)
    const res = await problemController.updateCanvas(prob_id, input);
    if (res.success) {
      console.log(res);
    }
  };

  const updateCode = async () => {
    const res = await problemController.updateSolutionChecker(prob_id, code);
    if (res.success) {
      console.log(res);
    }
  };

  const updateAll = async () => {
    await updateTitle();
    await updateStatement();
    await updateCanvas();
    await updateCode();
    await problemController.publishProblem(prob_id);
    };

  useEffect(() => {
    updateCanvas();
  }, [input]);

  // useEffect(() => {
  //   updateStatement();
  // }, [problemStatement]);

  useEffect(() => {
    console.log(prob_id);
    if (prob_id != undefined) {
      getProblem();
    }

    return () => {
      //updateAll();
      console.log("Leaving MyComponent");
    };
  }, [prob_id]);

  return (
    <div>
      <div className="flex flex-col min-h-screen dark:bg-gray-900">
        {/* <Navbar /> */}
        <div class="bg-white mt-20 dark:bg-gray-900">
          <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-2xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <div class="mt-4 md:mt-0">
              <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                <span class="text-pink-600 dark:text-pink-500">
                  <div onClick={handleTextClick} style={{ cursor: "pointer" }}>
                    {isTextEditable ? (
                      <input
                        className="title"
                        type="text"
                        on
                        value={title}
                        onChange={handleTextChange}
                        onClick={(e) => e.stopPropagation()} // Prevent the click event from propagating to the div
                      />
                    ) : (
                      title
                    )}
                  </div>
                </span>
              </h2>
            </div>
            <div className="souvik-button-container">
             <button
              className="submit-button"
              class="text-white font-medium rounded-lg text-lg px-7 py-3.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
              onClick={updateAll}
            >
              PUBLISH
            </button> 
          </div>
          </div>
        </div>
        <ProbSetTab activeTab={activeComponent} click={setActiveComponent} />

        <div className="component-container">{renderComponent()}</div>
        {/* <div className="submit-button-container">
          <button className="submit-button" onClick={updateAll}>
            SUBMIT
          </button>
        </div> */}
      </div>
    </div>
  );
}
