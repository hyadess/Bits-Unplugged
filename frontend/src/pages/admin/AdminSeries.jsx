import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../containers/CardContainer";
import Cookies from "universal-cookie";
import Title from "../../components/Title";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../components/Modal";
import { seriesApi } from "../../api";
const AdminSeries = () => {
  const [type, setType] = useState(-1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [seriesList, setSeriesList] = useState([]);

  const getSeriesList = async () => {
    const res = await seriesApi.getAllSeries();
    if (res.success) {
      setSeriesList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(localStorage.getItem("type"));
    getSeriesList();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getSeriesId = async (name) => {
    const res = await seriesApi.createSeries(name);
    if (res.success) {
      return res.data[0].id;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      setLoading(true);
      closeModal();
      const seriesId = await getSeriesId(inputValue);
      navigate(`/admin/series/${seriesId}`);
    }
  };

  return (
    <>
      <Title title={`Series`} sub_title={`Add/Delete/Update Series`} />

      {!loading && (
        <CardContainer col={3}>
          {seriesList.map((series, index) => (
            <CustomCard
              key={index}
              id={`Series ${index + 1}`}
              name={series.name}
              image={series.logo}
              path={`/admin/series/${series.id}`}
              action="View Series"
            />
          ))}
        </CardContainer>
      )}

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

      <Modal
        placeholder={"Series name"}
        label={"Enter Series Name"}
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

export default AdminSeries;
