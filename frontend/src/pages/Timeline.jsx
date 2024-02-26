import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const Timeline = () => {
  // Data and category pairs for each line
  const lineData = [
    {
      name: "Line 1",
      data: [
        { x: 0, y: 50 },
        { x: 10, y: 100 },
        { x: 20, y: 150 },
        { x: 30, y: 200 },
        { x: 40, y: 250 },
        { x: 50, y: 275 },
        { x: 60, y: 300 },
      ],
      // categories: ["0h", "0h30m", "1h", "1h30m", "2h", "2h30m", "3h"],
    },
    {
      name: "Line 2",
      data: [
        { x: 5, y: 50 },
        { x: 15, y: 100 },
        { x: 25, y: 150 },
        { x: 35, y: 200 },
        { x: 45, y: 250 },
        { x: 55, y: 275 },
        { x: 65, y: 300 },
      ],
      // categories: ["0h", "0h30m", "1h", "1h30m", "2h", "2h30m", "3h"],
    },
    // Add more data and category pairs as needed
  ];

  const chartConfig = {
    type: "line",
    height: 240,
    series: lineData.map((line) => ({ name: line.name, data: line.data })),
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
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: lineData[0].categories, // Use categories from the first data pair
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

  return (
    <Card>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default Timeline;
