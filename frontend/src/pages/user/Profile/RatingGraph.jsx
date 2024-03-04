import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../../components/Title";
import { setLoading } from "../../../App";
import { ratingApi, profileApi } from "../../../api";
import { Tooltip } from "react-tooltip";
import ApexCharts from "react-apexcharts";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faRankingStar } from "@fortawesome/free-solid-svg-icons";

export default function RatingGraph() {
  const [rating, setRating] = useState(null);
  const [position, setPosition] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ratingHistoryData, setRatingHistoryData] = useState(null);

  const [options, setOptions] = useState({
    chart: {
      id: "rating-history-chart",
      type: "line",
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
        text: "rating",
      },
    },
    grid: {
      show: false,
      // strokeDashArray: 5,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 5, // border
    },
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shadeIntensity: 0.6,
    //     opacityFrom: 1,
    //     opacityTo: 1,
    //     stops: [0, 100],
    //   },
    // },
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
  });

  const { username } = useParams();

  const getId = async () => {
    const res = await profileApi.getIdByUsername(username);
    if (res.success) {
      console.log("data for id", res.data);
      setUserId(res.data[0].id);
    }
  };

  const getRating = async () => {
    console.log("userId before rating fetch", userId);
    const res = await ratingApi.getRating(userId);
    if (res.success && res.data.length > 0) {
      console.log("rating data", res.data);
      setRating(res.data[0].rating);
      setPosition(res.data[0].position);
    }
  };
  const getRatingHistory = async () => {
    const res = await ratingApi.getRatingHistory(userId);
    if (res.success) {
      const data = res.data.map((d) => {
        return {
          x: new Date(d.createdAt),
          y: d.rating,
        };
      });
      setRatingHistoryData(data);
    }
  };
  useEffect(() => {
    //setLoading(true);
    getId();
    setLoading(false);
  }, []);

  useEffect(() => {
    //setLoading(true);
    if (userId === null) return;
    getRating();
    getRatingHistory();
    //setLoading(false);
  }, [userId]);

  return (
    <div className="flex flex-row relative">
      <div className="left-[4rem] top-3 pr-5 pl-3 pt-3  w-30% flex flex-col items-center absolute">
        <p className="text-center md:text-left  text-green-500 md:text-5xl font-bold">
          <FontAwesomeIcon icon={faStar} />
          {rating === null ? "Unranked" : rating}
        </p>
        <p className="text-center md:text-left  font-light  md:text-3xl bu-text-subtitle">
          <FontAwesomeIcon icon={faRankingStar} />
          {position === null ? "Unranked" : position}
        </p>
      </div>

      <div className="bu-card-primary pr-5 pl-3 pt-3 rounded-lg shadow-md w-full">
        {ratingHistoryData?.length > 0 && (
          <Chart
            options={options}
            series={[{ name: "rating", data: ratingHistoryData }]}
            type="line"
            width="100%"
            height={300}
          />
        )}
      </div>
    </div>
  );
}
