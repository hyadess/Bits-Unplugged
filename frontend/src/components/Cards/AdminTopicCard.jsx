import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Zoom } from "@mui/material";
import ImageLoader from "../ImageLoaders/ImageLoader";
import { setLoading } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Confirmation from "../Confirmation";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AddTask from "@mui/icons-material/AddTask";
import { topicApi } from "../../api";

const TopicCard = ({
  id,
  idx,
  name,
  image,
  path,
  isLive,
  setTopic,
  deleteAction,
  isEdit,
}) => {
  const navigate = useNavigate();
  const [solved, setSolved] = useState(0);
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let tmp = Math.round(Math.random() * 50);
    let tmp2 = tmp + Math.round(Math.random() * 60);
    setSolved(tmp);
    setTotal(tmp2);
    setProgress(Math.round((tmp / tmp2) * 100));
  }, []);

  return (
    <Zoom in={true}>
      <div
        className="flex flex-col items-center w-full h-[10.5rem] cursor-pointer relative"
        onClick={() => {
          if (!isEdit) {
            setLoading(true);
            navigate(path);
          }
        }}
      >
        <div
          className={`flex flex-row border rounded-lg h-full w-full p-5 bu-card-primary ${
            isLive ? (isEdit ? "shadow-xl" : "shadow-md") : "opacity-60"
          }`}
        >
          <div className="flex flex-col gap-1 justify-between w-[70%]">
            <div className="flex flex-col gap-1">
              <h5 className="flex justify-start p-0 text-3xl text-center font-bold bu-text-title">
                {name}
              </h5>
              <div className="bu-text-subtitle">{total} problems</div>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="bu-text-subtitle text-sm">
                {solved}/{total} problems solved
              </h5>
              <div className="w-full h-[8.86px] left-[367.76px] top-[344.82px] bg-[#EDEDED] rounded-[6px]">
                {progress && (
                  <div
                    className={`box-border h-[9.42px] border-[1px] rounded-[6px]`}
                    style={{
                      width: `${progress}%`,
                      backgroundColor:
                        progress > 70
                          ? "rgba(13, 158, 45, 0.4)"
                          : progress > 30
                            ? "rgba(236, 172, 59, 0.4)"
                            : "rgba(243, 44, 44, 0.4)",
                      borderColor:
                        progress > 70
                          ? "rgb(47, 113, 65)"
                          : progress > 30
                            ? "#C98C17"
                            : "#C91717",
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end w-30%">
            <ImageLoader
              src={
                image
                  ? image
                  : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
              }
              alt=""
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        {isEdit && (
          <div className="absolute bottom-0 right-0 flex flex-row gap-2 justify-end pr-2">
            <div className="w-1/3 flex items-center justify-center">
              {isLive ? (
                <IconButton
                  onClick={async () => {
                    // await topicApi.updateTopic(id, { isLive: false });
                    setTopic(id, { isLive: false });
                  }}
                >
                  <div className="flex items-center bu-text-primary">
                    <CheckCircle sx={{ fontSize: "1.5rem" }} />
                  </div>
                </IconButton>
              ) : (
                <IconButton
                  onClick={async () => {
                    // await topicApi.updateTopic(id, { isLive: true });
                    setTopic(id, { isLive: true });
                  }}
                >
                  <div className="flex items-center bu-text-subtitle">
                    <AddTask sx={{ fontSize: "1.5rem" }} />
                  </div>
                </IconButton>
              )}
            </div>

            <div className="w-1/3 flex items-center justify-center">
              <IconButton onClick={() => setOpen(true)}>
                <div className="flex items-center bu-text-primary">
                  <FontAwesomeIcon icon={faTrashCan} size="sm" />
                </div>
              </IconButton>
            </div>
          </div>
        )}

        <Confirmation
          open={open}
          setOpen={setOpen}
          onConfirm={deleteAction}
          param={id}
        />
      </div>
    </Zoom>
  );
};

export default TopicCard;
