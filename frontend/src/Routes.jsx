import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import Home from "./pages/landing/Home";
import Problems from "./pages/user/Problems";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProblemsCanvas from "./pages/ProblemsCanvas";
import Topics from "./pages/user/Topics";
import Series from "./pages/user/Series";
import ContestParticipant from "pages/ContestParticipant";
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
import ContestSubmissions from "./pages/ContestSubmissions";
import Contest from "./pages/setter/Contest";
import GlobalContext from "./store/GlobalContext";
import EmailVerification from "./pages/auth/EmailVerification";
import Contests from "./pages/user/Contests";
import UserContest from "./pages/Contest";
import UserContestDetails from "./pages/ContestDetails";
import History from "./pages/setter/ProblemSetEnv/History";
import TopicStat from "./pages/user/TopicStat";
import AdminArticles from "./pages/admin/AdminArticles";
import Article from "./pages/user/Article/Article";
import SolverNavbar from "./components/Navbars/SolverNavbar";
import RecentProblems from "./pages/user/RecentProblems";
import SetterNavbar from "./components/Navbars/SetterNavbar";
import AcceptRequest from "pages/setter/ContestSetEnv/AcceptRequest";
import UserHome from "pages/user/Home";
import ProblemList from "pages/user/ProblemList";
import SetterProfileTab from "components/SetterProfileTab";
import LayoutSecondary from "components/Layouts/LayoutSecondary";
import { contestApi } from "api";
import CountdownTimer from "pages/Timer";
import ContestProblemList from "pages/ContestProblemList";
import SetterHome from "pages/setter/SetterHome";
import ContestTab from "components/ContestTab";
import Leaderboard from "pages/LeaderBoard";
import SetterArticles from "pages/setter/SetterArticles";
import SetterArticleEditor from "pages/setter/SetterArticleEditor";
import EditorialPreview from "pages/EditorialPreview";
import ProfileContests from "pages/user/Profile/ProfileContests";
import HomeRight from "pages/user/HomeRight";
import SubmissionsRight from "components/Pane/SubmissionsRight";
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
      {activeTab == "Details" ? (
        <Profile />
      ) : activeTab == "Submissions" ? (
        <div className="flex flex-row justify-start">
          <div className="w-[75%]">
            <ProfileSubmissions />
          </div>
          <div className="fixed bottom-0 right-0 top-0 hidden w-1/5 p-5 md:mt-20 md:flex overflow-auto scroll-smooth">
            <SubmissionsRight />
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-start">
          <div className="w-[75%]">
            <ProfileContests />
          </div>
        </div>
      )}
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

const ExpiredNotice = (props) => {
  return (
    <div className="expired-notice-container">
      <div className="expired-notice">
        <span>{props.msg}</span>
      </div>
    </div>
  );
};

const ContestWrapper = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [endTime, setendTime] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [activeComponent, setActiveComponent] = useState("Details");
  const isPreview = window.location.href.includes("/preview");
  const fetchContestDetails = async () => {
    try {
      const contest = await contestApi.getContestById(id);
      const virtualParticipant = await contestApi.showVirtualParticipant(id);
      const decoded = jwtDecode(localStorage.getItem("token")).username;
      setUsername(decoded);
      console.log("username", decoded);
      if (contest.success) {
        const contestDuration = contest.data[0].duration * 60 * 60 * 1000;
        const startDateTime = new Date(contest.data[0].startDateTime);
        if (new Date().getTime() < startDateTime.getTime() + contestDuration) {
          setstartTime(startDateTime);
          setendTime(new Date(startDateTime.getTime() + contestDuration));
        } else if(virtualParticipant.data.length>0){
          setstartTime(new Date(virtualParticipant.data[0].createdAt));
          setendTime(
            new Date(
              new Date(virtualParticipant.data[0].createdAt).getTime() +
                contestDuration
            )
          );          
        } else {
          setstartTime(startDateTime);
          setendTime(new Date(startDateTime.getTime() + contestDuration));
        }
        console.log("route endtime", endTime);
      }
    } catch (error) {
      console.error("Error fetching contest details", error);
    }
  };
  useEffect(() => {
    fetchContestDetails();
  }, [id]);

  return (
    <LayoutMain
      left={
        <>
          <ContestTab
            activeTab={activeComponent}
            click={(tab) => {
              setActiveComponent(tab);
              if (tab == "Details") isPreview? navigate(`/contests/${id}/preview`) : navigate(`/contests/${id}`);
              else if (tab == "Leaderboard")
              isPreview? navigate(`/contests/${id}/leaderboard/preview`) : navigate(`/contests/${id}/leaderboard`);
              else if (tab == "Submissions")
              isPreview? navigate(`/contests/${id}/${username}/preview`) : navigate(`/contests/${id}/${username}`);
              else if (tab == "Editorial")
              isPreview? navigate(`/contests/${id}/editorial/preview`) : navigate(`/contests/${id}/editorial`);
            }}
            tabs={
              endTime?.getTime() < Date.now()
                ? ["Details", "Leaderboard", "Submissions", "Editorial"]
                : ["Details", "Leaderboard", "Submissions"]
            }
          />
        </>
      }
      right={
        <div className="flex flex-col gap-5 w-full">
          {isPreview ? (
            <div>
              <div />
            </div>
          ) : (
            <div>
              {startTime !== null && endTime !== null ? (
                new Date().getTime() < startTime ? (
                  <>
                    <ExpiredNotice msg="Contest starts in" />
                    <CountdownTimer targetDate={startTime} flag={"start"} />
                  </>
                ) : (
                  <CountdownTimer targetDate={endTime} flag={"end"} />
                )
              ) : (
                <div />
              )}
            </div>
          )}
      
          <div className="w-full">
            {new Date().getTime() >= startTime && (
              <ContestProblemList preview={isPreview} />
            )}
          </div>
        </div>
      }
      
      
    >
      <Outlet />
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

const User = () => {
  const { type } = useContext(GlobalContext);
  return type == 0 ? (
    <Layout2 nav={<SolverNavbar />}>
      <Outlet />
    </Layout2>
  ) : type == 1 ? (
    <Layout2 nav={<SetterNavbar />}>
      <Outlet />
    </Layout2>
  ) : type == 2 ? (
    <Layout2 nav={<AdminNavbar />}>
      <Outlet />
    </Layout2>
  ) : (
    <></>
  );
};

const Public = () => {
  return localStorage.hasOwnProperty("token") ? (
    <Navigate
      to={
        localStorage.getItem("type") == 0
          ? "/home"
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
                <Article />
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
            path="/setter/home"
            element={
              <LayoutMain>
                <SetterHome />
              </LayoutMain>
            }
          />
          <Route
            path="/setter/articles"
            element={
              <LayoutMain>
                <SetterArticles />
              </LayoutMain>
            }
          />
          <Route
            path="/setter/articles/:id/edit"
            element={
              <LayoutMain>
                <SetterArticleEditor />
              </LayoutMain>
            }
          />
          <Route
            path="/setter/articles/:id"
            element={
              <LayoutMain>
                <Article />
              </LayoutMain>
            }
          />
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
          <Route element={<ContestWrapper />}>
          {/* <Route path="/contests/:id/preview" element={<UserContestDetails preview/>} /> */}
            <Route path="/contests/:id" element={<UserContestDetails />} />
            {/* <Route
              path="/contests/:id/problems/:problemid/preview"
              element={<UserContest preview/>}
            /> */}
            <Route
              path="/contests/:id/problems/:problemid"
              element={<UserContest />}
            />
            {/* <Route
              path="/contests/:id/editorial/preview"
              element={<EditorialPreview />}
            /> */}
            <Route
              path="/contests/:id/editorial"
              element={<EditorialPreview />}
            />
            {/* <Route
              path="/contests/:id/problems/:problemId/submissions/preview"
              element={<ContestSubmissions />}
            /> */}
            <Route
              path="/contests/:id/problems/:problemId/submissions"
              element={<ContestSubmissions />}
            />
            {/* <Route
              path="/contests/:id/:username/preview"
              element={<ContestParticipant />}
            /> */}
            <Route
              path="/contests/:id/:username"
              element={<ContestParticipant />}
            />
            {/* <Route path="/contests/:id/leaderboard/preview" element={<Leaderboard preview/>} /> */}
            <Route path="/contests/:id/leaderboard" element={<Leaderboard />} />
          </Route>

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
            path="/home"
            element={
              <div className="min-h-screen w-full p-5 pb-5 pt-0 md:w-4/5 md:p-5 md:pt-20 lg:mx-auto lg:w-5/6">
                <UserHome />
              </div>
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

        <Route element={<User />}>
          <Route path="/user/:username" element={<SolverProfile />} />
          <Route path="/setter/:username" element={<ProfileForSetter />} />
          <Route element={<ContestWrapper />}>
            <Route path="/contests/:id/preview" element={<UserContestDetails preview/>} />              
              <Route
                path="/contests/:id/problems/:problemid/preview"
                element={<UserContest preview/>}
              />              
              <Route
                path="/contests/:id/editorial/preview"
                element={<EditorialPreview />}
              />              
              <Route
                path="/contests/:id/problems/:problemId/submissions/preview"
                element={<ContestSubmissions />}
              />              
              <Route
                path="/contests/:id/:username/preview"
                element={<ContestParticipant />}
              />
              <Route path="/contests/:id/leaderboard/preview" element={<Leaderboard  preview/>} />
          </Route>
        </Route>
        {type >= 0 && (
          <Route
            path="/"
            element={
              <Navigate
                replace
                to={
                  type == 0
                    ? "/home"
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
