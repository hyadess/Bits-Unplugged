import React, { useState, useEffect, useRef } from "react";
import { Route, useParams } from "react-router-dom";
import GraphComponent from "./GraphComponent";
import TowerOfHanoi from "./TowerOfHanoi";
import CanvasController from "../../controller/canvasController";
import "./CanvasContainer.scss";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
const canvasController = new CanvasController();
const CanvasContainer = (props) => {
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

  let canvasRef = useRef();
  return (
    <div className="canvas-container">
      <div>
        {DynamicComponent && (
          <DynamicComponent
            input={props.input}
            setInput={props.setInput}
            ref={canvasRef}
          />
        )}
      </div>
      <div>
        <Button onClick={canvasRef.current.handleSave}>
          <SaveIcon sx={{ fontSize: "2rem", color: "white" }} />
        </Button>

        <Button onClick={canvasRef.current.handleReset}>
          <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
        </Button>
      </div>
    </div>
  );
};

export default CanvasContainer;
