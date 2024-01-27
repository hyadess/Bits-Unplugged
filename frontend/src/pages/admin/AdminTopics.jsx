import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../containers/CardContainer2";
import Cookies from "universal-cookie";
import Title from "../../components/Title";
import Modal from "../../components/Modal";
import AddIcon from "@mui/icons-material/Add";
import { topicApi } from "../../api";
import TopicCard from "../../components/Cards/AdminTopicCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faCrosshairs,
  faFloppyDisk,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { showSuccess } from "../../App";

function DraggableTopicCard({
  id,
  name,
  index,
  moveCard,
  topic,
  setTopic,
  deleteTopic,
  isEdit,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => ({ id, index }),
    canDrag: () => isEdit, // Only allow dragging when isEdit is true
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (item.index !== index && monitor.isOver({ shallow: true })) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <TopicCard
        key={topic.id}
        id={topic.id}
        name={topic.name}
        image={topic.logo}
        path={`/admin/topics/${topic.id}`}
        action="View Series"
        isLive={topic.isLive}
        setTopic={setTopic}
        deleteAction={deleteTopic}
        isEdit={isEdit}
      />
    </div>
  );
}

const AdminTopics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const topicListRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const getTopicList = async () => {
    const res = await topicApi.getAllTopics();
    if (res.success) {
      setTopicList(res.data);
      topicListRef.current = res.data;
      setLoading(false);
      // console.log(res);
    }
  };

  const deleteTopic = async (topicId) => {
    setTopicList((prev) => prev.filter((topic) => topic.id !== topicId));
  };
  const setTopic = (id, data) => {
    // set topic in given id with given data
    setTopicList((prev) =>
      prev.map((topic) => (topic.id === id ? { ...topic, ...data } : topic))
    );
  };
  useEffect(() => {
    getTopicList();
  }, []);
  const moveCard = (dragIndex, hoverIndex) => {
    setTopicList((prevState) => {
      const dragCard = prevState[dragIndex];
      const copiedStateArray = [...prevState];
      // Remove the dragged card from its original position
      copiedStateArray.splice(dragIndex, 1);
      // Insert it to the new position
      copiedStateArray.splice(hoverIndex, 0, dragCard);
      return copiedStateArray;
    });
  };
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
      navigate(`/admin/topics/${topicId}`);
    }
  };

  const handleSave = async () => {
    // update all topics
    const topics = topicList.map((topic, index) => ({
      ...topic,
      serialNo: topicList.length - index, // if you want the serial number to start from 1 instead of 0
    }));
    
    const res = await topicApi.updateTopics(topics);
    if (res.success) {
      topicListRef.current = topics;
      setTopicList(topics);
      showSuccess("Changes are saved", res);
    }
  };
  const handleCancel = async (e) => {
    // update all topics
    setTopicList(topicListRef.current);
  };

  const saveTopicSerial = async () => {
    const serials = [];
    for (let i = 0; i < topicList.length; i++) {
      serials.push({
        topicId: topicList[i].id,
        serialNo: topicList.length - i,
      });
    }
    const res = await topicApi.updateTopicSerial(serials);
    if (res.success) {
      showSuccess("Topic order is saved", res);
    }
  };
  return (
    // <GridContextProvider onChange={onChange}>
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-row justify-between">
          <Title title={`Topics`} sub_title={`Add/Delete/Update Topics`} />
          {isEdit ? (
            <div className="flex flex-row gap-4">
              <div className="flex items-center">
                <button
                  className="bu-button-delete rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
                  onClick={async () => {
                    handleCancel();
                    setIsEdit((prev) => !prev);
                  }}
                >
                  <div className="flex flex-row items-center gap-4  w-[7rem] justify-center">
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                    DISCARD
                  </div>
                </button>
              </div>
              <div className="flex items-center">
                <button
                  className="bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
                  onClick={async () => {
                    await handleSave();
                    setIsEdit((prev) => !prev);
                  }}
                >
                  <div className="flex flex-row items-center gap-4 w-[7rem] justify-center">
                    <FontAwesomeIcon icon={faFloppyDisk} size="lg" />
                    SAVE
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <button
                className="bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
                onClick={() => {
                  setIsEdit((prev) => !prev);
                }}
              >
                <div className="flex flex-row items-center gap-4  w-[7rem] justify-center">
                  <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                  EDIT
                </div>
              </button>
            </div>
          )}
        </div>

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
          <CardContainer col={2}>
            {topicList.map((topic, index) => (
              <DraggableTopicCard
                key={topic.id}
                id={topic.id}
                name={topic.name}
                index={index}
                moveCard={moveCard}
                topic={topic}
                setTopic={setTopic}
                deleteTopic={deleteTopic}
                isEdit={isEdit}
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
      </DndProvider>
    </>
  );
};

export default AdminTopics;
