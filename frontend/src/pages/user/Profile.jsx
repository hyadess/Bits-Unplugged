import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { setLoading } from "../../App";
import { submissionApi } from "../../api";
import { Tooltip } from "react-tooltip";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./heatmap.scss";

export default function Profile() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  const transformHeatmapData = () => {
    const data = [];

    // Iterate through each submission
    submissions.forEach((submission) => {
      //console.log(1);
      console.log(submission);
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

  const getSubmissions = async () => {
    const res = await submissionApi.getAllSubmissionsByUser();
    if (res.success) {
      setSubmissions(res.data);
      //console.log(submissions);

      setLoading(false);
    }
  };

  useEffect(() => {
    getSubmissions();
    //setLoading(false);
  }, []);
  useEffect(() => {
    transformHeatmapData();
    //setLoading(false);
  }, [submissions]);

  return (
    <div className="flex flex-col">
      <Title title={"Profile Page"} />
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
      <Tooltip id="data-tip" />
    </div>
  );
}
