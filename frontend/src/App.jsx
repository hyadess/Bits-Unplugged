import "./App.scss";
import Home from "./Pages/Home";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Playground from "./Pages/Playground";
import Problems from "./Pages/Problems";
import Profile from "./Pages/Profile";
import PlaygroundCanvas from "./Pages/PlaygroundCanvas";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import ProblemsCanvas from "./Pages/ProblemsCanvas";
import Topics from "./Pages/Topics";
import Series from "./Pages/Series";
import ProblemSet from "./Pages/ProblemSet";
import GraphComponent from "./Components/Canvas/GraphComponent";
import CanvasContainer from "./Components/Canvas/CanvasContainer";
import { ToastContainer, toast } from "react-toastify";
import ProblemSetEnv from "./Pages/ProblemSetEnv";
import SolutionChecker from "./Pages/SolutionChecker";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import AddProblem from "./Pages/AddProblem";
import Layout from "./Pages/Layout";
import Navbar from "./Components/Navbar";
import SolverLayout from "./Pages/SolverLayout";
import SetterLayout from "./Pages/SetterLayout";
import { Dialog, DialogContent } from "@mui/material";
import { Circles } from "react-loader-spinner";

import PublicNavbar from "./Components/PublicNavbar";
import Layout2 from "./Components/Layouts/Layout2";
import ProblemSetSeriesCard from "./Components/Cards/ProblemSetSeriesCard";
import AdminLogin from "./Pages/auth/AdminLogin";
import AdminHome from "./Pages/home/AdminHome";
import AdminTopics from "./Pages/AdminTopics";
import AdminSeries from "./Pages/AdminSeries";
import AdminProblems from "./Pages/AdminProblems";
import AdminTopicEditor from "./Pages/AdminTopicEditor";
import AdminSeriesEditor from "./Pages/AdminSeriesEditor";
import AdminProblemEditor from "./Pages/AdminProblemEditor";
// import { ReactComponent as YourSvg } from "../public/manifest.json";
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

const ProblemSolver = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  const type = cookies.get("type");
  return isLoggedIn ? (
    type == 0 ? (
      <Layout>
        <Outlet />
      </Layout>
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/login?type=solver" />
  );
};

const ProblemSetter = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  const type = cookies.get("type");
  return isLoggedIn ? (
    type == 1 ? (
      <Layout>
        <Outlet />
      </Layout>
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/login?type=setter" />
  );
};

const Admin = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  const type = cookies.get("type");
  console.log(type);
  return isLoggedIn ? (
    type == 2 ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/admin/login" />
  );
};
const Public = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  const type = cookies.get("type");
  return isLoggedIn ? (
    <Navigate to={type === 0 ? "/topics" : "/problemSet"} />
  ) : (
    <Outlet />
  );
};
var setLoading;
const App = () => {
  const [loading, setL] = useState(false);
  const [type, setType] = useState(-1); // 0 - Solver, 1 - Setter, 2 - Guest
  // const navigator = useNavigate();
  useEffect(() => {
    const cookies = new Cookies();
    const isLoggedIn = !!cookies.get("token");
    if (isLoggedIn) {
      setType(cookies.get("type"));
    } else {
      setType(2);
    }

    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      console.log("Dark Mode");
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      console.log("Light Mode");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  }, []);
  setLoading = setL;

  return (
    <div>
      <Dialog open={loading}>
        <DialogContent>
          <Circles color="#00BFFF" height={100} width={100} />
          {/* <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "0" }}>
              <P1 />
            </div>
            <div style={{ position: "absolute" }}>
              <P1 />
            </div>
          </div> */}
        </DialogContent>
      </Dialog>
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
          <Route element={<Admin />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/topics" element={<AdminTopics />} />
            <Route path="/admin/topics/:id" element={<AdminTopicEditor />} />
            <Route path="/admin/series" element={<AdminSeries />} />
            <Route path="/admin/series/:id" element={<AdminSeriesEditor />} />
            <Route path="/admin/problems" element={<AdminProblems />} />
            <Route
              path="/admin/problems/:id"
              element={<AdminProblemEditor />}
            />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProblemSetter />}>
            <Route
              path="/problem/:id/preview"
              element={
                <SetterLayout>
                  <ProblemsCanvas />
                </SetterLayout>
              }
            />
            <Route
              path="/problem/:prob_id/edit"
              element={
                <SetterLayout>
                  <ProblemSetEnv />
                </SetterLayout>
              }
            />
            <Route
              path="/problemSet"
              element={
                <SetterLayout>
                  <ProblemSet />
                </SetterLayout>
              }
            />
          </Route>
          <Route element={<ProblemSolver />}>
            <Route
              path="/problem/:id"
              element={
                <SolverLayout>
                  <ProblemsCanvas />
                </SolverLayout>
              }
            />

            <Route
              path="/problems"
              element={
                <SolverLayout>
                  <Problems />
                </SolverLayout>
              }
            />
            <Route
              path="/topics"
              element={
                <SolverLayout>
                  <Topics />
                </SolverLayout>
              }
            />
            <Route
              path="/topics/:id"
              element={
                <SolverLayout>
                  <Series />
                </SolverLayout>
              }
            />
            <Route
              path="/series/:id"
              element={
                <SolverLayout>
                  <Problems />
                </SolverLayout>
              }
            />

            <Route path="/problemSet/series/:id" element={<AddProblem />} />

            <Route
              path="/profile/:username"
              element={
                <SolverLayout>
                  <Profile />
                </SolverLayout>
              }
            />
          </Route>
          <Route element={<Public />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          {type >= 0 ? (
            <Route
              path="/"
              element={
                <Navigate
                  replace
                  to={
                    type === 0
                      ? "/topics"
                      : type === 1
                      ? "/problemSet"
                      : "/home"
                  }
                />
              }
            />
          ) : (
            <></>
          )}

          <Route
            path="/home"
            element={
              <Layout2 nav={<PublicNavbar />}>
                <Home />
              </Layout2>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
export { showToast, setLoading };
