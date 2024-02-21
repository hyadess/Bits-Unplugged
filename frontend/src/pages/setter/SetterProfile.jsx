import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import ProfileInfo from "./SetterProfileInfo";
import { setLoading } from "App";
import { setterActivityApi, profileApi } from "api";
import { useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import ApexCharts from "react-apexcharts";
import { set } from "date-fns";
export default function SetterProfile() {
  const [curUser, setCurUser] = useState(null);
  const [seriesActivity, setSeriesActivity] = useState([]);
  const [famousProblems, setFamousProblems] = useState([]);
  const [approvalStatusStat, setApprovalStatusStat] = useState([]);
  const { username } = useParams();

  const fetchUser = async () => {
    const isLoggedIn = localStorage.hasOwnProperty("token");
    if (!isLoggedIn) {
      return;
    }
    const res = await profileApi.getProfileByUsername(username);
    if (res.success) setCurUser(res.data[0]);
    console.log("user", curUser);
    //console.log(res.data[0]);
  };

  const getActivityBySeries = async () => {
    const res = await setterActivityApi.setterActivityBySeries(curUser.id);
    if (res.success) {
      setSeriesActivity(res.data);
      //seriesActivity? console.log("seriesActivity", res.data): console.log("seriesActivitynull", "null");
    }
  };

  const getFamousProblems = async () => {
    const res = await setterActivityApi.famousProblemBySetter(curUser.id);
    if (res.success) {
      setFamousProblems(res.data);
      //console.log("famousProblems", famousProblems);
    }
  };
  const getApprovalStatusStat = async () => {
    const res = await setterActivityApi.approvalStatusStat(curUser.id);
    if (res.success) {
      setApprovalStatusStat(res.data);
      console.log("approvalStatusStat", approvalStatusStat);
    }
  };

  useEffect(() => {
    fetchUser();
    setLoading(false);
  }, []);
  useEffect(() => {
    if (curUser) {
      getActivityBySeries();
      getFamousProblems();
      getApprovalStatusStat();
    }
  }, [curUser]);

  const SeriesActivityChart = () => {
    const [seriesChart, setSeriesChart] = useState(undefined);

    useEffect(() => {
      //console.log("seriesActivity", seriesActivity);
      const chartLabels = seriesActivity.map((item) => item.series);
      const chartData = seriesActivity.map((item) => item.totalProblems);
      setSeriesChart({
        series: [
          {
            name: "no of problems",
            data: chartData,
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
            categories: chartLabels,
            labels: {
              show: false,
              style: {
                colors: [],
                fontSize: "0.5rem",
              },
              rotate: 45,
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
          colors: ["#ef9c9c"],
        },
      });
    }, [seriesActivity]);
    //console.log("seriesChart", seriesChart);

    return (
      <>
        {seriesChart !== undefined && seriesActivity.length > 0 ? (
          <ApexCharts
            options={seriesChart.options}
            series={seriesChart.series}
            type="bar"
            height={350}
          />
        ) : (
          <> </>
        )}
      </>
    );
  };

  const FamousProblemsChart = () => {
    const [famousProblemsChart, setFamousProblemsChart] = useState(undefined);

    useEffect(() => {
      const chartLabels = famousProblems.map((item) => item.problemTitle);
      const chartData = famousProblems.map((item) => item.totalSubmissions);
      setFamousProblemsChart({
        series: [
          {
            name: "no of submissions",
            data: chartData,
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
            categories: chartLabels,
            labels: {
              show: false,
              style: {
                colors: [],
                fontSize: "0.5rem",
              },
              rotate: 45,
              offsetY: 20,
              rotateAlways: true,
              tickPlacement: "on",
            },
          },
          yaxis: {
            title: {
              text: "Number of submissions",
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
          colors: ["#ef9c9c"],
        },
      });
    }, [famousProblems]);
    //console.log("famousProblemsChart", famousProblemsChart);
    return (
      <>
        {famousProblemsChart !== undefined && famousProblems.length > 0 ? (
          <ApexCharts
            options={famousProblemsChart.options}
            series={famousProblemsChart.series}
            type="bar"
            height={350}
          />
        ) : (
          <> </>
        )}
      </>
    );
  };

  const ApprovalStatusPieChart = () => {
    const [chart, setChart] = useState(undefined);

    //draw a pie chart
    useEffect(() => {
      const chartLabels = approvalStatusStat.map((item) =>
        item.approvalStatus == 1
          ? "Approved"
          : item.approvalStatus == 2
            ? "Pending"
            : item.approvalStatus == 3
              ? "Rejected"
              : item.approvalStatus == 0
                ? "old"
                : "Unknown"
      );
      setChart({
        series: approvalStatusStat.map((item) => parseInt(item.totalProblems)),
        options: {
          chart: {
            type: "pie",
            height: 400,
          },
          labels: chartLabels,
          //colors: ["#ef9c9c", "#f48fb1", "#ce93d8"],
          dataLabels: {
            style: {
              colors: ["#000000"], // Add this line
              fontSize: "20px",
            },
          },
          stroke: {
            width: 0, // Add this line. This will remove the border.
          },

          responsive: [
            {
              breakpoint: 400,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      });
    }, [approvalStatusStat]);
    console.log("pie chart", chart);
    return (
      <>
        {chart !== undefined && approvalStatusStat.length > 0 ? (
          <ApexCharts
            options={chart.options}
            series={chart.series}
            type="pie"
            height={300}
          />
        ) : (
          <> </>
        )}
      </>
    );
  };

  return (
    <div>
      {curUser ? (
        <ProfileInfo
          image={curUser.image}
          username={username}
          fullname={curUser.fullname}
          email={curUser.email}
        />
      ) : null}
      <Title title={"Profile statistics"} />
      <div className="mb-6 py-6">
        <Title
          title={""}
          sub_title={
            "all the problems set for corresponding series by the setter"
          }
        />

        <SeriesActivityChart />
      </div>

      <div className="mb-6 py-6">
        <Title
          title={""}
          sub_title={
            "Your most famous problems based on the number of submissions"
          }
        />

        <FamousProblemsChart />
      </div>
      <div className="mb-6 py-6">
        <Title
          title={""}
          sub_title={"Your problems approval status statistics"}
        />

        <ApprovalStatusPieChart />
      </div>

      <Tooltip id="data-tip" />
    </div>
  );
}
