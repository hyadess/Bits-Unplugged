import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { setLoading } from "../../App";
import { submissionApi, userActivityApi } from "../../api";
import { Tooltip } from "react-tooltip";
import ApexCharts from "react-apexcharts";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./heatmap.scss";
import ProfileRecentFails from "./ProfileRecentFails";

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
            height: 340,
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
            row: {
              // colors: ["#fff", "#f2f2f2"],
            },
          },
          dataLabels: {
            enabled: true,
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
              rotate: 0,
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
            y: {
              formatter: function (val) {
                return val + " problems";
              },
            },
          },
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

  const getSubmissions = async () => {
    const res = await submissionApi.getAllSubmissionsByUser();
    if (res.success) {
      setSubmissions(res.data);
      //console.log(submissions);

      setLoading(false);
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
    getSubmissions();
    //setLoading(false);
  }, []);
  useEffect(() => {
    transformHeatmapData();
    calculateSeriesStats();
    //setLoading(false);
  }, [submissions]);

  return (
    <div className="flex flex-col">
      <Title title={"Profile Page"} />
      <BarChart/>
      <CalendarHeatmap
        startDate={new Date(new Date().getFullYear(), 0, 1)}
        endDate={new Date(new Date().getFullYear(), 11, 31)}
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
      <ProfileRecentFails/>
      <Tooltip id="data-tip" />
    </div>
  );
}