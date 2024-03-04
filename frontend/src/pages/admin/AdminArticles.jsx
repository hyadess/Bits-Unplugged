import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../containers/CardContainer";
import Title from "../../components/Title";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../components/Modal";
import { articleApi, seriesApi, topicApi } from "../../api";
import { setLoading, showSuccess } from "../../App";

import AdminArticleCard from "../../components/Cards/AdminArticleCard";
import PendingArticleCard from "components/Cards/PendingArticleCard";

export default function AdminArticles() {
  const navigate = useNavigate();
  const [pendingList, setPendingList] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const getArticles = async () => {
    const res = await articleApi.getAllArticles();

    if (res.success) {
      console.log("Articles:", res.data);
      // based on approval status put "pending" and "approved" articles in different lists
      const pending = res.data.filter(
        (article) => article.approvalStatus === "pending"
      );
      const approved = res.data.filter(
        (article) => article.approvalStatus === "approved"
      );
      setPendingList(pending);
      setApprovedList(approved);

      setArticleList(res.data);
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

  const deleteArticle = async (articleId) => {
    const res = await articleApi.updateArticle(articleId, {
      approvalStatus: "deleted",
    });
    if (res.success) {
      setApprovedList((prev) =>
        prev.filter((article) => article.id !== articleId)
      );
    }
  };

  const approve = async (articleId) => {
    const res = await articleApi.updateArticle(articleId, {
      approvalStatus: "approved",
    });
    if (res.success) {
      showSuccess("Article approved", res);
      setApprovedList((prev) =>
        prev.concat(pendingList.filter((article) => article.id === articleId))
      );
      setPendingList((prev) =>
        prev.filter((article) => article.id !== articleId)
      );
    }
  };

  const reject = async (articleId) => {
    const res = await articleApi.updateArticle(articleId, {
      approvalStatus: "rejected",
    });
    if (res.success) {
      setPendingList((prev) =>
        prev.filter((article) => article.id !== articleId)
      );
    }
  };

  return (
    <div>
      <Title title={`Pending Articles`} sub_title={`Accept/Reject Articles`} />

      <CardContainer col={2}>
        {pendingList &&
          pendingList.map((article, index) => (
            <PendingArticleCard
              key={index}
              idx={index + 1}
              id={article.id}
              title={article.title}
              path={`/admin/articles/${article.id}`}
              timestamp={article.updatedAt}
              reject={() => reject(article.id)}
              approve={() => approve(article.id)}
              setter={article.setter}
            />
          ))}
      </CardContainer>

      <Title
        title={`Approved Articles`}
        sub_title={`Add/Delete/Update Article`}
      />

      <CardContainer col={2}>
        {approvedList &&
          approvedList.map((article, index) => (
            <AdminArticleCard
              key={index}
              idx={index + 1}
              id={article.id}
              title={article.title}
              article={article}
              path={`/admin/articles/${article.id}`}
              timestamp={article.updatedAt}
              topicList={topicList}
              seriesList={seriesList}
              deleteAction={deleteArticle}
            />
          ))}
      </CardContainer>
    </div>
  );
}
