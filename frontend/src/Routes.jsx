import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Problems from "./pages/user/Problems";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProblemsCanvas from "./pages/ProblemsCanvas";
import Topics from "./pages/user/Topics";
import Series from "./pages/user/Series";
import SetterProblems from "./pages/setter/SetterProblems";
import ProblemSetEnv from "./pages/setter/ProblemSetEnv";
import PublicNavbar from "./components/Navbars/PublicNavbar";
import SolverProfileTab from "./components/SolverProfileTab";
import Layout2 from "./components/Layouts/Layout2";
import Layout3 from "./components/Layouts/Layout3";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import AdminTopics from "./pages/admin/AdminTopics";
import AdminSeries from "./pages/admin/AdminSeries";
import AdminProblems from "./pages/admin/AdminProblems";
import AdminTopicEditor from "./pages/admin/AdminTopicEditor";
import AdminSeriesEditor from "./pages/admin/AdminSeriesEditor";
import ProfileSubmissions from "./pages/user/ProfileSubmissions";
import AdminProblemEditor from "./pages/admin/AdminProblemEditor";
import AdminCanvasList from "./pages/admin/AdminCanvasList";
import AdminCanvasEditor from "./pages/admin/AdminCanvasEditor";
import AdminContests from "./pages/admin/AdminContests";
import AdminSetters from "./pages/admin/AdminSetters";
import PrivateNavbar from "./components/Navbars/PrivateNavbar";
import AdminNavbar from "./components/Navbars/AdminNavbar";
import LayoutMain from "./components/Layouts/LayoutMain";
import ProblemsSubmissions from "./pages/ProblemsSubmissions";
import SetterProfile from "./pages/setter/SetterProfile";
import Profile from "./pages/user/Profile";
import Contests from "./pages/user/Contests";
import SetterContests from "./pages/setter/SetterContests";
import GlobalContext from "./store/GlobalContext";
import EmailVerification from "./pages/auth/EmailVerification";
const ProblemSolver = () => {
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

const SolverProfile = () => {
  const [activeTab, setActiveTab] = useState("Details");
  const click = (tab) => {
    setActiveTab(tab);
  };
  return (
    <LayoutMain left={<SolverProfileTab activeTab={activeTab} click={click} />}>
      {activeTab == "Details" ? <Profile /> : <ProfileSubmissions />}
    </LayoutMain>
  );
};

const ProblemSetter = () => {
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
  const isLoggedIn = localStorage.hasOwnProperty("token");
  const type = localStorage.getItem("type");
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
  const { type } = useContext(GlobalContext); // 0 - Solver, 1 - Setter, 2 - Guest

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
            path="/admin/canvases"
            element={
              <LayoutMain>
                <AdminCanvasList />
              </LayoutMain>
            }
          />
          <Route
            path="/admin/canvases/:id"
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
            path="/problems/:id/preview"
            element={
              <LayoutMain>
                <ProblemsCanvas />
              </LayoutMain>
            }
          />
          <Route
            path="/problems/:problemid/edit"
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
                <SetterProblems />
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
            path="/problems/:id"
            element={
              <LayoutMain>
                <ProblemsCanvas />
              </LayoutMain>
            }
          />
          <Route
            path="/submissions/:id"
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
          <Route path="/user/:username" element={<SolverProfile />} />
        </Route>

        {/* <Route
          path="/user/:username"
          element={
            <LayoutMain>
              <Profile />
            </LayoutMain>
          }
        /> */}

        <Route element={<Public />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<EmailVerification />} />
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
                        : "/landing"
                }
              />
            }
          />
        )}

        <Route
          path="/landing"
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
