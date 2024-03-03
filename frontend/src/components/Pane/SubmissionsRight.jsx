import React, { useState, useEffect, useContext } from "react";
import { setLoading } from "App";
import { submissionApi, userActivityApi } from "api";
import ApexCharts from "react-apexcharts";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
const PieChart = ({ barChartData }) => {
  const [chart, setChart] = useState(undefined);

  //for barChartData, calculate total success count and fail count

  //draw a pie chart
  useEffect(() => {
    let totalSuccessCount = 0;
    let totalFailCount = 0;
    barChartData.forEach((series) => {
      totalSuccessCount += series.successCount;
      totalFailCount += series.failCount;
    });
    setChart({
      series: [totalFailCount, totalSuccessCount],
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
              offset: -20,
            },
          },
        },
        labels: ["Fail", "Success"],
        colors: ["#ef9c9c", "#96cdbf"],
        dataLabels: {
          position: "top",
          offset: -50, // Adjust this value as needed
          style: {
            // colors: ["#222222", "#222222"], // Add this line. This will make the labels dark black.
            offset: -50, // Adjust this value as needed
            fontSize: "20px",
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
  }, [barChartData]);
  //return the pie chart
  return (
    <div className="bu-card-primary rounded-lg shadow-md h-[20rem] relative">
      <h2 className="bu-text-primary py-2 px-5 font-semibold">
        Success and fail distribution
      </h2>
      <Divider />
      <div className="h-full p-3">
        {chart !== undefined && barChartData.length > 0 && (
          <ApexCharts
            options={chart.options}
            series={chart.series}
            type="pie"
            height="85%"
          />
        )}
      </div>

      {chart === undefined ||
        (barChartData.length == 0 && (
          <div className="absolute top-0 left-0 h-full w-full">
            <div className="flex justify-center items-center h-full text-gray-300 dark:text-slate-600 text-3xl font-semibold">
              No data available
            </div>
          </div>
        ))}
    </div>
  );
};

export default function SubmissionsRight() {
  const [barChartData, setBarChartData] = useState([]);
  let { username } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const calculateSeriesStats = () => {
    const seriesStats = [];

    submissions.forEach((submission) => {
      const { seriesId, name, problemId, title, verdict } = submission;

      if (!seriesStats[seriesId]) {
        seriesStats[seriesId] = {
          id: seriesId,
          name: name,
          successCount: 0,
          failCount: 0,
          uniqueAcceptedProblems: new Set(),
        };
      }

      const series = seriesStats[seriesId];

      if (
        verdict === "Accepted" &&
        !series.uniqueAcceptedProblems.has(problemId)
      ) {
        series.successCount++;
        series.uniqueAcceptedProblems.add(problemId);
      } else if (verdict === "Wrong answer") {
        series.failCount++;
      }
    });

    //console.log(Object.values(seriesStats));
    setBarChartData(Object.values(seriesStats));
    setLoading(false);
  };

  const getSubmissions = async () => {
    console.log("getSubmissions", username);
    const res = await submissionApi.getAllSubmissionsByUser(username);
    if (res.success) {
      setSubmissions(res.data);
    }
  };

  useEffect(() => {
    getSubmissions();
  }, [username]);

  useEffect(() => {
    calculateSeriesStats();
  }, [submissions]);

  return <PieChart barChartData={barChartData} />;
}
