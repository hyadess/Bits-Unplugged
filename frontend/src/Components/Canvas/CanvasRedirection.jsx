import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Route, useParams } from "react-router-dom";
import GraphComponent from "./GraphComponent";
import TowerOfHanoi from "./TowerOfHanoi";
import CanvasController from "../../controller/canvasController";
import "./CanvasRedirection.scss";
import InfoIcon from "@mui/icons-material/Info";
import { Button } from "@mui/material";

const canvasController = new CanvasController();
const CanvasRedirection = (props, ref) => {
  const id = props.id;
  // const componentName = "GraphComponent";
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [canvasList, setCanvasList] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
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
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div className="canvas-container">
        {DynamicComponent && (
          <DynamicComponent
            input={props.input}
            setInput={props.setInput}
            ref={ref}
          />
        )}
      </div>
      <Button
        variant="raised"
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
          // backgroundColor: "transparent",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          transition: "background-color 0.5s ease", // Add a smooth transition for the hover effect
          "&:hover": {
            backgroundColor: "rgba(15,15,15,0.2)", // Change the background color on hover
          },
        }}
      >
        <InfoIcon sx={{ fontSize: "2rem", color: "white" }}></InfoIcon>
      </Button>
    </div>
  );
};

export default forwardRef(CanvasRedirection);
