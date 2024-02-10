import React, { useState, useEffect, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../App";
import { articleApi } from "../../api";
import { useGlobalContext } from "../../store/GlobalContextProvider";
import { set } from "date-fns";
import Title from "components/Title";
import MarkdownPreview from "components/Markdown/MarkdownPreview";

const Statement = ({ data }) => {
  const { colorMode } = useGlobalContext();
  return (
    <div className="mx-auto max-w-screen-2xl items-center">
      <div className="bu-text-primary  text-left font-light md:text-lg">
        <div
          style={{
            width: "100%",
            paddingTop: "20px",
            fontSize: "25px",
            border: "none",
            borderRadius: "20px",
          }}
        >
          <MarkdownPreview
            colorMode={colorMode}
            text={data ?? ""}
            customStyle={{ padding: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  function getColorModeFromLocalStorage() {
    return localStorage.getItem("color-theme") || "light";
  }
  const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

  const getArticleInfo = async () => {
    const res = await articleApi.getArticleById(id);
    if (res.success) {
      setArticle(res.data);
      console.log(article);
      console.log("done");
    }
  };
  useEffect(() => {
    getArticleInfo();
    setColorMode();
    setLoading(false);
  }, []);

  return (
    <div>
      <Title title={article.title} />
      {article?.content?.length > 0 &&
        article?.content?.map((content, index) => {
          if (content.type === "markdown") {
            return <Statement colorMode={colorMode} data={content.data} />;
          } else if (content.type === "canvas") {
            // return (
            //   <div key={index} className="canvas">
            //     <CanvasContainer
            //       canvasData={content.canvasData}
            //       checkerCanvas={content.checkerCanvas}
            //       checkerCode={content.checkerCode}
            //       editOptions={content.editOptions}
            //       previewOptions={content.previewOptions}
            //     />
            //   </div>
            // );
          }
        })}
      {/* <h1>{article.name}</h1>
      <p>{article.content}</p> */}
    </div>
  );
}
