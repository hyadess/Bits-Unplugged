import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/landing/Home";
import Problems from "./pages/user/Problems";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProblemsCanvas from "./pages/ProblemsCanvas";
import Topics from "./pages/user/Topics";
import Series from "./pages/user/Series";
import SetterProblems from "./pages/setter/SetterProblems";
import ProblemSetEnv from "./pages/setter/ProblemSetEnv";
import ContestSetEnv from "./pages/setter/ContestSetEnv";
import PublicNavbar from "./pages/landing/PublicNavbar";
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
import ProfileSubmissions from "./pages/user/Profile/ProfileSubmissions";
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
import Profile from "./pages/user/Profile/Profile";
import SetterContests from "./pages/setter/SetterContests";
import Contest from "./pages/setter/Contest";
import GlobalContext from "./store/GlobalContext";
import EmailVerification from "./pages/auth/EmailVerification";
import Contests from "./pages/user/Contests";
import UserContest from "./pages/Contest";
import UserContestDetails from "./pages/ContestDetails";
import History from "./pages/setter/ProblemSetEnv/History";
import TopicStat from "./pages/user/TopicStat";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminArticleEditor from "./pages/admin/AdminArticleEditor";
import Article from "./pages/user/Article/Article";
import SolverNavbar from "./components/Navbars/SolverNavbar";
import RecentProblems from "./pages/user/RecentProblems";
import SetterNavbar from "./components/Navbars/SetterNavbar";
import AcceptRequest from "pages/setter/ContestSetEnv/AcceptRequest";
import UserHome from "pages/user/Home";
import ProblemList from "pages/user/ProblemList";
import SetterProfileTab from "components/SetterProfileTab";
import LayoutSecondary from "components/Layouts/LayoutSecondary";
const ProblemSolver = () => {
  const isLoggedIn = localStorage.hasOwnProperty("token");
  const type = localStorage.getItem("type");
  return isLoggedIn ? (
    type == 0 ? (
      <Layout2 nav={<SolverNavbar />}>
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
    <LayoutSecondary
      left={<SolverProfileTab activeTab={activeTab} click={click} />}
    >
      {activeTab == "Details" ? <Profile /> : <ProfileSubmissions />}
    </LayoutSecondary>
  );
};

const ProfileForSetter = () => {
  const [activeTab, setActiveTab] = useState("Details");
  const click = (tab) => {
    setActiveTab(tab);
  };
  return (
    // <LayoutMain left={<SetterProfileTab activeTab={activeTab} click={click} />}>
    <LayoutMain left={<></>}>
      {/* {activeTab == "Details" ? <SetterProfile /> : <SetterProblems />} */}
      {<SetterProfile />}
    </LayoutMain>
  );
};

const ProblemSetter = () => {
  const isLoggedIn = localStorage.hasOwnProperty("token");
  const type = localStorage.getItem("type");
  return isLoggedIn ? (
    type == 1 ? (
      <Layout2 nav={<SetterNavbar />}>
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
            path="/admin/articles"
            element={
              <LayoutMain>
                <AdminArticles />
              </LayoutMain>
            }
          />
          <Route
            path="/admin/articles/:id"
            element={
              <LayoutMain>
                <AdminArticleEditor />
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
              <LayoutMain right={<History />}>
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

          <Route path="/Accept-request" element={<AcceptRequest />} />

          <Route
            path="/setter/contests"
            element={
              <LayoutMain>
                <SetterContests />
              </LayoutMain>
            }
          />

          <Route path="/setter/:username" element={<ProfileForSetter />} />

          <Route path="/contests/:id/edit" element={<ContestSetEnv />} />

          <Route
            path="/contests/:contestid/edit"
            element={
              <LayoutMain right={<History />}>
                <Contest />
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

          <Route path="/contests/:id" element={<UserContestDetails />} />

          <Route
            path="/contests/:id/Problems/:problemid"
            element={<UserContest />}
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
            path="/home"
            element={
              <LayoutMain>
                <UserHome />
              </LayoutMain>
            }
          />
          <Route
            path="/practice"
            element={
              <LayoutMain>
                <ProblemList />
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
                {/* <RecentProblems /> */}
              </LayoutMain>
            }
          />
          <Route
            path="/topics/:id"
            element={
              <LayoutMain
              //right={<TopicStat/>}
              >
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
            path="/articles/:id"
            element={
              <LayoutMain>
                <Article />
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
            // <Layout2 nav={<PublicNavbar />}>
            <Home />
            // </Layout2>
          }
        />

        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
