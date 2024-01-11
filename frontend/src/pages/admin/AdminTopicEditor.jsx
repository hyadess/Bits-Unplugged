import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Title from "../../components/Title";
import TopicController from "../../controller/topicController";
import { TextField, TextField2 } from "../../components/InputFields";
import { setLoading } from "../../App";
const topicController = new TopicController();

const AdminTopicEditor = () => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [type, setType] = useState(-1);
  const { id } = useParams();

  const [topic, setTopic] = useState(null);

  const handleChange = (prop) => (event) => {
    setTopic({ ...topic, [prop]: event.target.value });
  };
  const getTopic = async () => {
    console.log(id);
    const res = await topicController.getTopicById(id);
    if (res.success) {
      setTopic(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  const handleSave = async () => {
    const res = await topicController.updateTopic(id, topic);
    if (res.success) {
      console.log(res);
    }
  };
  useEffect(() => {
    const cookies = new Cookies();
    setType(localStorage.getItem("type"));
    getTopic();
  }, []);
  return (
    topic && (
      <>
        <Title title={topic.name} sub_title={topic.description} />
        <div className="flex flex-col gap-5">
          <TextField2
            label="Topic Name"
            onChange={handleChange}
            value={topic.name}
            id="name"
          />
          <TextField2
            label="Description"
            onChange={handleChange}
            value={topic.description}
            id="description"
          />
          <TextField2
            label="Logo URL"
            onChange={handleChange}
            value={topic.logo}
            id="logo"
          />
          <button
            className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary mt-5"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </>
    )
  );
};

export default AdminTopicEditor;
