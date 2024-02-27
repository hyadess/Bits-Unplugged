import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SetterCard from "components/Cards/SetterCard";
import LeaderBoardCard from "components/Cards/LeaderBoardCard";
import { contestApi } from "api";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const Leaderboard = ({}) => {
  const { id } = useParams();
  const [endTime, setEndTime] = useState();
  const [contest, setContest] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [timelineData, setTimelineData] = useState([]);

  const fetchLeaderboard = async () => {
    const leaderboardRes = await contestApi.getLeaderboard(id);
    if (leaderboardRes.success) {
      console.log(leaderboardRes);
      setLeaderboard(leaderboardRes.data);
    }
    return leaderboardRes;
  };

  const getUserSubmissions = async (username) => {
    const result = await contestApi.getAllSubmissionsByUserAndContest(
      id,
      username
    );
    if (result.success) {
      return result.data;
    }
  };

  const calculateData = async () => {
    console.log("leaderboard", leaderboard);
    setTimelineData([]);
    
    for (let i = 0; i < Math.min(leaderboard?.length, 10); i++) {
      const user = leaderboard[i];
      console.log("->", user);
      const submissions = await getUserSubmissions(user.username);
      console.log(submissions);
      let cumulativePoints = 0;
      let dat = {
        name: user.username,
        data: [],
      };
      let sortedSubmissions = [...submissions];
      sortedSubmissions.sort((a, b) => a.submittedAt - b.submittedAt);
      sortedSubmissions.forEach((submission) => {
        cumulativePoints += submission.points;
        submission.points = cumulativePoints;
      });
      sortedSubmissions.forEach((submission) => {
        dat.data.push({
          x: submission.submittedAt,
          y: submission.points,
        });
      });
      setTimelineData((prev) => [...prev, dat]);
    }
  };

  const chartConfig = {
    type: "line",
    height: 240,
    series: timelineData.map((line) => ({ name: line.name, data: line.data })),
    options: {
      chart: {
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
      colors: ["#020617", "#FF5733", "#008000"], // Add more colors as needed
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        // labels: {
        //   style: {
        //     colors: "#616161",
        //     fontSize: "12px",
        //     fontFamily: "inherit",
        //     fontWeight: 400,
        //   },
        // },
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
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        enabled: false,
        theme: "dark",
      },
    },
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [id]);

  useEffect(() => {
    if (leaderboard?.length) calculateData();
  }, [leaderboard]);

  useEffect(() => {
    console.log("timeline data", timelineData);
  }, [timelineData]);

  return (
    <div>
      {/* <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
        <h2 className="bu-text-primary mb-4 text-4xl font-extrabold tracking-tight">
          TIMELINE
        </h2>
      </div> */}

      {/* <Card>
        <CardBody className="px-2 pb-0">
          <Chart {...chartConfig} />
        </CardBody>
      </Card> */}

      <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
        <h2 className="bu-text-primary mb-4 text-4xl font-extrabold tracking-tight">
          LEADERBOARD
        </h2>
      </div>

      <div className="mx-auto grid h-full w-full grid-cols-1 place-items-center gap-8 md:w-75% md:grid-cols-1">
        {leaderboard?.map((user) => (
          <LeaderBoardCard
            id={user.id}
            contest_id={id}
            name={user.username}
            points={user.points}
            image={user.image}
            path={`/contests/${id}/${user.username}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
