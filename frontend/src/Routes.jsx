import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Cookies from "universal-cookie";
import Home from "./Pages/Home";
import Playground from "./Pages/Playground";
import Problems from "./Pages/Problems";
import PlaygroundCanvas from "./Pages/PlaygroundCanvas";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import ProblemsCanvas from "./Pages/ProblemsCanvas";
import Topics from "./Pages/Topics";
import Series from "./Pages/Series";
import ProblemSet from "./Pages/ProblemSet";
import GraphComponent from "./Components/Canvas/GraphComponent";
import CanvasContainer from "./Components/Canvas/CanvasContainer";

import ProblemSetEnv from "./Pages/ProblemSetEnv";
import SolutionChecker from "./Pages/SolutionChecker";
import PublicNavbar from "./Components/navbar/PublicNavbar";
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
import AdminCanvasList from "./Pages/AdminCanvasList";
import AdminCanvasEditor from "./Pages/AdminCanvasEditor";
import CanvasSelector from "./Pages/CanvasSelector";
import AdminContests from "./Pages/AdminContests";
import AdminSetters from "./Pages/AdminSetters";

import PrivateNavbar from "./Components/navbar/PrivateNavbar";
import AdminNavbar from "./Components/navbar/AdminNavbar";
import LayoutMain from "./Components/Layouts/LayoutMain";

import AddProblem from "./Pages/AddProblem";
import Layout from "./Pages/Layout";
import Navbar from "./Components/Navbar";
import SolverLayout from "./Pages/SolverLayout";
import SetterLayout from "./Pages/SetterLayout";
import SetterProfile from "./Pages/SetterProfile";
import SolverProfile from "./Pages/SolverProfile";
const cookies = new Cookies();

const Private = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  return isLoggedIn ? (
    <Layout2 nav={<PrivateNavbar />}>
      <Outlet />
    </Layout2>
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
      <Layout2 nav={<PrivateNavbar />}>
        <Outlet />
      </Layout2>
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
      <Layout2 nav={<PrivateNavbar />}>
        <Outlet />
      </Layout2>
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
      <Layout2 nav={<AdminNavbar />}>
        <Outlet />
      </Layout2>
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
    <Navigate
      to={type === 0 ? "/topics" : type === 1 ? "/problemSet" : "/admin/topics"}
    />
  ) : (
    <Outlet />
  );
};

const AppRoutes = () => {
  const [type, setType] = useState(-1); // 0 - Solver, 1 - Setter, 2 - Guest
  // const navigator = useNavigate();
  useEffect(() => {
    const isLoggedIn = !!cookies.get("token");
    if (isLoggedIn) {
      setType(cookies.get("type"));
    } else {
      setType(2);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<Admin />}>
          <Route
            path="/admin"
            element={
              <LayoutMain>
                <AdminHome />
              </LayoutMain>
            }
          />
          <Route
            path="/admin/topics"
            element={
              <LayoutMain>
                <AdminTopics />
              </LayoutMain>
            }
          />
          <Route
            path="/admin/topics/:id"
            element={
              <LayoutMain>
                <AdminTopicEditor />
              </LayoutMain>
            }
          />

          <Route
            path="/admin/series"
            element={
              <LayoutMain>
                <AdminSeries />
              </LayoutMain>
            }
          />

          <Route
            path="/admin/series/:id"
            element={
              <LayoutMain>
                <AdminSeriesEditor />
              </LayoutMain>
            }
          />
          <Route
            path="/admin/problems"
            element={
              <LayoutMain>
                <AdminProblems />
              </LayoutMain>
            }
          />
          <Route
            path="/admin/problems/:id"
            element={
              <LayoutMain>
                <AdminProblemEditor />
              </LayoutMain>
            }
          />
          <Route
            path="/admin/canvas"
            element={
              <LayoutMain>
                <AdminCanvasList />
              </LayoutMain>
            }
          />
          <Route
            path="/admin/canvas/:id"
            element={
              <LayoutMain>
                <AdminCanvasEditor />
              </LayoutMain>
            }
          />
          <Route
            path="/admin/contests"
            element={
              <LayoutMain>
                <AdminContests />
              </LayoutMain>
            }
          />
          <Route
            path="/admin/setters"
            element={
              <LayoutMain>
                <AdminSetters />
              </LayoutMain>
            }
          />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProblemSetter />}>
          <Route
            path="/canvas"
            element={
              <LayoutMain>
                <CanvasSelector />
              </LayoutMain>
            }
          />
          <Route
            path="/problem/:id/preview"
            element={
              <LayoutMain>
                <ProblemsCanvas />
              </LayoutMain>
            }
          />
          <Route
            path="/problem/:prob_id/edit"
            element={
              <LayoutMain>
                <ProblemSetEnv />
              </LayoutMain>
            }
          />
          <Route
            path="/problemSet"
            element={
              <LayoutMain>
                <ProblemSet />
              </LayoutMain>
            }
          />
          <Route
            path="/problemSet"
            element={
              <LayoutMain>
                <ProblemSet />
              </LayoutMain>
            }
          />
          <Route path="/problemSet/series/:id" element={<AddProblem />} />

          <Route
            path="/setter/:username"
            element={
              <LayoutMain>
                <SetterProfile />
              </LayoutMain>
            }
          />
        </Route>
        <Route element={<ProblemSolver />}>
          <Route
            path="/problem/:id"
            element={
              <LayoutMain>
                <ProblemsCanvas />
              </LayoutMain>
            }
          />

          <Route
            path="/problems"
            element={
              <LayoutMain>
                <Problems />
              </LayoutMain>
            }
          />

          <Route
            path="/topics"
            element={
              <LayoutMain
                left={
                  <div
                    className="max-w-sm rounded-lg shadow-lg border bu-nav-color bu-text-primary"
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Put unsolved and bookmarked problems here
                  </div>
                }
                right={
                  <div className="flex flex-col gap-5 w-full">
                    <div
                      className="max-w-sm rounded-lg shadow-lg bu-nav-color bu-text-primary"
                      style={{
                        height: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Put Stats here
                    </div>
                    <div
                      className="max-w-sm  border rounded-lg shadow-lg bu-nav-color bu-text-primary"
                      style={{
                        height: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Put Stats here
                    </div>
                  </div>
                }
              >
                <Topics />
              </LayoutMain>
            }
          />
          <Route
            path="/topics/:id"
            element={
              <LayoutMain>
                <Series />
              </LayoutMain>
            }
          />
          <Route
            path="/series/:id"
            element={
              <LayoutMain>
                <Problems />
              </LayoutMain>
            }
          />
          <Route
            path="/user/:username"
            element={
              <LayoutMain>
                <SolverProfile />
              </LayoutMain>
            }
          />
        </Route>
        {/* 
        <Route element={<Private />}>
          <Route
            path="/profile/:username"
            element={
              <LayoutMain>
                <SolverProfile />
              </LayoutMain>
            }
          />
        </Route> */}

        <Route element={<Public />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {type >= 0 && (
          <Route
            path="/"
            element={
              <Navigate
                replace
                to={
                  type === 0 ? "/topics" : type === 1 ? "/problemSet" : "/home"
                }
              />
            }
          />
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
  );
};

export default AppRoutes;
