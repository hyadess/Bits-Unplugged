import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../containers/CardContainer";
import Cookies from "universal-cookie";
import Title from "../../components/Title";
import TopicCard from "../../components/Cards/TopicCard";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Layout4 from "../../components/Layouts/Layout4";
import Modal from "../../components/Modal";
import TopicController from "../../controller/topicController";
import AddIcon from "@mui/icons-material/Add";
import { topicApi } from "../../api";
const topicController = new TopicController();

const AdminTopics = () => {
  const [type, setType] = useState(-1);
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const [loading, setLoading] = useState(false);
  const [topicList, setTopicList] = useState([]);

  const getTopicList = async () => {
    const res = await topicApi.getAllTopics();
    if (res.success) {
      setTopicList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(localStorage.getItem("type"));
    getTopicList();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getTopicId = async (name) => {
    const res = await topicApi.createTopic(name);
    if (res.success) {
      return res.data.id;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted: ", inputValue);
    if (inputValue !== "") {
      setLoading(true);
      closeModal();
      const topicId = await getTopicId(inputValue);
      switchPath(`/admin/topics/${topicId}`);
    }
  };

  return (
    <>
      <Title title={`Topics`} sub_title={`Add/Delete/Update Topics`} />
      <div className="fixed bottom-10 z-10 right-10 hidden md:flex items-center justify-center ">
        <div
          onClick={openModal}
          className="w-16 h-16 rounded-full justify-center inline-flex items-center text-white font-medium text-sm p-4 text-center ursor-pointer shadow-lg cursor-pointer bu-button-secondary "
        >
          <div className="text-primary-900 dark:text-gray-900">
            <AddIcon sx={{ fontSize: "4rem" }} />
          </div>
        </div>
      </div>
      {!loading && (
        <CardContainer col={3}>
          {topicList.map((topic, index) => (
            <CustomCard
              key={index}
              id={`Topic ${index + 1}`}
              name={topic.name}
              image={topic.logo}
              path={`/admin/topics/${topic.id}`}
              action="View Topic"
            />
          ))}
        </CardContainer>
      )}

      <Modal
        placeholder={"Topic name"}
        label={"Enter Topic Name"}
        isOpen={modalIsOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onChange={(e) => {
          setInputValue(e.target.value);
          console.log(e.target.value);
        }}
        value={inputValue}
      />
    </>
  );
};

export default AdminTopics;
