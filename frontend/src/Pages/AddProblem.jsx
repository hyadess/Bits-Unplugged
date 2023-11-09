import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AlgoController from "../controller/algoController";
import PlaygroundCard from "../Components/PlaygroundCard";
import ProblemCard from "../Components/ProblemCard";
import AlgorithmCard from "../Components/AlgorithmCard";
import ProblemSetAlgoCard from "../Components/ProblemSetAlgoCard";
const algoController = new AlgoController();

export default function AddProblem() {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [algoList, setAlgoList] = useState([]);
  

  const getAlgorithmList = async () => {
    const res = await algoController.getAlgosByTopic(id);
    if (res.success) {
      setAlgoList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    getAlgorithmList();
  }, []);

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    if (name === "text1") {
      setText1(value);
    } else if (name === "text2") {
      setText2(value);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="text1"
        value={text1}
        onChange={handleTextChange}
        placeholder="Enter text 1"
      />
      <input
        type="text"
        name="text2"
        value={text2}
        onChange={handleTextChange}
        placeholder="Enter text 2"
      />
      <div>
        <p>Text 1: {text1}</p>
        <p>Text 2: {text2}</p>
      </div>
    </div>
  );
}
