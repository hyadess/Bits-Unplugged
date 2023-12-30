import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CanvasContainer from "../Components/Canvas/CanvasContainer";
import ProblemController from "../controller/problemController";
import { Button } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";

import Cookies from "universal-cookie";
import Latex from "react-latex";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../Components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../App";

const problemController = new ProblemController();

export default function ProblemsSubmissions() {
  const navigator = useNavigate();
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [type, setType] = useState(-1);

  useEffect(() => {
    if (id !== undefined) renderProblem();
    const cookies = new Cookies();
    const isLoggedIn = !!cookies.get("token");
    if (isLoggedIn) {
      setType(cookies.get("type"));
    }
  }, []);

  const renderProblem = async () => {
    const result = await problemController.getProblemById(id);
    if (result.success) {
      setProblem(result.data[0]);
      setLoading(false);
      //if (result.data[0].canvas_id === null) setLoading(false);
    }
  };

  return problem ? (
    <div className="flex flex-col py-4 max-w-screen-xl sm:pt-12 gap-3">
      <div className="mt-4 md:mt-0">
        <h2 className="text-left text-5xl tracking-tight font-extrabold ">
          <span className="bu-text-title">{problem.title}</span>
        </h2>
      </div>
      <span className="bu-text-subtitle text-xl">
        {problem ? problem.topic_name + " > " + problem.series_name : ""}
      </span>
    </div>
  ) : (
    <></>
  );
}
