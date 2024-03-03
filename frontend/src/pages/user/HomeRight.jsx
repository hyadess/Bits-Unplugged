import { problemApi } from "api";
import RecentProblems from "./RecentProblems";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import { userActivityApi, recommendationApi } from "../../api";
import RecommendationCard from "components/Cards/RecommendationCard";
import Title from "../../components/Title";
import TableContainer from "../../containers/TableContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApexCharts from "react-apexcharts";
import { Pie } from "react-chartjs-2";

const PieChart = ({ topicStats }) => {
  const [chart, setChart] = useState(undefined);

  //for barChartData, calculate total success count and fail count

  //draw a pie chart
  useEffect(() => {
    setChart({
      series: topicStats.map((topic) => parseInt(topic.total_solved_problems)),
      options: {
        chart: {
          type: "pie",
          height: "100%",
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
          pie: {
            dataLabels: {
              enabled: false,
              offset: -20,
            },
          },
        },
        labels: topicStats.map((topic) => topic.name),
        //colors: ["#ef9c9c", "#96cdbf"],
        // dataLabels: {
        //   position: "top",
        //   offset: -50, // Adjust this value as needed
        //   style: {
        //     // colors: ["#222222", "#222222"], // Add this line. This will make the labels dark black.
        //     offset: -50, // Adjust this value as needed
        //     fontSize: "20px",
        //     shadow: false,
        //   },
        // },
        stroke: {
          width: 0, // Add this line. This will remove the border.
        },
        legend: {
          position: "top", // or 'top', 'left', 'right'
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    });
  }, [topicStats]);
  //return the pie chart
  return (
    <div className="bu-card-primary rounded-lg shadow-md h-[20rem] relative">
      <h2 className="bu-text-primary py-2 px-5 font-semibold">
        topicwise solve count
      </h2>

      <div className="h-full">
        {chart !== undefined && topicStats.length > 0 && (
          <ApexCharts
            options={chart.options}
            series={chart.series}
            type="pie"
            height="85%"
          />
        )}
      </div>

      {chart === undefined ||
        (topicStats.length == 0 && (
          <div className="absolute top-0 left-0 h-full w-full">
            <div className="flex justify-center items-center h-full text-gray-300 dark:text-slate-600 text-3xl font-semibold">
              No data available
            </div>
          </div>
        ))}
    </div>
  );
};

export default function HomeRight() {
  const [topicStats, setTopicStats] = useState([]);

  const getSolveCountByTopic = async () => {
    const res = await userActivityApi.totalSolvedProblemCount();
    if (res.success) {
      console.log("topic stats", res);
      setTopicStats(res.data);
      //setLoading(false);
    }
  };

  useEffect(() => {
    //setLoading(true);
    getSolveCountByTopic();
  }, []);

  return (
    <div className="pt-10">
      <PieChart topicStats={topicStats} />
    </div>
  );
}
