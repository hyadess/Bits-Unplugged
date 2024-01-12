import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Route, useParams } from "react-router-dom";
import CanvasController from "../../controller/canvasController";
import Cookies from "universal-cookie";
import InfoIcon from "@mui/icons-material/Info";
import {
  Button,
  Divider,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  Tooltip,
  Zoom,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import EyeIcon from "../Icons/EyeIcon";
import { setLoading } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faEye,
  faEyeSlash,
  faUser,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
const canvasController = new CanvasController();
const cookies = new Cookies();

const CanvasContainer = (props, ref) => {
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [componentPath, setComponentPath] = useState(null);
  const [canvasInfo, seCanvasInfo] = useState(null);
  const [settings, setSettings] = useState(false);
  const [editOptions, setEditOptions] = [
    props.editOptions,
    props.setEditOptions,
  ];
  const [previewOptions, setPreviewOptions] = [
    props.previewOptions,
    props.setPreviewOptions,
  ];
  // const [type, setType] = useState(-1);
  // const [canvas, setCanvas] = useState(null);
  const [canvasContainerMode, setCanvasContainerMode] = useState(props.mode);
  const loadComponent = async (name) => {
    try {
      const module = await import(/* @vite-ignore */ `./${name}`);
      return module.default;
    } catch (error) {
      console.error("Error loading component:", error);
      return null;
    }
  };

  useEffect(() => {
    setCanvasContainerMode(props.mode);
  }, [props.mode]);
  // Fix this
  const getCanvas = async () => {
    console.log("Canvas changed");
    const res = await canvasController.getCanvasById(props.canvasId);
    if (res.success) {
      console.log(res.data);
      // canvas = res.data
      // canvas.classname
      // canvas.info
      // problem.previewOptions
      // problem.editOptions

      setComponentPath(res.data.classname);
      seCanvasInfo(res.data.info);
      // setEditOptions(res.data[0].editOptions);
      // setPreviewOptions(res.data[0].previewOptions);
      // setCanvas(res.data[0]);
    } else {
      setComponentPath(null);
      seCanvasInfo(null);
      // setEditOptions({});
      // setPreviewOptions({});
      // setCanvas(null);
    }
  };

  useEffect(() => {
    if (componentPath) {
      console.log("Setting Dynamic Component");
      loadComponent(componentPath).then((component) => {
        if (component) {
          setDynamicComponent(() => component);
        }
      });
    }
  }, [componentPath]);

  useEffect(() => {
    getCanvas();
  }, [props.canvasId]);

  // useEffect(() => {
  //   setType(localStorage.getItem("type"));
  // }, []);

  const snakeCaseToTitleCase = (input) => {
    return input
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  function camelCaseToTitleCase(input) {
    // Add space before the capital letter and then capitalize the first letter
    return input
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, function (str) {
        return str.toUpperCase();
      });
  }
  const OptionList = ({ options, setOptions }) => {
    return (
      <div className="pt-2" style={{ minHeight: "1rem" }}>
        {Object.keys(options).map((key, index) =>
          options[key].type == "switch" ? (
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-white">{camelCaseToTitleCase(key)}</h1>
              <Switch
                checked={options[key].value}
                onChange={() => {
                  setOptions((prevJson) => ({
                    ...prevJson,
                    [key]: {
                      ...prevJson[key],
                      value: !prevJson[key].value, // Toggle the value or set a new value as needed
                    },
                  }));
                }}
              />
            </div>
          ) : options[key].type == "select" ? (
            <div className="flex flex-row justify-between items-center gap-5">
              <h1 className="text-white">{camelCaseToTitleCase(key)}</h1>
              <Select
                fullWidth
                required
                id="outlined-adornment"
                value={options[key].value}
                size="small"
                onChange={(e) =>
                  setOptions((prevJson) => ({
                    ...prevJson,
                    [key]: {
                      ...prevJson[key],
                      value: e.target.value, // Toggle the value or set a new value as needed
                    },
                  }))
                }
                // input={<OutlinedInput label={props.label} />}
                // MenuProps={MenuProps}
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                }}
                // // MenuProps={MenuProps}
              >
                {options[key].list.map((value, index) => (
                  <MenuItem
                    key={value}
                    value={value}
                    // sx={{ height: "2rem" }}
                    // style={getStyles(name, personName, theme)}
                  >
                    {snakeCaseToTitleCase(value)}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    );
  };
  const SettingsMenu = () => {
    return (
      <>
        {settings ? (
          <div
            className="flex flex-col p-5 w-30% bg-slate-900 rounded-lg shadow-lg"
            style={{
              position: "absolute",
              top: "4rem",
              right: "2rem",
              backgroundColor: "rgba(17, 24, 39, 0.9)",
            }}
          >
            {canvasContainerMode === "preview" ? (
              <div className="flex flex-col">
                <h1 className="text-white">Preview Options</h1>
                <Divider sx={{ bgcolor: "white" }} />
                <OptionList
                  options={previewOptions}
                  setOptions={setPreviewOptions}
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <h1 className="text-white">Edit Options</h1>
                <Divider sx={{ bgcolor: "white" }} />
                <OptionList options={editOptions} setOptions={setEditOptions} />
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };
  return (
    <div className="relative mt-5">
      {/* <Zoom in={true}> */}
      <div
        className="rounded-[30px] bg-[#fbfbfb] dark:bg-[#1F2531]"
        style={{ minHeight: "40vh" }}
      >
        {DynamicComponent && (
          <DynamicComponent
            input={props.input}
            setInput={props.setInput}
            activityData={props.activityData}
            setActivityData={props.setActivityData}
            editOptions={editOptions}
            previewOptions={previewOptions}
            ref={ref}
            mode={canvasContainerMode}
          />
        )}
      </div>
      {/* </Zoom> */}
      <SettingsMenu />
      <div
        className="flex flex-row p-2 items-center"
        style={{ position: "absolute", top: "0", right: "0" }}
      >
        {props.mode === "edit" && (
          <Tooltip
            title={<h1 className="text-lg text-white">Canvas Mode</h1>}
            placement="top"
            arrow
            size="large"
          >
            <div className="flex flex-col items-center bu-text-primary font-bold">
              <IconButton
                sx={{
                  fontSize: "2rem",
                  width: "3rem",
                  height: "3rem",
                }}
                onClick={() => {
                  if (canvasContainerMode === "edit") {
                    setCanvasContainerMode("preview");
                  } else {
                    setCanvasContainerMode("edit");
                  }
                }}
              >
                <div className="flex items-center bu-text-primary text-3xl">
                  {canvasContainerMode === "edit" ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </div>
              </IconButton>
              <div className="transform translate-y-[-50%] text-sm">
                {canvasContainerMode === "edit" ? "Edit" : "Preview"}
              </div>
            </div>
          </Tooltip>
        )}

        {props.mode === "edit" && (
          <Tooltip
            title={<h1 className="text-lg text-white">Clear Canvas</h1>}
            placement="top"
            // TransitionComponent={Zoom}
            arrow
            size="large"
          >
            <div className="flex flex-col items-center bu-text-primary font-bold">
              <IconButton
                sx={{
                  fontSize: "2rem",
                  width: "3rem",
                  height: "3rem",
                }}
                onClick={() => ref.current.handleReset(null)}
              >
                <div className="flex items-center bu-text-primary text-3xl">
                  <FontAwesomeIcon icon={faBroom} />
                </div>
              </IconButton>
              <div className="transform translate-y-[-50%] text-sm">Clear</div>
            </div>
          </Tooltip>
        )}
        {props.mode === "edit" && (
          <Tooltip
            title={
              <h1 className="text-lg text-white">
                {(canvasContainerMode === "edit" ? "Edit" : "Preview") +
                  " Options"}
              </h1>
            }
            placement="top"
            // TransitionComponent={Zoom}
            arrow
            size="large"
          >
            <div className="flex flex-col items-center bu-text-primary font-bold">
              <IconButton
                sx={{
                  fontSize: "2rem",
                  width: "3rem",
                  height: "3rem",
                }}
                onClick={() => setSettings(!settings)}
              >
                <div className="flex items-center bu-text-primary">
                  <SettingsIcon sx={{ fontSize: "2rem" }} />
                </div>
              </IconButton>
              <div className="transform translate-y-[-50%] text-sm">
                Options
              </div>
            </div>
          </Tooltip>
        )}
        <Tooltip
          title={<h1 className="text-lg text-white">Canvas Info</h1>}
          placement="top"
          // TransitionComponent={Zoom}
          arrow
          size="large"
        >
          <div className="flex flex-col items-center bu-text-primary font-bold">
            <IconButton
              sx={{
                fontSize: "2rem",
                width: "3rem",
                height: "3rem",
              }}
              onClick={() => alert(canvasInfo)}
            >
              <div className="flex items-center bu-text-primary">
                <InfoIcon sx={{ fontSize: "2rem" }} />
              </div>
            </IconButton>
            <div className="transform translate-y-[-50%] text-sm">Info</div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default forwardRef(CanvasContainer);
