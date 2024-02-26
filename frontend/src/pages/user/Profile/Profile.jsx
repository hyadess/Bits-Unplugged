import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../../components/Title";
import { setLoading } from "../../../App";
import { submissionApi, userActivityApi } from "../../../api";
import { Tooltip } from "react-tooltip";
import ApexCharts from "react-apexcharts";
import Chart from "react-apexcharts";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./heatmap.scss";
import ProfileRecentFails from "./ProfileRecentFails";
import ProfileInfo from "./ProfileInfo";
import { set } from "date-fns";
import { Divider } from "@mui/material";

// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.uplabs.com%2Fposts%2Ffatou-dashboard-design-applicant-profile-page-design-in-xd&psig=AOvVaw3GwoLsJspGKr0w1icxfd95&ust=1708193790479000&source=images&cd=vfe&opi=89978449&ved=0CBUQjhxqFwoTCOjQ1_K7sIQDFQAAAAAdAAAAABAY
// https://www.google.com/url?sa=i&url=https%3A%2F%2Fuxplanet.org%2F50-free-profile-page-design-samples-templates-psd-sketch-for-inspiration-2f939aaee66b&psig=AOvVaw3GwoLsJspGKr0w1icxfd95&ust=1708193790479000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOjQ1_K7sIQDFQAAAAAdAAAAABA5

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
          position: "right", // or 'top', 'left', 'right'
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
      <div className="absolute top-0 left-0 h-full w-full">
        {chart === undefined ||
          (barChartData.length == 0 && (
            <div className="flex justify-center items-center h-full text-gray-300 dark:text-slate-600 text-3xl font-semibold">
              No data available
            </div>
          ))}
      </div>
    </div>
  );
};

const BarChart = ({ barChartData }) => {
  // console.log(props.attempted);
  const [chart, setChart] = useState(undefined);

  useEffect(() => {
    const sortedSeries = barChartData.sort(
      (a, b) => b.successCount + b.failCount - (a.successCount + a.failCount)
    );

    // Extract top 5 series
    const top5Series = sortedSeries.slice(0, 5);

    // Create lists for series names, success counts, and fail counts
    const seriesNames = top5Series.map((series) => series.name);
    //console.log("series names",seriesNames);
    const successCounts = top5Series.map((series) => series.successCount);
    const failCounts = top5Series.map((series) => series.failCount);
    while (seriesNames.length < 5) {
      seriesNames.push("");
      successCounts.push(0);
      failCounts.push(0);
    }
    // console.log("Triggered");
    setChart({
      series: [
        {
          name: "wrong submissions",
          data: failCounts,
        },
        {
          name: "success",
          data: successCounts,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 300,
          toolbar: {
            show: false,
          },
        },
        legend: {
          position: "top", // or 'top', 'left', 'right'
        },
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
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        grid: {
          show: false,
        },
        dataLabels: {
          show: true,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["transparent"],
        },
        xaxis: {
          categories: seriesNames,
          labels: {
            style: {
              colors: [],
              fontSize: "0.8rem",
            },
            rotate: 10,
            offsetY: 20,
            offsetX: 22,
            rotateAlways: true,
            tickPlacement: "on",
            // tickAmount: top5Series.length + 2,
          },
        },
        axisTicks: {
          show: true,
          borderType: "solid",
          color: "#000000",
          height: 6,
          offsetX: 0,
          offsetY: 0,
        },
        yaxis: {
          title: {
            text: "Number of problems",
            style: {
              color: undefined,
              fontSize: "0.9rem",
              fontWeight: "1px",
            },
          },
          labels: {
            formatter: function (val) {
              return val.toFixed(0);
            },
          },
        },
        fill: {
          opacity: 1,
        },

        tooltip: {
          enabled: false,
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
          y: {
            formatter: function (val) {
              return val + " problems";
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
        colors: ["#ef9c9c", "#96cdbf"],
      },
    });
  }, [barChartData]);
  //console.log(chart);
  return (
    <div className="bu-card-primary rounded-lg shadow-md h-[20rem] relative">
      <h2 className="bu-text-primary py-2 px-5 font-semibold">
        Top 5 favourite series
      </h2>
      <Divider />
      <div className="h-full p-3 pl-2 pb-0">
        {chart !== undefined && barChartData.length > 0 && (
          <ApexCharts
            options={chart.options}
            series={chart.series}
            type="bar"
            height="85%"
          />
        )}
      </div>
      <div className="absolute top-0 left-0 h-full w-full">
        {chart === undefined ||
          (barChartData.length == 0 && (
            <div className="flex justify-center items-center h-full text-gray-300 dark:text-slate-600 text-3xl font-semibold">
              No data available
            </div>
          ))}
      </div>
    </div>
  );
};

const Heatmap = ({ submissions }) => {
  const [heatmapData, setHeatmapData] = useState([]);

  const transformHeatmapData = () => {
    const data = [];

    // Iterate through each submission
    submissions.forEach((submission) => {
      //console.log(1);
      //console.log(submission);
      const submissionDate = new Date(submission.createdAt);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth();
      const day = submissionDate.getDate();

      // Find existing data entry for the date
      const existingEntry = data.find(
        (entry) => entry.date.getDate() === submissionDate.getDate()
      );

      // If entry exists, increment the count
      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        // If entry doesn't exist, create a new entry
        data.push({
          date: new Date(year, month, day),
          count: 1,
        });
      }
      //console.log(existingEntry);
    });
    //console.log(data);

    setHeatmapData(data);
  };

  useEffect(() => {
    transformHeatmapData();
  }, [submissions]);

  return (
    <div className="bu-card-primary p-5 rounded-lg shadow-md">
      <CalendarHeatmap
        startDate={
          new Date(new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000)
        }
        endDate={new Date()}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-scale-${Math.min(value.count, 11)}`;
        }}
        tooltipDataAttrs={(value) => {
          if (value) {
            return {
              "data-tooltip": `has count: ${value.count}`,
            };
          } else {
            return {
              "data-tooltip": "has count: 0",
            };
          }
        }}
        gutterSize={2} // Adjust the spacing between months
        gutterPx={5} // Adjust the pixel size of the gutter
      />
    </div>
  );
};

const SolveTimeGraph = () => {
  let { username } = useParams();
  // const [visible, setVisible] = useState(false);
  const [distributionChartData, setDistributionChartData] = useState({
    options: {
      chart: {
        id: "solve-time-chart",
        type: "bar",
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
          text: "Total Problems Solved",
        },
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ["#000000"],
        },
      },
      marker: {
        colors: ["#000000"],
        fillColors: ["#000000"],
      },
      fill: {
        colors: ["#96cdbf"],
      },
      tooltip: {
        enabled: false,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: "dark",
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
        x: {
          show: true,
          format: "dd MMM",
          formatter: undefined,
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName) => seriesName,
          },
        },
        z: {
          formatter: undefined,
          title: "Size: ",
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
    },
    series: [
      {
        name: "Distribution",
        data: [],
      },
    ],
  });

  const getAllSusccessDuration = async () => {
    const res = await userActivityApi.successesByUser(username);
    if (res.success && res.data.length > 0) {
      const minTimeTaken = 0;
      const maxTimeTaken = Math.max(
        ...res.data.map((item) => item.viewDuration)
      );

      const numberOfRanges = 10;
      const rangeSize = (maxTimeTaken - minTimeTaken) / numberOfRanges;

      const timeRanges = Array.from({ length: numberOfRanges }, (_, index) => {
        const min = minTimeTaken + index * rangeSize;
        const max = min + rangeSize;
        return { min, max };
      });

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
        x:
          (minTimeTaken +
            index * rangeSize +
            minTimeTaken +
            (index + 1) * rangeSize) /
          2,
        y: count,
      }));

      setDistributionChartData({
        ...distributionChartData,
        series: [{ data: formattedData }],
      });
    }
  };
  useEffect(() => {
    getAllSusccessDuration();
  }, []);
  return (
    <div className="bu-card-primary rounded-lg shadow-md h-[20rem] relative">
      <h2 className="bu-text-primary py-2 px-5 font-semibold">
        Distribution of time taken to solve problems
      </h2>
      <Divider />
      <div className="h-full p-3 pl-2 pb-0">
        {distributionChartData.series[0].data.length > 0 && (
          <Chart
            options={distributionChartData.options}
            series={distributionChartData.series}
            type="bar"
            height="85%"
            width="100%"
          />
        )}
      </div>
      <div className="absolute top-0 left-0 h-full w-full">
        {distributionChartData.series[0].data.length === 0 && (
          <div className="flex justify-center items-center h-full text-gray-300 dark:text-slate-600 text-3xl font-semibold">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

const ActivityGraph = () => {
  let { username } = useParams();

  const [activityChartData, setActivityChartData] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      id: "daily-activity-chart",
      type: "area",
      // height: 400,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    // title: {
    //   text: "Activity Time",
    //   align: "left",
    //   margin: 10,
    //   offsetX: 0,
    //   offsetY: 0,
    //   floating: false,
    //   style: {
    //     fontSize: "14px",
    //     fontWeight: "bold",
    //     fontFamily: undefined,
    //     color: "#263238",
    //   },
    // },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
    },
    yaxis: {
      title: {
        text: "Time (seconds)",
        style: {
          fontSize: "0.9rem", // Replace with your desired font size
          fontWeight: 600, // Replace with your desired font weight
          fontFamily: "Arial", // Replace with your desired font family
        },
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3, // border
    },
    markers: {
      size: activityChartData.length === 1 ? 5 : 0,
      colors: ["#aadfcf"],
      strokeColor: "#96cdbf",
      strokeWidth: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.6,
        opacityFrom: 0.9,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    tooltip: {
      enabled: false,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      hideEmptySeries: true,
      fillSeriesColor: false,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: "dd MMM",
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      z: {
        formatter: undefined,
        title: "Size: ",
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
    colors: ["#aadfcf"],
  });
  const getRecentActivity = async () => {
    const res = await userActivityApi.daywiseActivityByUser(username);
    if (res.success) {
      console.log("daywise activity");
      console.log(res.data);
      const chartData = res.data.map((entry) => ({
        x: new Date(entry.visitDate), // Convert date string to Date object
        y: entry.totalDuration,
      }));
      setActivityChartData(chartData);
    }
  };

  useEffect(() => {
    getRecentActivity();
  }, [username]);

  useEffect(() => {
    setOptions({
      chart: {
        id: "daily-activity-chart",
        type: "area",
        // height: 400,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      // annotations: {
      //   xaxis: [
      //     {
      //       x: new Date(),
      //       strokeDashArray: 0,
      //       borderColor: "#000000",
      //       borderWidth: 2,
      //       label: {
      //         orientation: "horizontal", // Add this line
      //         borderColor: "#1c5b5f",
      //         borderWidth: 2,
      //         style: {
      //           color: "#000",
      //           background: "#84cfb8",
      //           fontSize: "18px",
      //           fontWeight: 600,
      //         },
      //       },
      //     },
      //   ],
      // },
      // title: {
      //   text: "Activity Time",
      //   align: "left",
      //   margin: 10,
      //   offsetX: 0,
      //   offsetY: 0,
      //   floating: false,
      //   style: {
      //     fontSize: "14px",
      //     fontWeight: "bold",
      //     fontFamily: undefined,
      //     color: "#263238",
      //   },
      // },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm",
          },
        },
      },
      yaxis: {
        title: {
          text: "Time (seconds)",
          style: {
            fontSize: "0.9rem", // Replace with your desired font size
            fontWeight: 600, // Replace with your desired font weight
            fontFamily: "Arial", // Replace with your desired font family
          },
        },
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 0, // border
      },
      markers: {
        size: activityChartData.length === 1 ? 5 : 0,
        colors: ["#aadfcf"],
        strokeColor: "#96cdbf",
        strokeWidth: 3,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.6,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      tooltip: {
        enabled: false,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: "dark",
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
        x: {
          show: true,
          format: "dd MMM",
          formatter: undefined,
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName) => seriesName,
          },
        },
        z: {
          formatter: undefined,
          title: "Size: ",
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
      colors: ["#96cdbf"],
    });
  }, [activityChartData]);
  return (
    <div className="bu-card-primary rounded-lg shadow-md h-[20rem] relative">
      <h2 className="bu-text-primary py-2 px-5 font-semibold">
        Time spent on practice problems
      </h2>
      <Divider />
      <div className="h-full p-3 pl-2">
        {activityChartData.length > 0 && (
          <Chart
            options={options}
            series={[{ name: "Active Time", data: activityChartData }]}
            type="area"
            width="100%"
            height="85%"
          />
        )}
      </div>

      {activityChartData.length == 0 && (
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="flex justify-center items-center h-full text-gray-300 dark:text-slate-600 text-3xl font-semibold">
            No data available
          </div>
        </div>
      )}
    </div>
  );
};
export default function Profile() {
  const navigate = useNavigate();
  let { username } = useParams();
  const [submissions, setSubmissions] = useState([]);
  //const [successes, setSuccesses] = useState([]);
  //const [fails, setFails] = useState([]);

  //for heatmap.......................

  // for barchart..........................

  const [barChartData, setBarChartData] = useState([]);

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
  };

  // pie chart to show all success and fails submissisons

  const getSubmissions = async () => {
    console.log("getSubmissions", username);
    const res = await submissionApi.getAllSubmissionsByUser(username);
    if (res.success) {
      setSubmissions(res.data);
      //console.log(submissions);
      setLoading(false);
    }
  };

  //for activity stats.....................

  //submission distribution...............................

  // const getTotalSuccesses = async () => {
  //   const res = await userActivityApi.totalSolvedProblemsByUser();
  //   if (res.success) {
  //     setSuccesses(res.data);
  //     console.log(successes);

  //     //setLoading(false);
  //   }
  // };
  // const getTotalFails = async () => {
  //   const res = await userActivityApi.totalFailedProblemsByUser();
  //   if (res.success) {
  //     setFails(res.data);
  //     console.log(fails);

  //     //setLoading(false);
  //   }
  // };

  useEffect(() => {
    getSubmissions();

    //setLoading(false);
  }, [username]);
  useEffect(() => {
    calculateSeriesStats();
    //setLoading(false);
  }, [submissions]);

  return (
    <div className="flex flex-col pr-20">
      {/* <ProfileInfo /> */}
      {/*<Title title={"Profile statistics"} />*/}
      <div className="grid grid-cols-2 items-end gap-8 py-8">
        <div className="">
          {/* <Title
            title={""}
            sub_title={
              "chart shows your total successful and failed attempts accross all the topics"
            }
          /> */}
          <PieChart barChartData={barChartData} />
        </div>

        <div>
          {/* <Title
            title={""}
            sub_title={
              "Your fabourite series. Shows your total attempts accross different series"
            }
          /> */}
          <BarChart barChartData={barChartData} />
        </div>

        <div>
          {/* <Title title={""} sub_title={"Time you spent solving problems"} /> */}
          <ActivityGraph />
        </div>
        <div className="">
          {/* <Title
            title={""}
            sub_title={"Your Solve time for different problems"}
          /> */}
          <SolveTimeGraph />
        </div>
      </div>

      <div className="flex flex-row w-full items-end"></div>

      <div className="mb-6">
        <Heatmap submissions={submissions} />
      </div>

      <ProfileRecentFails />
      <Tooltip id="data-tip" />
    </div>
  );
}
