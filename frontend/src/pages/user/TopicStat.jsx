import React, { useEffect, useState } from "react";
import { userActivityApi } from "../../api";
import ApexCharts from "react-apexcharts";
import { useParams } from "react-router-dom";

const PieChart = ({ solved, unsolved }) => {
  const [chart, setChart] = useState(undefined);

  //draw a pie chart
  useEffect(() => {
    console.log(solved, unsolved);
    if (solved && unsolved)
      setChart({
        series: [parseInt(unsolved), parseInt(solved)],
        options: {
          chart: {
            type: "pie",
            height: 350,
          },
          labels: ["Fail", "Success"],
          legend: {
            show: false,
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
  }, [solved, unsolved]);
  //return the pie chart
  return (
    <>
      {chart ? (
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

const TopicStat = () => {
  const { id } = useParams();

  const [solved, setSolved] = useState(2);
  const [total, setTotal] = useState(2);

  const getAll = async () => {
    const res = await userActivityApi.totalProblemCountByTopic(id);
    console.log(res);
    if (res.success) {
      if (res.data.length === 0) return;
      setTotal(res.data[0].total_problems);
    }
    const res2 = await userActivityApi.totalSolvedProblemCountByTopic(id);
    console.log(res2);
    if (res2.success) {
      if (res2.data.length === 0) return;
      setSolved(res2.data[0].total_solved_problems);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="flex flex-col pt-20 w-full mx-auto justify-between">
      <PieChart solved={solved} unsolved={total - solved} />
    </div>
  );
};

export default TopicStat;
