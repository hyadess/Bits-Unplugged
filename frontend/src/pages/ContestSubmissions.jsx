import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableContainer from "../containers/TableContainer";
import SubmissionCard from "../components/Cards/SubmissionCard";
import { setLoading } from "../App";
import { problemApi, submissionApi, userActivityApi, contestApi } from "../api";
import Chart from "react-apexcharts";
import CardContainer from "containers/CardContainer2";
import { ScissorsSquareDashedBottomIcon } from "lucide-react";
export default function ContestSubmissions() {
  const { id, problemId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [successfulSubmissions, setSuccessfulSubmissions] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      getSubmissions();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllActivity();
  }, [successfulSubmissions]);

  const getSubmissions = async () => {
    const res = await contestApi.getAllSubmissionsByContestAndProblem(
      id,
      problemId
    );
    if (res.success) {
      console.log("Submissions:", res.data);
      setSubmissions(res.data);
      setSuccessfulSubmissions(
        res.data.filter((submission) => submission.verdict === "Accepted")
      );
    }
  };

  //submission distribution...............................

  const [distributionChartData, setDistributionChartData] = useState({
    options: {
      chart: {
        type: "histogram",
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
    const result = await contestApi.isContestProblemSolved(id, problemId);
    let myDuration = -1; // Replace with the actual duration
    if (result.success && result.data.length > 0) {
      setIsSolved(result.data[0].isSolved);
      //if (!result.data[0].isSolved) return;
      myDuration = result.data[0].duration;
    }

    if (successfulSubmissions.length > 0) {
      const minTimeTaken = 1;
      let maxTimeTaken = Math.max(
        ...successfulSubmissions.map((item) => item.duration)
      );
      maxTimeTaken = Math.max(maxTimeTaken, 50);
      // maxTimeTaken = Math.ceil(maxTimeTaken / 10) * 10;
      const numberOfRanges = 21;
      const rangeSize = (maxTimeTaken + 1 - minTimeTaken) / numberOfRanges;

      // Initialize an object to store the count of problems in each time range
      const timeRangeCounts = Array(numberOfRanges).fill(0);

      // Process the data to count the number of problems in each time range
      successfulSubmissions.forEach((item) => {
        const timeTaken = Math.max(item.duration, 1);
        // Find the appropriate time range for the current item
        const rangeIndex = Math.floor((timeTaken - minTimeTaken) / rangeSize);

        // Increment the count for that time range
        if (rangeIndex >= 0 && rangeIndex < numberOfRanges) {
          timeRangeCounts[rangeIndex]++;
        }
      });
      console.log(timeRangeCounts);
      const sum = timeRangeCounts.reduce((a, b) => a + b, 0);
      // Format the data for ApexCharts
      const formattedData = timeRangeCounts.map((count, index) => ({
        x: minTimeTaken + index * rangeSize + rangeSize / 2,
        y: parseFloat(((count * 100) / sum).toFixed(2)),
      }));
      const colors = timeRangeCounts.map((count, index) => {
        const rangeIndex =
          myDuration == -1
            ? -1
            : Math.floor((myDuration - minTimeTaken) / rangeSize);
        return index === rangeIndex ? "#ef9c9c" : "#aadfcf";
      }); // Replace '#FFFFFF' with your chart's background color
      const strokeColors = timeRangeCounts.map((count, index) => {
        const rangeIndex =
          myDuration == -1
            ? -1
            : Math.floor((myDuration - minTimeTaken) / rangeSize);
        return index === rangeIndex ? "#ff8c8c" : false ? "#ebebeb" : "#84cfb8";
      });
      console.log(
        "Range:",
        colors.length,
        strokeColors.length,
        formattedData.length
      );
      const yMax =
        Math.ceil(
          Math.max((Math.max(...timeRangeCounts) * 100) / sum, 10) / 5
        ) * 5;
      setDistributionChartData({
        options: {
          states: {
            active: {
              filter: {
                type: "none" /* none, lighten, darken */,
              },
            },
            hover: {
              filter: {
                type: "none",
                value: 0.0001,
              },
            },
          },
          annotations: {
            //show: myDuration === -1 ? false : true,
            xaxis: [
              {
                x: myDuration == -1 ? -10 : myDuration,
                strokeDashArray: 0,
                borderColor: "#1c5b5f",
                borderWidth: 2,
                label: {
                  orientation: "horizontal", // Add this line
                  borderColor: "#1c5b5f",
                  borderWidth: 2,
                  style: {
                    color: "#000",
                    background: "#84cfb8",
                    fontSize: "18px",
                    fontWeight: 600,
                  },
                  text: "Your time (" + myDuration + "s)",
                },
              },
            ],
          },
          chart: {
            type: "histogram",
            // height: 300,
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          xaxis: {
            title: {
              text: "Time Taken (seconds)",
              style: {
                fontSize: "20px", // Replace with your desired font size
                fontWeight: 600, // Replace with your desired font weight
                fontFamily: "Arial", // Replace with your desired font family
              },
            },
            tickAmount: numberOfRanges / 2,
            // categories: Array.from(
            //   { length: 10 },
            //   (_, i) => `${i * 10}-${(i + 1) * 10}`
            // ),
            labels: {
              // formatter: function (value) {
              //   return Math.floor(value + rangeSize / 2);
              // },
              style: {
                colors: [],
                // fontSize: "0.8rem",
              },
              // rotate: -45,
              // rotateAlways: true,
              // tickPlacement: "on",
            },
            crosshairs: {
              show: false, // <--- HERE
            },
            // min: 1,
            // max: maxTimeTaken,
          },
          grid: {
            borderColor: "#cccccc",
            show: true,
            yaxis: {
              lines: {
                show: true,
              },
            },
            xaxis: {
              lines: {
                show: true,
              },
            },
            row: {
              colors: undefined,
              opacity: 0.5,
            },
            column: {
              colors: undefined,
              opacity: 0.5,
            },
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
          dataLabels: {
            enabled: false, // Disable data labels
          },
          stroke: {
            show: true,
            width: 2, // This is the border width
            colors: strokeColors,
          },
          yaxis: {
            title: {
              text: "Users (%)",
              style: {
                fontSize: "20px", // Replace with your desired font size
                fontWeight: 600, // Replace with your desired font weight
                fontFamily: "Arial", // Replace with your desired font family
              },
            },
            // tickAmount: 4,
            min: 0,
            max: 1.25 * yMax,
            labels: {
              formatter: function (value) {
                return Math.floor(value);
              },
            },
          },
          plotOptions: {
            bar: {
              distributed: true, // this line is mandatory
              horizontal: false,
              columnWidth: "95%",
              endingShape: "rounded",
              borderRadius: 5,
            },
          },
          tooltip: {
            enabled: false,
            enabledOnSeries: true,
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
            style: {
              fontSize: "12px",
              // colors: ["#000000"], // Add this line
            },
            y: {
              formatter: function (val) {
                return val + " %";
              },
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
          fill: {
            colors: colors,
          },
          legend: {
            show: false, // This line hides the legend
          },
        },
        series: [{ name: "Users", data: formattedData }],
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
    submissions && (
      <div className="flex flex-col gap-8">
        {/* <div className="flex flex-col py-4 max-w-screen-xl sm:pt-12 gap-3">
          <div className="mt-4 md:mt-0">
            <h2 className="text-left text-5xl tracking-tight font-extrabold ">
              <span className="bu-text-title">{problem.title}</span>
            </h2>
          </div>
          <span className="bu-text-subtitle text-xl">
            {problem && problem.series.topic.name + " > " + problem.series.name}
          </span>
        </div> */}
        {/* {distributionChartData.series[0].data.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-5xl font-bold bu-text-disable">
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
        )} */}
        {/* Show only if user has successful submission */}

        <div className="bu-card-primary pr-5 pl-3 pt-3 mt-10 rounded-lg shadow-md">
          <Chart
            options={distributionChartData.options}
            series={distributionChartData.series}
            type="bar"
            height={300}
          />
        </div>

        {/* <div className="relative">
          <Chart
            options={distributionChartData.options}
            series={distributionChartData.series}
            type="bar"
            height={300}
          />
          {distributionChartData.series[0].data.length === 0 && (
            <div className="flex justify-center items-center h-64 w-full absolute top-0">
              <div className="text-5xl font-bold bu-text-disable">
                No success yet
              </div>
            </div>
          )}
        </div> */}

        <CardContainer>
          {submissions.map((submission, index) => (
            <SubmissionCard
              idx={index + 1}
              submissionId={submission.id}
              verdict={submission.verdict}
              problem_name={submission.username}
              // path={`/problems/${problem.id}`}
              timestamp={submission.createdAt}
              image={submission.image}
              activity={submission.userActivity}
            />
          ))}
        </CardContainer>
      </div>
    )
  );
}
