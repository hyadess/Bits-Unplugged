import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading, showSuccess } from "../../App";
import { problemApi } from "../../api";
import Confirmation from "../Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faCircleCheck,
  // faCircleXmark,
  faR,
  faTag,
  fas,
  fa,
  faS,
  faTrashCan,
  faCheckCircle,
  faXmark,
  faCheck,
  faFloppyDisk,
  faEdit
  // far,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { IconButton } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AddTask from "@mui/icons-material/AddTask";
import { getTimeStamp } from "../../services/dateUtil";
import { SelectionField2, SelectionField3 } from "../InputFields";
export default function AdminArticleCard({
  id,
  name,
  path,
  deleteAction,
  isLive,
  canvas,
  problem,
  setProblem,
  isEdit,
  timestamp,
  seriesList,
  topicList,
}) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (seriesList.length > 0 && problem.seriesId) {
      setSeries(
        seriesList.filter((series) => series.id == problem.seriesId)[0]
      );
    }
  }, [seriesList]);

  useEffect(() => {
    if (topicList.length > 0 && series) {
      setTopic(topicList.filter((topic) => topic.id == series.topicId)[0]);
    }
  }, [topicList, series]);

  const navigate = useNavigate();


  return (
    <div className="w-full h-full relative" key={id}>
      <div
        className={
          "border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col p-5 h-full justify-between gap-5"
        }
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h5
              className="text-2xl md:text-3xl font-bold tracking-tight bu-text-title w-full cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full"
              onClick={() => {
                setLoading(true);
                navigate(path);
              }}
            >
              {name}
            </h5>
            <IconButton onClick={() => setOpen(true)}>
              <div className="flex items-center bu-text-primary">
                <FontAwesomeIcon icon={faTrashCan} size="sm" />
              </div>
            </IconButton>
          </div>

          {canvas && (
            <div className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
              <FontAwesomeIcon icon={faTag} />
              <h3 className="bu-text-primary">{canvas}</h3>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <SelectionField3
            label="Topic"
            onChange={(e) =>
              setTopic(
                topicList.filter((topic) => topic.id == e.target.value)[0]
              )
            }
            id="topicId"
            value={topic == null ? "" : topic.id}
            options={topicList.map((topic) => ({
              label: topic.name,
              value: topic.id,
            }))}
          />
          <SelectionField3
            label="Series"
            onChange={(e) =>
              setSeries(
                seriesList.filter((series) => series.id == e.target.value)[0]
              )
            }
            id="seriesId"
            value={series == null ? "" : series.id}
            options={(topic
              ? seriesList.filter((series) => series.topicId === topic.id)
              : seriesList
            ).map((series) => ({
              label: series.name,
              value: series.id,
            }))}
          />
        </div>

        <div className="flex flex-row gap-3">
          {/* <button
            className="font-medium rounded-lg text-lg px-7 py-2 text-center w-full bu-button-save"
            // onClick={async () => {
            //   const res = await problemApi.updateProblem(problem.id, {
            //     ...problem,
            //     seriesId: series?.id,
            //   });
            //   showSuccess("Problem updated successfully", res);
            //   // setProblem((prev) => ({ ...prev, seriesId: series?.id }));
            // }}
          >
            Publish
          </button> */}
          <button
            className="font-medium rounded-lg text-lg px-10 py-2 text-center w-full bu-button-primary"
            onClick={async () => {
              const res = await problemApi.updateProblem(problem.id, {
                ...problem,
                seriesId: series?.id,
              });
              showSuccess("Problem updated successfully", res);
              // setProblem((prev) => ({ ...prev, seriesId: series?.id }));
            }}
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
            Save
          </button>
          <button
            className="font-medium rounded-lg text-lg px-10 py-2 text-center w-full bu-button-primary"
            onClick={async () => {
              navigate(path);
            }}
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            edit
          </button>
        </div>
      </div>

      <Confirmation
        open={open}
        setOpen={setOpen}
        onConfirm={deleteAction}
        param={id}
      />
    </div>
  );
}
