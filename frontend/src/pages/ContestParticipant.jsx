import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../App";

import SubmissionCard from "components/Cards/ContestProblemSubmissionCard";

import CardContainer from "containers/CardContainer2";

import { contestApi } from "../api";
import Chart from "react-apexcharts";
import Title from "components/Title";

export default function ContestParticipant() {
  const { id, username } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [graphData, setGraphData] = useState([{}]);

  const getUserSubmissions = async () => {
    const result = await contestApi.getAllSubmissionsByUserAndContest(
      id,
      username
    );
    if (result.success) {
      setSubmissions(result.data);
    }
  };

  const calculateGraphData = () => {
    let sortedSubmissions = [...submissions];

    // Sort the copied submissions array based on createdAt in ascending order
    sortedSubmissions.sort((a, b) => a.createdAt - b.createdAt);

    // Initialize a variable to keep track of cumulative points
    let cumulativePoints = 0;

    // Iterate over the sorted submissions array to update point to cumulative sum till now
    sortedSubmissions.forEach((submission) => {
      cumulativePoints += submission.points;
      submission.points = cumulativePoints;
    });

    const data = submissions.map((submission) => {
      return {
        x: new Date(submission.createdAt),
        y: submission.points,
      };
    });
    setGraphData(data);
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
        text: "Points",
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




  useEffect(() => {
    getUserSubmissions();
    setLoading(false);
  }, []);

  useEffect(() => {
    calculateGraphData();
  }, [submissions]);

  return (
    submissions && (
      <>
        <Title title={`submissions for ${username}`}/>
        <div>
          <Title title={""} sub_title={"Submission trend"} />
          <div className="bu-card-primary pr-5 pl-3 pt-3 mb-10 rounded-lg shadow-md">
            <Chart
              options={options}
              series={[{ name: "Submission history", data: graphData }]}
              type="area"
              width="100%"
              height={300}
            />
          </div>
        </div>
        <CardContainer>
          {submissions.map((submission, index) => (
            <SubmissionCard
              idx={index + 1}
              submissionId={submission.id}
              verdict={submission.verdict}
              user_name={submission.title}
              // path={`/problems/${problem.id}`}
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
