import { problemApi } from "api";
import RecentProblems from "./RecentProblems";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import { userActivityApi, recommendationApi, contestApi } from "../../api";
import RecommendationCard from "components/Cards/RecommendationCard";
import Title from "../../components/Title";
import TableContainer from "../../containers/TableContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PersonIcon from "@mui/icons-material/Person";
import {
  faCheckDouble,
  faCheckToSlot,
  faFire,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ApexCharts from "react-apexcharts";
import CardContainer from "containers/CardContainer2";
import ProfileRecentFails from "./Profile/ProfileRecentFails";
import HomeRecentFails from "./HomeRecentFails";
import { Pie } from "react-chartjs-2";
import { DonutLarge } from "@mui/icons-material";

const PieChart = ({ topicStats }) => {
  const [chart, setChart] = useState(undefined);

  //for barChartData, calculate total success count and fail count

  //draw a pie chart
  useEffect(() => {
    // let totalSuccessCount = 0;
    // let totalFailCount = 0;
    // const barChartData
    // barChartData.forEach((series) => {
    //   totalSuccessCount += series.successCount;
    //   totalFailCount += series.failCount;
    // });
    setChart({
      series: topicStats.map((topic) => parseInt(topic.total_solved_problems)),
      options: {
        chart: {
          type: "donut",
          height: "400",
        },
        states: {
          active: {
            filter: {
              type: "none" /* none, lighten, darken */,
            },
          },
          hover: {
            filter: {
              type: "lighten",
              value: 0.0001,
            },
          },
        },
        plotOptions: {
          donut: {
            dataLabels: {
              offset: -20,
            },
          },
        },
        labels: topicStats.map((topic) => topic.name),
        colors: ["#e62092", "#ea7202", "#1472ea", "#fbab05"],
        dataLabels: {
          position: "top",
          offset: -40, // Adjust this value as needed
          style: {
            colors: ["#ffffff"], // Add this line. This will make the labels dark black.
            offset: -40, // Adjust this value as needed
            fontSize: "13px",
            shadow: false,
          },
        },
        stroke: {
          width: 0, // Add this line. This will remove the border.
        },
        legend: {
          position: "bottom", // or 'top', 'left', 'right'
        },
        // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 200,
        //       },
        //       legend: {
        //         position: "bottom",
        //       },
        //     },
        //   },
        // ],
      },
    });
  }, [topicStats]);
  //return the pie chart
  return (
    <div className="h-full p-3">
      {chart !== undefined && (
        <ApexCharts
          options={chart.options}
          series={chart.series}
          type="donut"
          height="400"
        />
      )}
    </div>
  );
};

export default function UserHome() {
  const [problems, setProblems] = useState([]);
  const [recomType, setRecomType] = useState("rating-burner");
  const [topicStats, setTopicStats] = useState([]);
  const [runningContests, setRunningContests] = useState([]);
  const tags = ["rating-burner", "series-hunter"];
  const navigate = useNavigate();
  

  const getRecommendedProblems = async () => {
    if (recomType === "series-hunter") {
      const res = await recommendationApi.getRecommendationbySeries();
      if (res.success) {
        console.log("series-hunter recommend", res);
        setProblems(res.data);
        setLoading(false);
      }
    } else if (recomType == "rating-burner") {
      const res = await recommendationApi.getRecommendationByRating();
      if (res.success) {
        console.log("rating-burner recommend", res);
        setProblems(res.data);
        setLoading(false);
      }
    }
  };
  const getSolveCountByTopic = async () => {
    const res = await userActivityApi.totalSolvedProblemCount();
    if (res.success) {
      console.log("topic stats", res);
      setTopicStats(res.data);
      //setLoading(false);
    }
  };
  const getRunningContests = async () => {
    const res = await contestApi.getRunningContests();
    if (res.success) {
      console.log("running contests", res);
      setRunningContests(res.data);
      //setLoading(false);
    }
  };

  useEffect(() => {
    getRecommendedProblems();
    getSolveCountByTopic();
    getRunningContests();
  }, []);
  useEffect(() => {
    getRecommendedProblems();
  }, [recomType]);

  return (
    <div className="flex flex-row justify-center gap-8">
      <div className="w-3/4">
        {
          <div className="flex flex-col w-full">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <Title
                  title={"Our Recommendation"}
                  sub_title={
                    recomType === "series-hunter"
                      ? "The best problems from your favorite series"
                      : "The best problems at your level"
                  }
                />
                <div className="flex flex-row mt-1 w-[50%] items-center gap-3">
                  {tags.map((tag, index) => (
                    <div className="mt-3">
                      <button
                        key={index}
                        className="bg-white hover:bg-blue-100 text-red-800 font-dark px-4 py-1 pt-2 pb-2 rounded-full shadow-md text-large transition duration-300 ease-in-out"
                        onClick={() => setRecomType(tag)}
                      >
                        {tag}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {problems.length > 0 && (
              <div className="flex flex-col gap-5 w-full">
                {/* <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
                  <div className="text-xl w-[45%] font-medium">Name</div>
                  <div className="text-xl w-[20%] font-medium flex gap-2 items-center justify-center">
                    <HowToRegIcon />
                    Acceptance
                  </div>
                  <div className="text-xl w-20% font-medium flex gap-2 items-center justify-center">
                    <FontAwesomeIcon icon={faFire} />
                    Difficulty
                  </div>
                  <div className="text-xl w-15% font-medium flex gap-2 items-center justify-center">
                    <FontAwesomeIcon icon={faHeartPulse} />
                    Status
                  </div>
                </div> */}
                <div className="grid grid-cols-1 justify-center items-center mx-auto max-w-screen-2xl gap-8 h-full w-full mb-3 md:grid-cols-3">
                  {problems.map((problem, index) => (
                    <div className="flex w-full">
                      <RecommendationCard
                        idx={index + 1}
                        id={problem.id}
                        name={problem.title}
                        path={`/problems/${problem.id}`}
                        rating={problem.rating}
                        userCount={problem.totalUsers}
                        series={problem.seriesName}
                        topic={problem.topicName}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        }

        <HomeRecentFails />
      </div>
      <div className="flex flex-col gap-3 w-1/4 mt-10 mb-8">
        {runningContests.length > 0 &&
          runningContests.map((contest, index) => (
            <div className="flex flex-col text-white font-medium rounded-lg text-lg p-7 text-left bu-button-primary w-full mt-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] cursor-pointer"
            onClick={()=>navigate(`/contests/${contest.id}`)}>
              <div class="font-poppins font-medium text-xl leading-36 text-red-500 opacity-80">
                Currently Running
              </div>
              <div class="font-poppins font-medium text-3xl leading-54 text-black">
                {contest.title}
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="text-black">
                  <PersonIcon />
                </div>
                <div class="w-41 font-poppins font-medium text-base leading-24 text-black">
                  {contest.totalParticipants}
                </div>
              </div>
            </div>
          ))}

        <div class="bg-[#F0F0F0] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg p-5">
          <div class="w-155 font-poppins font-medium text-base leading-140 text-black">
            Problem Solving Stats
          </div>
          <PieChart topicStats={topicStats} />
        </div>
      </div>
    </div>
  );
}
