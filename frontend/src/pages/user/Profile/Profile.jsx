import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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

// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.uplabs.com%2Fposts%2Ffatou-dashboard-design-applicant-profile-page-design-in-xd&psig=AOvVaw3GwoLsJspGKr0w1icxfd95&ust=1708193790479000&source=images&cd=vfe&opi=89978449&ved=0CBUQjhxqFwoTCOjQ1_K7sIQDFQAAAAAdAAAAABAY
// https://www.google.com/url?sa=i&url=https%3A%2F%2Fuxplanet.org%2F50-free-profile-page-design-samples-templates-psd-sketch-for-inspiration-2f939aaee66b&psig=AOvVaw3GwoLsJspGKr0w1icxfd95&ust=1708193790479000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOjQ1_K7sIQDFQAAAAAdAAAAABA5
export default function Profile() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  //const [successes, setSuccesses] = useState([]);
  //const [fails, setFails] = useState([]);

  //for heatmap.......................

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

  const BarChart = () => {
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
              rotateAlways: true,
              tickPlacement: "on",
            },
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
          colors: ["#ef9c9c", "#aadfcf"],
        },
      });
    }, [barChartData]);
    //console.log(chart);
    return (
      <>
        {chart !== undefined && barChartData.length > 0 ? (
          <ApexCharts
            options={chart.options}
            series={chart.series}
            type="bar"
            height={350}
          />
        ) : (
          <> </>
        )}
      </>
    );
  };

  // pie chart to show all success and fails submissisons
  const PieChart = () => {
    const [chart, setChart] = useState(undefined);

    //for barChartData, calculate total success count and fail count
    let totalSuccessCount = 0;
    let totalFailCount = 0;
    barChartData.forEach((series) => {
      totalSuccessCount += series.successCount;
      totalFailCount += series.failCount;
    });
    //draw a pie chart
    useEffect(() => {
      setChart({
        series: [totalFailCount, totalSuccessCount],
        options: {
          chart: {
            type: "pie",
            height: 300,
          },
          labels: ["Fail", "Success"],
          colors: ["#ef9c9c", "#aadfcf"],
          dataLabels: {
            style: {
              colors: ["#222222", "#222222"], // Add this line. This will make the labels dark black.
              fontSize: "20px",
            },
          },
          stroke: {
            width: 0, // Add this line. This will remove the border.
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
    }, [barChartData]);
    //return the pie chart
    return (
      <>
        {chart !== undefined && barChartData.length > 0 ? (
          <ApexCharts
            options={chart.options}
            series={chart.series}
            type="pie"
            height={350}
          />
        ) : (
          <> </>
        )}
      </>
    );
  };

  const getSubmissions = async () => {
    const res = await submissionApi.getAllSubmissionsByUser();
    if (res.success) {
      setSubmissions(res.data);
      //console.log(submissions);

      setLoading(false);
    }
  };

  //for activity stats.....................
  const [activityChartData, setActivityChartData] = useState([]);

  const getRecentActivity = async () => {
    const res = await userActivityApi.daywiseActivityByUser();
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

  const options = {
    chart: {
      id: "daily-activity-chart",
      type: "area",
      height: 400,
      toolbar: {
        show: false,
      },
    },
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
        text: "Daily Active Time (seconds)",
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
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.7,
        opacityFrom: 0.9,
        opacityTo: 1,
        stops: [0, 100],
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
  };

  //submission distribution...............................

  const [distributionChartData, setDistributionChartData] = useState({
    options: {
      chart: {
        id: "daily-activity-chart",
        type: "histogram",
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
        enabled: false,
      },
      marker: {
        colors: ["#000000"],
        fillColors: ["#000000"],
      },
      colors: ["#aadfcf"],

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
    const res = await userActivityApi.successesByUser();
    if (res.success) {
      console.log(res.data);

      const minTimeTaken = 0;
      const maxTimeTaken = Math.max(
        ...res.data.map((item) => item.viewDuration)
      );

      const numberOfRanges = 20;
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
              text: "Total Problems Solved",
            },
          },
        },
        series: [{ data: formattedData }],
      });
    }
  };

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
    setLoading(false);
    getSubmissions();
    getRecentActivity();
    //setLoading(false);
  }, []);
  useEffect(() => {
    transformHeatmapData();
    calculateSeriesStats();
    getAllSusccessDuration();
    //setLoading(false);
  }, [submissions]);

  return (
    <div className="flex flex-col">
      <ProfileInfo />
      <Title title={"Profile statistics"} />
      <div className="mb-6 px-10 py-6">
        <Title
          title={""}
          sub_title={
            "chart shows your total successful and failed attempts accross all the topics"
          }
        />

        <PieChart />
      </div>

      <div>
        <Title
          title={""}
          sub_title={
            "Your fabourite series. Shows your total attempts accross different series"
          }
        />

        <BarChart />
      </div>

      <div className="mb-6 px-10 py-6">
        <Title title={""} sub_title={"Time you spent solving problems"} />

        <Chart
          options={options}
          series={[{ name: "Active Time", data: activityChartData }]}
          type="area"
          width="100%"
        />
      </div>

      <div>
        <Title
          title={""}
          sub_title={"Your Solve time for different problems"}
        />
        <Chart
          options={distributionChartData.options}
          series={distributionChartData.series}
          type="bar"
          height={300}
        />
      </div>

      <div className="mb-6 px-10 py-6">
        <Title title={""} sub_title={"Your activity heatmap"} />
        <CalendarHeatmap
          startDate={
            new Date(
              new Date().getFullYear() - 1,
              new Date().getMonth(),
              new Date().getDate()
            )
          }
          endDate={new Date()}
          values={heatmapData}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-scale-${Math.min(value.count, 4)}`;
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
          gutterPx={10} // Adjust the pixel size of the gutter
        />
      </div>

      <Title title={"You tried these problems recently"} />

      <ProfileRecentFails />
      <Tooltip id="data-tip" />
    </div>
  );
}
