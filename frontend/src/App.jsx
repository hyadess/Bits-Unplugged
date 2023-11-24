import "./App.scss";
import Home from "./Pages/Home";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Playground from "./Pages/Playground";
import Problems from "./Pages/Problems";
import Profile from "./Pages/Profile";
import PlaygroundCanvas from "./Pages/PlaygroundCanvas";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProblemsCanvas from "./Pages/ProblemsCanvas";
import Topics from "./Pages/Topics";
import Algorithms from "./Pages/Series";
import ProblemSet from "./Pages/ProblemSet";
import GraphComponent from "./Components/Canvas/GraphComponent";
import CanvasRedirection from "./Components/Canvas/CanvasRedirection";
import { ToastContainer, toast } from "react-toastify";
import ProblemSetEnv from "./Pages/ProblemSetEnv";
import SolutionChecker from "./Pages/SolutionChecker";
import ProblemSetAlgo from "./Pages/ProblemSetSeries";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import AddProblem from "./Pages/AddProblem";
import Layout from "./Pages/Layout";
const showToast = (message, type) => {
  console.log(message, type);
  if (type === "success") toast.success(message, {});
  else if (type === "error") toast.error(message, {});
  else {
    toast.dark(message, {});
  }
};

const Private = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};
const Public = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

const App = () => {
  return (
    <div>
      <ToastContainer
        style={{ width: "270px" }}
        position="top-right"
        theme="colored"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          <Route element={<Private />}>
            <Route path="/playground" element={<Playground />} />
            <Route path="/playground/:id" element={<PlaygroundCanvas />} />
            <Route path="/problem/:id" element={<ProblemsCanvas />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:id" element={<Algorithms />} />
            <Route path="/series/:id" element={<Problems />} />

            <Route path="/problemSet" element={<ProblemSet />} />
            <Route path="/problemSet/topics/:id" element={<ProblemSetAlgo />} />
            <Route path="/problemSet/:prob_id" element={<ProblemSetEnv />} />
            <Route path="/problemSet/series/:id" element={<AddProblem />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<Public />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
export { showToast };
