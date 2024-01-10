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
  Zoom,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import EyeIcon from "../Icons/EyeIcon";
import { setLoading } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
const canvasController = new CanvasController();
const cookies = new Cookies();

const CanvasContainer = (props, ref) => {
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
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
  const [type, setType] = useState(-1);
  const [canvas, setCanvas] = useState(null);
  const [canvasMode, setCanvasMode] = useState(props.mode);
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
    setCanvasMode(props.mode);
  }, [props.mode]);
  // Fix this
  const getCanvas = async () => {
    console.log("Canvas changed");
    const res = await canvasController.getCanvasById(props.canvasId);
    if (res.success) {
      console.log(res.data);
      setSelectedComponent(res.data.classname);
      seCanvasInfo(res.data.info);
      // setEditOptions(res.data[0].editOptions);
      // setPreviewOptions(res.data[0].previewOptions);
      // setCanvas(res.data[0]);
    } else {
      setSelectedComponent(null);
      seCanvasInfo(null);
      // setEditOptions({});
      // setPreviewOptions({});
      // setCanvas(null);
    }
  };

  useEffect(() => {
    if (selectedComponent) {
      console.log("Setting Dynamic Component");
      loadComponent(selectedComponent).then((component) => {
        if (component) {
          setDynamicComponent(() => component);
        }
      });
    }
  }, [selectedComponent]);

  useEffect(() => {
    getCanvas();
  }, [props.id]);
  useEffect(() => {
    setType(cookies.get("type"));
  }, []);

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
            {canvasMode === "preview" ? (
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
            editOptions={editOptions}
            previewOptions={previewOptions}
            ref={ref}
            mode={canvasMode}
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
          <Switch
            checked={canvasMode === "preview"}
            onChange={() => {
              if (canvasMode === "edit") {
                setCanvasMode("preview");
              } else {
                setCanvasMode("edit");
              }
            }}
          />
        )}

        {props.mode === "edit" && (
          <IconButton
            sx={{
              fontSize: "2rem",
              // width: "50px",
              // height: "50px",
            }}
            onClick={() => ref.current.handleReset(null)}
          >
            <div className="flex items-center bu-text-primary text-3xl">
              <FontAwesomeIcon icon={faBroom} />
            </div>
          </IconButton>
        )}
        {props.mode === "edit" && (
          <IconButton
            sx={{
              fontSize: "2rem",
              // width: "50px",
              // height: "50px",
            }}
            onClick={() => setSettings(!settings)}
          >
            <div className="flex items-center bu-text-primary">
              <SettingsIcon sx={{ fontSize: "2rem" }} />
            </div>
          </IconButton>
        )}

        <IconButton
          sx={{
            fontSize: "2rem",
            // width: "50px",
            // height: "50px",
          }}
          onClick={() => alert(canvasInfo)}
        >
          <div className="flex items-center bu-text-primary">
            <InfoIcon sx={{ fontSize: "2rem" }} />
          </div>
        </IconButton>
      </div>
    </div>
  );
};

export default forwardRef(CanvasContainer);
