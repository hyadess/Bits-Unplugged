import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "App";

import SubmissionCard from "components/Cards/ContestProblemSubmissionCard";

import CardContainer from "containers/CardContainer2";
import TableContainer from "containers/TableContainer";
import { contestApi } from "api";
import Chart from "react-apexcharts";
import Title from "components/Title";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import ProfileSubmissionCard from "components/Cards/ProfileSubmissionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheckToSlot,
  faFire,
  faHeartPulse,
  faXmark,
  faClock,
  faStopwatch,
  faGavel,
} from "@fortawesome/free-solid-svg-icons";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ContestSubmissionCard from "components/Cards/ContestSubmissionCard";

export default function ContestParticipant() {
  const { id, username } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [contest, setContest] = useState(null);
  const [graphData, setGraphData] = useState([{}]);
  const [options, setOptions] = useState({
    options: {
      chart: {
        type: "line",
        height: 300,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        tickAmount: 6,
        axisBorder: {
          show: false,
        },
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
  const getUserSubmissions = async () => {
    const res = await contestApi.getContestById(id);
    if (res.success) {
      setContest(res.data[0]);
      console.log("contest: ", res.data[0]);
    }
    const result = await contestApi.getAllSubmissionsByUserAndContest(
      id,
      username
    );
    if (result.success) {
      setSubmissions(result.data);
    }
  };

  const calculateGraphData = () => {
    console.log("calculateGraphData: ", contest);
    let sortedSubmissions = [...submissions];

    // Sort the copied submissions array based on createdAt in ascending order
    sortedSubmissions.sort((a, b) => a.submittedAt - b.submittedAt);

    // Initialize a variable to keep track of cumulative points
    let cumulativePoints = 0;

    // Iterate over the sorted submissions array to update point to cumulative sum till now
    sortedSubmissions.forEach((submission) => {
      cumulativePoints += submission.points;
      submission.points = cumulativePoints;
    });

    let data = [{ x: 0, y: 0 }];

    sortedSubmissions.forEach((submission) => {
      data.push({
        x: parseInt(submission.submittedAt),
        y: submission.points,
      });
    });
    setGraphData(data);
    console.log("dihan: ", data);

    setOptions({
      chart: {
        id: "daily-activity-chart",
        type: "line",
        height: 400,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 5, // border
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        tickAmount: 6,
        axisBorder: {
          show: false,
        },
        type: "datetime",
        labels: {
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm",
          },
        },
        min: 0,
        max: contest?.duration * 60 * 60 * 1000,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        tickAmount: 8,
        min: 0,
        max: parseInt(contest?.totalPoints),
      },
      grid: {
        show: true,
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
      colors: ["#aadfcf"],
    });
  };

  const chartConfig = {
    type: "line",
    height: 400,
    series: [{ name: "Points", data: graphData }],
    options: {
      chart: {
        id: "daily-activity-chart",
        type: "line",
        height: 400,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },

      dataLabels: {
        enabled: false,
      },
      colors: ["#aadfcf", "#ef9c9c", "#af7be3", "#839192", "#74cde9"], // Add more colors as needed
      stroke: {
        curve: "straight",
        width: 5, // border
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        tickAmount: 6,
        axisBorder: {
          show: false,
        },
        type: "datetime",
        labels: {
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm",
          },
        },
        // labels: {
        //   style: {
        //     colors: "#616161",
        //     fontSize: "12px",
        //     fontFamily: "inherit",
        //     fontWeight: 400,
        //   },
        // },

        min: 0,
        max: contest?.duration * 60 * 60 * 1000,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        tickAmount: 8,
        min: 0,
        // max: parseInt(contest?.totalPoints),
      },
      grid: {
        show: true,
        // borderColor: "#dddddd",
        // strokeDashArray: 5,
        // xaxis: {
        //   lines: {
        //     show: true,
        //   },
        // },
        // padding: {
        //   top: 5,
        //   right: 20,
        // },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
    },
  };

  useEffect(() => {
    getUserSubmissions();
    setLoading(false);
  }, [username]);

  useEffect(() => {
    if (submissions?.length && contest) calculateGraphData();
  }, [submissions, contest]);

  return (
    submissions && (
      <div className="flex flex-col gap-8 mt-10">
        <div className="flex flex-col">
          <div className="mx-auto w-full text-right p-8 bg-[#aadfcf] rounded-t-[15px]">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col w-full items-start gap-1">
                <h2 className="bu-text-primary text-2xl font-extrabold tracking-wider uppercase">
                  {username}'s Submissions
                </h2>
                <h3 className="opacity-[65%] bu-text-primary text-[13px] font-medium tracking-[3.4px] uppercase">
                  Score Timeline graph
                </h3>
              </div>
              <div className="bu-text-primary text-4xl">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
            </div>
          </div>

          {graphData.length > 0 && (
            <Card>
              <CardBody className="px-2 pb-0">
                <Chart
                  series={[{ name: "Points", data: graphData }]}
                  {...chartConfig}
                />
              </CardBody>
            </Card>
          )}
        </div>

        <div className="flex flex-col w-full gap-5">
          <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
            <div className="text-xl w-[50%] font-medium">Problem name</div>
            <div className="text-xl w-30% font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faClock} />
              When
            </div>
            <div className="text-xl w-20% font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faGavel} />
              Verdict
            </div>
          </div>
          <TableContainer>
            {submissions?.map((submission, index) => (
              <ContestSubmissionCard
                idx={index + 1}
                submissionId={submission.id}
                verdict={submission.verdict}
                name={submission.problemName}
                submittedAt={submission.submittedAt}
                image={submission.image}
                duration={submission.duration ?? 30}
              />
            ))}
          </TableContainer>
        </div>

        {/* <CardContainer>
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
        </CardContainer> */}
      </div>
    )
  );
}
