import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articleApi } from "../../api";
import { setLoading } from "../../App";
import Title from "../../components/Title";

export default function AdminArticleEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  const getArticle = async () => {
    console.log(id);
    const res = await articleApi.getArticleById(id);
    if (res.success) {
      console.log(res.data);
      setArticle(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    article && (
      <div className="flex flex-row justify-between">
        <Title title={article.title} sub_title={article.subtitle} />
      </div>
    )
  );
}
