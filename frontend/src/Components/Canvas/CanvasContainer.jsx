import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Route, useParams } from "react-router-dom";
import GraphComponent from "./GraphComponent";
import TowerOfHanoi from "./TowerOfHanoi";
import CanvasController from "../../controller/canvasController";
import "./CanvasContainer.scss";
import Cookies from "universal-cookie";
import InfoIcon from "@mui/icons-material/Info";
import {
  Button,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  Zoom,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SettingsIcon from "@mui/icons-material/Settings";
const canvasController = new CanvasController();
const cookies = new Cookies();
const useStyles = makeStyles({
  select: {
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "white",
    },
  },
  icon: {
    fill: "white",
  },
  root: {
    color: "white",
  },
});

const CanvasContainer = (props, ref) => {
  const classes = useStyles();
  const id = props.id;
  // const componentName = "GraphComponent";
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [canvasList, setCanvasList] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [canvasInfo, seCanvasInfo] = useState(null);
  const [settings, setSettings] = useState(false);
  const [params, setParams] = useState({});
  const [uiParams, setUiParams] = useState({});
  const [type, setType] = useState(-1);

  const loadComponent = async (name) => {
    try {
      const module = await import(`./${name}`);
      return module.default;
    } catch (error) {
      console.error("Error loading component:", error);
      return null;
    }
  };

  const getCanvasList = async () => {
    const res = await canvasController.getAllCanvas();
    if (res.success) {
      setCanvasList(res.data);
      console.log(res.data);
      const match = res.data.filter((canvas) => canvas.canvas_id == id);
      console.log(match);
      if (match.length == 1) {
        setSelectedComponent(match[0].classname);
        seCanvasInfo(match[0].info);
        setParams(match[0].params);
        setUiParams(match[0].ui_params);
        console.log(match[0].params);
      }
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
    getCanvasList();
    setType(cookies.get("type"));
  }, []);

  const snakeCaseToTitleCase = (input) => {
    return input
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
            {props.mode === "preview" ? (
              <>
                {Object.keys(uiParams).map((key, index) =>
                  uiParams[key].type == "switch" ? (
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="text-white">
                        {snakeCaseToTitleCase(key)}
                      </h1>
                      <Switch
                        checked={uiParams[key].value}
                        onChange={() => {
                          setUiParams((prevJson) => ({
                            ...prevJson,
                            [key]: {
                              ...prevJson[key],
                              value: !prevJson[key].value, // Toggle the value or set a new value as needed
                            },
                          }));
                        }}
                      />
                    </div>
                  ) : uiParams[key].type == "select" ? (
                    <div className="flex flex-row justify-between items-center gap-5">
                      <h1 className="text-white">
                        {snakeCaseToTitleCase(key)}
                      </h1>
                      <Select
                        fullWidth
                        required
                        id="outlined-adornment"
                        value={uiParams[key].value}
                        size="small"
                        onChange={(e) =>
                          setUiParams((prevJson) => ({
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
                        {uiParams[key].list.map((value, index) => (
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
              </>
            ) : (
              <>
                {Object.keys(params).map((key, index) =>
                  params[key].type == "switch" ? (
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="text-white">
                        {snakeCaseToTitleCase(key)}
                      </h1>
                      <Switch
                        checked={params[key].value}
                        onChange={() => {
                          setParams((prevJson) => ({
                            ...prevJson,
                            [key]: {
                              ...prevJson[key],
                              value: !prevJson[key].value, // Toggle the value or set a new value as needed
                            },
                          }));
                        }}
                      />
                    </div>
                  ) : params[key].type == "select" ? (
                    <div className="flex flex-row justify-between items-center gap-5">
                      <h1 className="text-white">
                        {snakeCaseToTitleCase(key)}
                      </h1>
                      <Select
                        fullWidth
                        required
                        id="outlined-adornment"
                        value={params[key].value}
                        size="small"
                        onChange={(e) =>
                          setParams((prevJson) => ({
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
                        {params[key].list.map((value, index) => (
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
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };
  return (
    <div style={{ position: "relative", marginTop: "20px" }}>
      <Zoom in={true}>
        <div className="canvas-container" style={{ minHeight: "40vh" }}>
          {DynamicComponent && (
            <DynamicComponent
              input={props.input}
              setInput={props.setInput}
              ref={ref}
            />
          )}
        </div>
      </Zoom>
      <SettingsMenu />
      <div
        className="flex flex-row p-2"
        style={{ position: "absolute", top: "0", right: "0" }}
      >
        {type === 1 ? (
          <IconButton
            sx={{
              fontSize: "2rem",
              // width: "60px",
              // height: "60px",
            }}
            onClick={() => setSettings(!settings)}
          >
            <SettingsIcon
              sx={{ fontSize: "2rem", color: "white" }}
            ></SettingsIcon>
          </IconButton>
        ) : (
          <></>
        )}

        <IconButton
          sx={{
            fontSize: "2rem",
            // width: "60px",
            // height: "60px",
          }}
          onClick={() => alert(canvasInfo)}
        >
          <InfoIcon sx={{ fontSize: "2rem", color: "white" }}></InfoIcon>
        </IconButton>
      </div>
    </div>
  );
};

export default forwardRef(CanvasContainer);