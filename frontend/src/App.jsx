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
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
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
import Logo from "./Components/Logo";
import P1 from "./Components/P1";
import PublicNavbar from "./Components/PublicNavbar";
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
  return isLoggedIn ? (
    <Layout>
      <SolverLayout>
        <Outlet />
      </SolverLayout>
    </Layout>
  ) : (
    <Navigate to="/" />
  );
};

const ProblemSetter = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  return isLoggedIn ? (
    <Layout>
      <SetterLayout>
        <Outlet />
      </SetterLayout>
    </Layout>
  ) : (
    <Navigate to="/" />
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
          <Route element={<Private />}>
            <Route
              path="/playground"
              element={
                <SolverLayout>
                  <Playground />
                </SolverLayout>
              }
            />
            <Route
              path="/playground/:id"
              element={
                <SolverLayout>
                  <PlaygroundCanvas />
                </SolverLayout>
              }
            />
            <Route
              path="/problem/:id"
              element={
                <SolverLayout>
                  <ProblemsCanvas />
                </SolverLayout>
              }
            />
            <Route
              path="/problem/:id/preview"
              element={
                <SetterLayout>
                  <ProblemsCanvas />
                </SetterLayout>
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

            <Route
              path="/problemSet"
              element={
                <SetterLayout>
                  <ProblemSet />
                </SetterLayout>
              }
            />
            <Route
              path="/problemSet/:prob_id"
              element={
                <SetterLayout>
                  <ProblemSetEnv />
                </SetterLayout>
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
              <div className="layout-container">
                <div className="body bg-gray-900">
                  <PublicNavbar />
                  <div className="content mb-20 md:mb-0 min-h-screen bg-gray-900">
                    <Home />
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
export { showToast, setLoading };
