import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useContext,
} from "react";
import { Route, useParams } from "react-router-dom";
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
  faCamera,
  faCameraRetro,
  faEye,
  faEyeSlash,
  faObjectUngroup,
  faUser,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { canvasApi } from "../../api";
import { Camera } from "@mui/icons-material";
import GlobalContext from "store/GlobalContext";

const CanvasContainer = (props, ref) => {
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [componentPath, setComponentPath] = useState(null);
  const [canvasInfo, seCanvasInfo] = useState(null);
  const [settings, setSettings] = useState(false);
  const [canvasMenu, setCanvasMenu] = useState(false);
  const { type } = useContext(GlobalContext);
  const [canvasList, setCanvasList] = useState([]);
  const [canvasFullList, setCanvasFullList] = useState([]);
  const [editOptions, setEditOptions] = [
    props.editOptions,
    props.setEditOptions,
  ];
  const [previewOptions, setPreviewOptions] = [
    props.previewOptions,
    props.setPreviewOptions,
  ];

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

  const getCanvasList = async () => {
    const res = await canvasApi.getAllCanvas();
    if (res.success) {
      setCanvasFullList(res.data);
      const newArray = res.data.map((canvas) => ({
        value: canvas.id,
        label: canvas.name,
      }));

      setCanvasList(newArray);
      // console.log("=->", res);
    }
  };

  useEffect(() => {
    getCanvasList(props.mode);
  }, [props.onCanvasChange]);

  useEffect(() => {
    setCanvasContainerMode(props.mode);
  }, [props.mode]);
  // Fix this
  const getCanvas = async () => {
    console.log("Canvas changed");
    const res = await canvasApi.getCanvasById(props.canvasId);
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
    // console.log("Canvas Id changed");
    if (props.canvasId !== undefined && props.canvasId !== null) getCanvas();
  }, [props.canvasId]);

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
      <div className="flex flex-col gap-2 pt-2" style={{ minHeight: "1rem" }}>
        {Object.keys(options).map((key, index) =>
          options[key].type == "switch" ? (
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-white">{camelCaseToTitleCase(key)}</h1>
              <Switch
                checked={options[key].value}
                onChange={() => {
                  setOptions({ key: key, value: !options[key].value });
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
                onChange={(e) => {
                  setOptions({ key: key, value: e.target.value });
                }}
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
                  width: "9rem",
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
          ) : options[key].type == "number" ? (
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-white">{camelCaseToTitleCase(key)}</h1>
              <input
                value={options[key].value}
                type="number"
                className="border sm:text-sm rounded-lg block w-[9rem] h-[2.6rem] p-2.5 bg-gray-700 border-gray-600 focus:ring-pink-600 focus:border-pink-600 placeholder-gray-400 text-white text-center"
                step={1}
                placeholder="0"
                // min={0}
                onChange={(e) => {
                  setOptions({ key: key, value: e.target.value });
                }}
              />
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    );
  };

  const canvasMenuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        canvasMenuRef.current &&
        !canvasMenuRef.current.contains(event.target)
      ) {
        setCanvasMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [canvasMenuRef]);

  const CanvasMenu = () => {
    return (
      <>
        {canvasMenu ? (
          <div
            ref={canvasMenuRef}
            className="flex flex-col p-5 w-30% bg-slate-900 rounded-lg shadow-lg z-30"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              backgroundColor: "rgba(17, 24, 39, 0.9)",
            }}
          >
            <div className="flex flex-col gap-2 max-h-[20rem] overflow-y-auto">
              <h1 className="text-xl font-semibold text-white">
                Choose a canvas
              </h1>
              <Divider sx={{ bgcolor: "white" }} />
              {/* <OptionList options={editOptions} setOptions={setEditOptions} /> */}
              <div className="flex flex-col gap-2">
                {canvasList.map((canvas, index) => (
                  <button
                    key={index}
                    className={
                      `text-white text-lg p-2 rounded-lg  ` +
                      (canvas.value === props.canvasId
                        ? "bg-pink-600"
                        : "bg-slate-800 hover:bg-slate-700")
                    }
                    onClick={() => {
                      props.onCanvasChange(canvas.value);
                      setCanvasMenu(false);
                    }}
                  >
                    {canvas.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  // Do same for settingsMenuRef
  const settingsMenuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target)
      ) {
        setSettings(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsMenuRef]);
  const SettingsMenu = () => {
    return (
      <>
        {settings ? (
          <div
            ref={settingsMenuRef}
            className="flex flex-col p-5 w-30% bg-slate-900 rounded-lg shadow-lg z-30"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              backgroundColor: "rgba(17, 24, 39, 0.9)",
            }}
          >
            {props.mode !== "edit" ? (
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
        className="rounded-[30px] bg-[#fbfbfb] dark:bg-[#1F2531] min-h-[32rem]"
        // style={{ minHeight: "40vh" }}
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
            mode={props.mode === "edit" ? "edit" : "preview"}
            stageRef={props.stageRef}
          />
        )}
      </div>
      {/* </Zoom> */}
      {/* <button
        className="bu-button-primary text-2xl"
        onClick={saveCanvasAsImage}
      >
        Save Canvas as Image
      </button> */}
      <SettingsMenu />
      <CanvasMenu />
      <div
        className="flex flex-row p-2 items-center"
        style={{ position: "absolute", top: "0", right: "0" }}
      >
        {props.onCanvasChange !== undefined && (
          <Tooltip
            title={<h1 className="text-lg text-white">Choose Canvas</h1>}
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
                onClick={() => setCanvasMenu((prev) => !prev)}
              >
                <div className="flex items-center bu-text-primary text-3xl">
                  <FontAwesomeIcon icon={faObjectUngroup} />
                  {/* <Camera /> */}
                </div>
              </IconButton>
              <div className="transform translate-y-[-50%] text-sm">
                Canvases
              </div>
            </div>
          </Tooltip>
        )}

        {/* {props.mode !== "preview" && (
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
                  {canvasContainerMode !== "edit" ? (
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
        )} */}

        {props.mode !== "preview" && props.canvasId !== null && (
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
        {props.mode !== "preview" && props.canvasId !== null && (
          <Tooltip
            title={
              <h1 className="text-lg text-white">
                {(props.mode === "edit" ? "Edit" : "Preview") + " Options"}
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
        {props.canvasId !== null && (
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
        )}
      </div>
    </div>
  );
};

export default forwardRef(CanvasContainer);
