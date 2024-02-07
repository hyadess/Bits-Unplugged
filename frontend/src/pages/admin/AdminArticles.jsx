import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../containers/CardContainer";
import Title from "../../components/Title";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../components/Modal";
import { articleApi, seriesApi, topicApi } from "../../api";
import { setLoading } from "../../App";

import AdminArticleCard from "../../components/Cards/AdminArticleCard";

export default function AdminArticles() {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);

  const getArticles = async () => {
    const res = await articleApi.getAllArticles();

    if (res.success) {
      setArticleList(res.data);
      console.log(res.data);
      setLoading(false);
    }
  };

  const getTopicList = async () => {
    const res = await topicApi.getAllTopics();
    if (res.success) {
      setTopicList(res.data);
      console.log(res);
    }
  };

  const getSeriesList = async () => {
    const res = await seriesApi.getAllSeries();
    if (res.success) {
      setSeriesList(res.data);
      console.log(res);
    }
  };
  useEffect(() => {
    getArticles();
    getSeriesList();
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

  const getArticleId = async (name) => {
    const res = await articleApi.createArticle(name);
    if (res.success) {
      return res.data.id;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      setLoading(true);
      closeModal();
      const articleId = await getArticleId(inputValue);
      navigate(`/admin/articles/${articleId}`);
    }
  };

  const deleteArticle = async (articleId) => {
    const res = await articleApi.deleteArticle(articleId);
    if (res.success) {
      setArticleList((prev) =>
        prev.filter((article) => article.id !== articleId)
      );
    }
  };

  return (
    <div>
      <Title title={`Articles`} sub_title={`Add/Delete/Update Article`} />

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

      <CardContainer col={2}>
        {articleList &&
          articleList.map((problem, index) => (
            <AdminArticleCard
              key={index}
              idx={index + 1}
              id={problem.id}
              name={problem.title}
              image={problem.logo}
              problem={problem}
              path={`/admin/articles/${problem.id}`}
              action="Get Started"
              canvas={problem.canvas?.name}
              timestamp={problem.updatedAt}
              topicList={topicList}
              seriesList={seriesList}
              deleteAction={deleteArticle}
            />
          ))}
      </CardContainer>

      <Modal
        placeholder={"Article title"}
        label={"Enter Article title"}
        isOpen={modalIsOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
      />
    </div>
  );
}
