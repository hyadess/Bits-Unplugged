import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../containers/CardContainer";
import Title from "../../components/Title";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../components/Modal";
import { canvasApi } from "../../api";
const AdminCanvasList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [canvasList, setCanvasList] = useState([]);

  const getCanvasList = async () => {
    const res = await canvasApi.getAllCanvas();
    if (res.success) {
      setCanvasList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    getCanvasList();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getCanvasId = async (name) => {
    const res = await canvasApi.createCanvas(name);
    if (res.success) {
      return res.data.id;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      setLoading(true);
      closeModal();
      const canvasId = await getCanvasId(inputValue);
      navigate(`/admin/canvases/${canvasId}`);
    }
  };

  return (
    <>
      <Title title={`Canvas`} sub_title={`Add/Delete/Update Canvas`} />

      {!loading && (
        <CardContainer col={3}>
          {canvasList.map((canvas, index) => (
            <CustomCard
              key={index}
              id={`Canvas ${index + 1}`}
              name={canvas.name}
              image={canvas.logo}
              path={`/admin/canvases/${canvas.id}`}
              action="View Canvas"
            />
          ))}
        </CardContainer>
      )}

      <div className="fixed bottom-10 z-10 right-10 hidden md:flex items-center justify-center ">
        <div
          onClick={openModal}
          className="w-16 h-16 rounded-full justify-center inline-flex items-center text-white font-medium text-sm p-4 text-center ursor-pointer shadow-lg cursor-pointer bu-button-secondary "
        >
          <div className="text-[#ebebeb] dark:text-gray-900">
            <AddIcon sx={{ fontSize: "4rem" }} />
          </div>
        </div>
      </div>

      <Modal
        placeholder={"Canvas name"}
        label={"Enter Canvas Name"}
        isOpen={modalIsOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
      />
    </>
  );
};

export default AdminCanvasList;
