import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Cookies from "universal-cookie";
import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
import ProblemSetSeriesCard from "../Components/Cards/ProblemSetSeriesCard";
import Title from "../Components/Title";
import AddIcon from "@mui/icons-material/Add";

import Layout4 from "../Components/Layouts/Layout4";
import AdminNavbar from "../Components/navbar/AdminNavbar";
import {
  SelectionField,
  SelectionField2,
  TextArea2,
  TextField,
  TextField2,
} from "../Components/InputFields";

import TopicController from "../controller/topicController";

import CanvasController from "../controller/canvasController";
import { Divider, MenuItem, Select, Switch } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const topicController = new TopicController();

const canvasController = new CanvasController();

const snakeCaseToTitleCase = (input) => {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const CustomSelectionField = (props) => {
  return (
    <div className="w-full">
      <label
        for={props.name}
        class="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <select
        value={props.value}
        type="text"
        name={props.name}
        id={props.id}
        class="border sm:text-sm rounded-lg block w-full p-2.5 bu-input-primary"
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange(props.id)}
      >
        <option value="" disabled hidden></option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const ChoiceList = ({ params, setCanvas, id, property }) => {
  const [newChoice, setNewChoice] = useState();
  useEffect(() => {
    console.log(
      "----------->",
      params ? params[property] : "undefined",
      id,
      property
    );
  }, [params]);

  const handleDelete = (idx) => {
    if (params[property].list[idx] == params[property].value) {
      params[property].value = "";
    }
    params[property].list.splice(idx, 1);
    setCanvas((prevJson) => ({
      ...prevJson,
      [id]: {
        ...prevJson[id],
        [property]: params[property],
      },
    }));
  };
  const handleCreate = () => {
    params[property].list.push(newChoice);
    setNewChoice("");
    setCanvas((prevJson) => ({
      ...prevJson,
      [id]: {
        ...prevJson[id],
        [property]: {
          ...prevJson[id][property],
          list: params[property].list,
        },
      },
    }));
  };
  return (
    <div>
      <div className="bu-nav-color p-5 rounded-lg flex flex-col gap-5">
        {params &&
          params[property].list.map((choice, index) => (
            <>
              <div className="grid grid-cols-2 items-center gap-5">
                <TextField2
                  label="Choice"
                  onChange={(prop) => (e) => {
                    params[property].list[index] = e.target.value;
                    setCanvas((prevJson) => ({
                      ...prevJson,
                      [id]: {
                        ...prevJson[id],
                        [property]: {
                          ...prevJson[id][property],
                          list: params[property].list,
                        },
                      },
                    }));
                  }}
                  value={choice}
                  id={choice}
                ></TextField2>

                <button
                  className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-delete flex flex-row gap-4 items-center mt-7 justify-center"
                  onClick={() => handleDelete(index)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  DELETE
                </button>
              </div>
            </>
          ))}

        <div className="grid grid-cols-2 items-center gap-5">
          <TextField
            label="Choice"
            onChange={setNewChoice}
            value={newChoice}
            id={"new_choice"}
          ></TextField>

          <button
            className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary flex flex-row gap-4 items-center mt-7 justify-center"
            onClick={() => handleCreate()}
          >
            <FontAwesomeIcon icon={faAdd} />
            CREATE
          </button>
        </div>
      </div>

      {/* <hr class="mt-5 sm:mx-auto bu-horizontal-bar" /> */}
    </div>
  );
};

const OptionList = ({ params, setCanvas, id }) => {
  const [newOption, setNewOption] = useState({
    option: "",
    type: "",
    value: "",
  });
  return (
    <div
      className="pt-2 flex flex-col gap-5 mb-5"
      style={{ minHeight: "1rem" }}
    >
      {params &&
        Object.keys(params).map((key, index) => (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-4 items-center gap-5">
              <TextField2
                label="Option"
                onChange={(prop) => (e) => {
                  var keyOrder = Object.keys(params);

                  const prevValue = key;

                  var updatedJson = {};
                  keyOrder.forEach((key2) => {
                    console.log(key2, prevValue);
                    if (key2 === prevValue) {
                      updatedJson[e.target.value] = params[key2];
                    } else {
                      updatedJson[key2] = params[key2];
                    }
                  });

                  console.log(updatedJson);
                  setCanvas((prevJson) => ({
                    ...prevJson,
                    [id]: updatedJson,
                  }));
                }}
                value={key}
                id={key}
              ></TextField2>
              <SelectionField2
                label="Type"
                onChange={(prop) => (e) => {
                  if (
                    params[key].type !== "select" &&
                    e.target.value === "select"
                  ) {
                    setCanvas((prevJson) => ({
                      ...prevJson,
                      [id]: {
                        ...prevJson[id],
                        [key]: {
                          value: "",
                          type: "select",
                          list: [],
                        },
                      },
                    }));
                  } else if (
                    params[key].type !== "switch" &&
                    e.target.value == "switch"
                  ) {
                    setCanvas((prevJson) => ({
                      ...prevJson,
                      [id]: {
                        ...prevJson[id],
                        [key]: {
                          value: false,
                          type: "switch",
                        },
                      },
                    }));
                  }
                }}
                id="series_id"
                value={params[key].type}
                options={[
                  { value: "select", label: "Select" },
                  { value: "switch", label: "Switch" },
                ]}
              />
              {params[key].type == "switch" ? (
                <div className="flex flex-col">
                  <label className="bu-text-primary">{"Default"}</label>
                  <Switch
                    checked={params[key].value}
                    onChange={() => {
                      setCanvas((prevJson) => ({
                        ...prevJson,
                        [id]: {
                          ...prevJson[id],
                          [key]: {
                            ...prevJson[id][key],
                            value: !prevJson[id][key].value, // Toggle the value or set a new value as needed
                          },
                        },
                      }));
                    }}
                  />
                </div>
              ) : params[key].type == "select" ? (
                <div className="flex flex-col justify-between items-center gap-5 w-full">
                  <CustomSelectionField
                    label={"Default"}
                    onChange={(prop) => (e) => {
                      setCanvas((prevJson) => ({
                        ...prevJson,
                        [id]: {
                          ...prevJson[id],
                          [key]: {
                            ...prevJson[id][key],
                            value: e.target.value,
                          },
                        },
                      }));
                    }}
                    id="series_id"
                    value={params[key].value}
                    options={params[key].list}
                  />
                </div>
              ) : (
                <></>
              )}
              <button
                className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-delete flex flex-row gap-4 items-center mt-7 justify-center"
                onClick={() => {
                  delete params[key];
                  setCanvas((prevJson) => ({
                    ...prevJson,
                    [id]: params,
                  }));
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
                DELETE
              </button>
            </div>
            {params[key].type == "select" ? (
              <ChoiceList
                params={params}
                setCanvas={setCanvas}
                id={id}
                property={key}
              />
            ) : (
              <></>
            )}
          </div>
        ))}

      <div className="flex flex-col gap-3 p-5 bu-nav-color rounded-lg">
        <label className="bu-text-primary text-xl font-bold">New Param</label>
        <hr className="bu-horizontal-bar"></hr>
        <div className="grid grid-cols-3 items-center gap-5">
          <TextField2
            label="Option"
            onChange={(prop) => (e) => {
              setNewOption((prevJson) => ({
                ...prevJson,
                option: e.target.value,
              }));
            }}
            value={newOption.option}
            id={"option"}
          ></TextField2>
          <SelectionField2
            label="Type"
            onChange={(prop) => (e) => {
              setNewOption((prevJson) => ({
                ...prevJson,
                type: e.target.value,
              }));
            }}
            id="series_id"
            value={newOption.type}
            options={[
              { value: "select", label: "Select" },
              { value: "switch", label: "Switch" },
            ]}
          />
          <button
            className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary flex flex-row gap-4 items-center mt-7 justify-center"
            onClick={() => {
              if (newOption.option !== "" && newOption.type !== "") {
                if (newOption.type === "switch") {
                  params[newOption.option] = { value: false, type: "switch" };
                } else {
                  params[newOption.option] = {
                    value: "",
                    type: "select",
                    list: [],
                  };
                }
                setCanvas((prevJson) => ({
                  ...prevJson,
                  [id]: params,
                }));
                setNewOption({
                  option: "",
                  type: "",
                  value: "",
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faAdd} />
            CREATE NEW PARAM
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminCanvasEditor = () => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const ref = useRef(null);
  const editorRef = useRef(null);
  const [type, setType] = useState(-1);
  const { id } = useParams();
  const [canvas, setCanvas] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (prop) => (event) => {
    setCanvas({ ...canvas, [prop]: event.target.value });
  };
  const handleParamChange = (prop) => (event) => {
    setCanvas({ ...canvas, [prop]: event.target.value });
  };
  const getCanvas = async () => {
    const res = await canvasController.getCanvasById(id);
    if (res.success) {
      setCanvas(res.data[0]);
      setLoading(false);
      console.log(res);
    }
  };

  const handleSave = async () => {
    const res = await canvasController.updateCanvas(id, canvas);
    if (res.success) {
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));
    getCanvas();

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (editorRef.current) {
      editorRef.current.layout(); // Trigger Monaco Editor layout update on resize
    }
  };

  const editorMount = (editor, monaco) => {
    ref.current = editor;
  };
  const codeChanged = () => {
    setCanvas({ ...canvas, template: ref.current.getValue() });
  };
  return (
    <Layout4 nav={<AdminNavbar />}>
      <Title title={canvas.name} sub_title={canvas.description} />
      <div className="flex flex-col gap-5">
        <TextArea2
          label="Canvas Name"
          onChange={handleChange}
          value={canvas.name}
          id="name"
        />
        <TextArea2
          label="Info"
          onChange={handleChange}
          value={canvas.info}
          id="info"
        />
        <TextArea2
          label="Logo URL"
          onChange={handleChange}
          value={canvas.logo}
          id="logo"
        />

        <label for="template" class="block text-sm font-medium bu-text-primary">
          Template
        </label>
        <div className="w-full h-96">
          <Editor
            ref={editorRef}
            height="100%" // Set the height to 100% of its parent div
            className="white-border"
            language="javascript"
            theme="vs-dark"
            value={canvas.template}
            onMount={editorMount}
            onChange={codeChanged}
            options={{
              inlineSuggest: true,
              fontSize: "13px",
              formatOnType: true,
              autoClosingBrackets: true,
              minimap: { enabled: false },
              tabSize: 2,
              // automaticLayout: true,
            }}
          />
        </div>
        <div className="bu-bg-title text-white p-5 rounded-md text-2xl font-bold">
          Design Params
        </div>
        <OptionList params={canvas.params} setCanvas={setCanvas} id="params" />
        <div className="bu-bg-title text-white p-5 rounded-md text-2xl font-bold">
          UI Params
        </div>
        <OptionList
          params={canvas.ui_params}
          setCanvas={setCanvas}
          id="ui_params"
        />
        <div className="bu-bg-title text-white p-5 rounded-md text-2xl font-bold">
          Control Params
        </div>
        <OptionList
          params={canvas.control_params}
          setCanvas={setCanvas}
          id="control_params"
        />
        <div></div>
        <button
          className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </Layout4>
  );
};

export default AdminCanvasEditor;
