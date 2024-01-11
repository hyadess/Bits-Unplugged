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
import Home from "./pages/Home";
import Problems from "./pages/user/Problems";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProblemsCanvas from "./pages/ProblemsCanvas";
import Topics from "./pages/user/Topics";
import Series from "./pages/user/Series";
import ProblemSet from "./pages/setter/ProblemSet";
import GraphComponent from "./components/Canvas/GraphComponent";
import CanvasContainer from "./components/Canvas/CanvasContainer";

import ProblemSetEnv from "./pages/setter/ProblemSetEnv";
import SolutionChecker from "./pages/SolutionChecker";
import PublicNavbar from "./components/navbar/PublicNavbar";
import Layout2 from "./components/Layouts/Layout2";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import AdminTopics from "./pages/admin/AdminTopics";
import AdminSeries from "./pages/admin/AdminSeries";
import AdminProblems from "./pages/admin/AdminProblems";
import AdminTopicEditor from "./pages/admin/AdminTopicEditor";
import AdminSeriesEditor from "./pages/admin/AdminSeriesEditor";
import AdminProblemEditor from "./pages/admin/AdminProblemEditor";
import AdminCanvasList from "./pages/admin/AdminCanvasList";
import AdminCanvasEditor from "./pages/admin/AdminCanvasEditor";
import AdminContests from "./pages/admin/AdminContests";
import AdminSetters from "./pages/admin/AdminSetters";

import PrivateNavbar from "./components/navbar/PrivateNavbar";
import AdminNavbar from "./components/navbar/AdminNavbar";
import LayoutMain from "./components/Layouts/LayoutMain";

import Navbar from "./components/Navbar";

import ProblemsSubmissions from "./pages/ProblemsSubmissions";
import SetterProfile from "./pages/setter/SetterProfile";
import Profile from "./pages/user/Profille";
import Contests from "./pages/user/Contests";
import SetterContests from "./pages/setter/SetterContests";
const cookies = new Cookies();


const ProblemSolver = () => {
  const cookies = new Cookies();
  const isLoggedIn = localStorage.hasOwnProperty("token");
  const type = localStorage.getItem("type");
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
  const isLoggedIn = localStorage.hasOwnProperty("token");
  const type = localStorage.getItem("type");
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
  const isLoggedIn = localStorage.hasOwnProperty("token");
  const type = localStorage.getItem("type");
  console.log("WHYYYYYYYYYYYYYYYYy");
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
  const isLoggedIn = localStorage.hasOwnProperty("token");
  const type = localStorage.getItem("type");

  return localStorage.hasOwnProperty("token") ? (
    <Navigate
      to={
        localStorage.getItem("type") == 0
          ? "/topics"
          : localStorage.getItem("type") == 1
            ? "/problemSet"
            : localStorage.getItem("type") == 2
              ? "/admin/topics"
              : "/login"
      }
    />
  ) : (
    <Outlet />
  );
};

const AppRoutes = () => {
  const [type, setType] = useState(-1); // 0 - Solver, 1 - Setter, 2 - Guest
  // const navigator = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.hasOwnProperty("token");
    if (isLoggedIn) {
      console.log("setting type to " + localStorage.getItem("type"));
      setType(localStorage.getItem("type"));
    } else {
      console.log("setting type to 0");
      setType(0);
    }
  }, [localStorage]);

  useEffect(() => {
    console.log("routes:", type);
  }, [type]);
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
            path="/admin/problems/:id/preview"
            element={
              <LayoutMain>
                <ProblemsCanvas />
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
            path="/problem/:id/preview"
            element={
              <LayoutMain>
                <ProblemsCanvas />
              </LayoutMain>
            }
          />
          <Route
            path="/problem/:problemid/edit"
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
            path="/setter/contests"
            element={
              <LayoutMain>
                <SetterContests />
              </LayoutMain>
            }
          />

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
            path="/submission/:id"
            element={
              <LayoutMain>
                <ProblemsSubmissions />
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
            path="/contests"
            element={
              <LayoutMain>
                <Contests />
              </LayoutMain>
            }
          />

          <Route
            path="/topics"
            element={
              <LayoutMain
              // left={
              //   <div
              //     className="w-full rounded-lg shadow-lg border bu-nav-color bu-text-primary"
              //     style={{
              //       height: "100%",
              //       display: "flex",
              //       alignItems: "center",
              //       justifyContent: "center",
              //     }}
              //   >
              //     Put unsolved and bookmarked problems here
              //   </div>
              // }
              // right={
              //   <div className="flex flex-col gap-5 w-full">
              //     <div
              //       className="w-full rounded-lg shadow-lg bu-nav-color bu-text-primary"
              //       style={{
              //         height: "50%",
              //         display: "flex",
              //         alignItems: "center",
              //         justifyContent: "center",
              //       }}
              //     >
              //       Put Stats here
              //     </div>
              //     <div
              //       className="w-full  border rounded-lg shadow-lg bu-nav-color bu-text-primary"
              //       style={{
              //         height: "50%",
              //         display: "flex",
              //         alignItems: "center",
              //         justifyContent: "center",
              //       }}
              //     >
              //       Put Stats here
              //     </div>
              //   </div>
              // }
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
                <Profile />
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
                <Profile />
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
                  type == 0
                    ? "/topics"
                    : type == 1
                      ? "/problemSet"
                      : type == 2
                        ? "/admin/topics"
                        : "/home"
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

        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
