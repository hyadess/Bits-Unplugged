import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableContainer from "../containers/TableContainer";
import SubmissionCard from "../components/Cards/SubmissionCard";
import { setLoading } from "../App";
import { problemApi, submissionApi, userActivityApi } from "../api";
import Chart from "react-apexcharts";
import CardContainer from "containers/CardContainer2";
export default function ProblemsSubmissions() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  // const [submissionList, setSubmissionList] = useState([]);

  useEffect(() => {
    if (id !== undefined) {
      renderProblem();
      getAllActivity();
      // getSubmissions();
      setLoading(false);
    }
  }, []);

  const renderProblem = async () => {
    const res = await submissionApi.getAllSubmissionsByUserAndProblem(id);
    if (res.success) {
      console.log("Submissions:", res.data);
      setProblem(res.data);
    }
  };

  //submission distribution...............................

  const [distributionChartData, setDistributionChartData] = useState({
    options: {
      chart: {
        type: "histogram",
      },
      xaxis: {
        title: {
          text: "Time Taken",
        },
      },
      yaxis: {
        title: {
          text: "Total users Solved",
        },
      },
    },
    series: [
      {
        name: "Distribution",
        data: [],
      },
    ],
  });

  const getAllActivity = async () => {
    const res = await userActivityApi.successesByProblem(id);
    if (res.success) {
      console.log(res.data);

      const minTimeTaken = 0;
      const maxTimeTaken = Math.max(
        ...res.data.map((item) => item.viewDuration)
      );

      const numberOfRanges = 20;
      const rangeSize = (maxTimeTaken - minTimeTaken) / numberOfRanges;

      // Initialize an object to store the count of problems in each time range
      const timeRangeCounts = Array(numberOfRanges + 1).fill(0);

      // Process the data to count the number of problems in each time range
      res.data.forEach((item) => {
        const timeTaken = item.viewDuration;

        // Find the appropriate time range for the current item
        const rangeIndex = Math.floor((timeTaken - minTimeTaken) / rangeSize);

        // Increment the count for that time range
        if (rangeIndex >= 0 && rangeIndex < numberOfRanges + 1) {
          timeRangeCounts[rangeIndex]++;
        }
      });
      console.log(timeRangeCounts);

      // Format the data for ApexCharts
      const formattedData = timeRangeCounts.map((count, index) => ({
        x: minTimeTaken + index * rangeSize,
        y: count,
      }));

      setDistributionChartData({
        options: {
          chart: {
            type: "bar",
            height: 300,
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            title: {
              text: "Time Taken",
            },
          },
          grid: {
            show: false,
          },
          dataLabels: {
            show: false,
          },
          yaxis: {
            title: {
              text: "Total users Solved",
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "100%",
              endingShape: "rounded",
            },
          },
          tooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: true,
            followCursor: false,
            intersect: false,
            inverseOrder: false,
            custom: undefined,
            hideEmptySeries: true,
            fillSeriesColor: false,
            theme: "dark",
            onDatasetHover: {
              highlightDataSeries: false,
            },
            x: {
              show: false,
              format: "dd MMM",
              formatter: function (val) {
                return val + " seconds";
              },
            },
            y: {
              formatter: function (val) {
                return val + " submissions";
              },
            },
            style: {
              fontSize: "12px",
              colors: ["#000000"], // Add this line
            },
            marker: {
              show: true,
            },
            items: {
              display: "flex",
            },
            fixed: {
              enabled: false,
              position: "topRight",
              offsetX: 0,
              offsetY: 0,
            },
          },
          colors: ["#aadfcf", "#ef9c9c"],
        },
        series: [{ data: formattedData }],
      });
    }
  };

  // const getSubmissions = async () => {
  //   const res = await submissionApi.getAllSubmissionsByUserAndProblem(id);
  //   if (res.success) {
  //     setProblem(res.data);
  //   }
  // };

  return (
    problem && (
      <>
        <div className="flex flex-col py-4 max-w-screen-xl sm:pt-12 gap-3">
          <div className="mt-4 md:mt-0">
            <h2 className="text-left text-5xl tracking-tight font-extrabold ">
              <span className="bu-text-title">{problem.title}</span>
            </h2>
          </div>
          <span className="bu-text-subtitle text-xl">
            {problem && problem.series.topic.name + " > " + problem.series.name}
          </span>
        </div>
        {distributionChartData.series[0].data.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-2xl font-bold text-gray-500">
              No submissions yet
            </div>
          </div>
        ) : (
          <Chart
            options={distributionChartData.options}
            series={distributionChartData.series}
            type="bar"
            height={300}
          />
        )}

        <CardContainer>
          {problem.submissions.map((submission, index) => (
            <SubmissionCard
              idx={index + 1}
              submissionId={submission.id}
              verdict={submission.verdict}
              problem_name={problem.title}
              path={`/problems/${problem.id}`}
              timestamp={submission.createdAt}
              image={submission.image}
              activity={submission.userActivity}
            />
          ))}
        </CardContainer>
      </>
    )
  );
}
