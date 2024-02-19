import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articleApi } from "../../api";
import { setLoading } from "../../App";
import { useGlobalContext } from "store/GlobalContextProvider";
import Title from "../../components/Title";
import MarkDownContainer from "./MarkDownContainer";
import { faAdd, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CanvasContainer from "components/Canvases/CanvasContainer";
import { Button } from "react-day-picker";
import { SendIcon } from "lucide-react";
import { RotateLeft } from "@mui/icons-material";

const Canvas = ({
  index,
  onSubmit,
  content,
  onReset,
  articleBackup,
  updateCanvas,
  updateActivity,
}) => {
  const canvasRef = useRef(null);

  const reset = () => {
    onReset(index);
    canvasRef?.current?.handleReset(
      JSON.parse(
        JSON.stringify(articleBackup.current.content[index].canvasData)
      )
    );
  };

  return (
    content.canvasId && (
      <div className="flex w-full flex-col gap-5">
        <CanvasContainer
          canvasId={content.canvasId}
          input={content.canvasData}
          setInput={(canvasData) => {
            updateCanvas(index, canvasData);
          }}
          mode={"preview"}
          ref={canvasRef}
          editOptions={content.editOptions}
          previewOptions={content.previewOptions}
          activityData={content.activityData}
          setActivityData={(activityData) => {
            updateActivity(index, activityData);
          }}
        />
        <div className="flex flex-row justify-between">
          <Button
            size="large"
            variant="contained"
            color="success"
            onClick={() => {
              reset();
              // canvasRef.current.handleReset(); // Call this after reset
            }}
            startIcon={<RotateLeft sx={{ fontSize: "2rem", color: "white" }} />}
          >
            Reset
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              console.log("inside submit");
              console.log(content.activityData);

              onSubmit(content);
            }}
            endIcon={<SendIcon sx={{ fontSize: "2rem", color: "white" }} />}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  );
};
const WriteArticle = ({
  article,
  colorMode,
  updateMarkdown,
  addMarkdown,
  deleteMarkdown,
}) => {
  //console.log("inside article writing");
  // const reset = (index) => {
  //   // console.log(articleBackup.current.content);
  //   updateCanvas(
  //     index,
  //     JSON.parse(
  //       JSON.stringify(articleB.current.content[index].canvasData)
  //     )
  //   );
  // };

  return (
    <div className="flex flex-col justify-between">
      {article?.content?.length > 0 &&
        article?.content?.map((content, index) => {
          if (content.type === "markdown") {
            console.log("write markdown", index);
            return (
              <MarkDownContainer
                key={content.boxId}
                index={index}
                colorMode={colorMode}
                text={content.data}
                setText={updateMarkdown}
                onAdd={() => addMarkdown(index)}
                onDelete={() => deleteMarkdown(index)}
              />
            );
          } else if (content.type === "canvas") {
            // return (
            //   <Canvas
            //     index={index}
            //     content={content}
            //     onReset={reset}
            //     onSubmit={solutionSubmit}
            //     articleBackup={articleBackup}
            //     updateCanvas={updateCanvas}
            //     updateActivity={updateActivity}
            //   />
            // );
          }
        })}
    </div>
  );
};

const AdminArticleEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const articleBackup = useRef(null);
  const [boxCount, setBoxCount] = useState(0);

  function getColorModeFromLocalStorage() {
    return localStorage.getItem("color-theme") || "light";
  }
  const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

  const getArticleInfo = async () => {
    const res = await articleApi.getArticleById(id);
    if (res.success) {
      articleBackup.current = JSON.parse(JSON.stringify(res.data));
      setArticle(res.data);
      //set box count as the max box id
      let max = 0;
      res.data.content.forEach((content) => {
        if (content.boxId > max) {
          max = content.boxId;
        }
      });
      setBoxCount(max);

      // dispatch({
      //   type: "SET_INITIAL_STATE",
      //   payload: JSON.parse(
      //     JSON.stringify({
      //       ...res.data,
      //       test: null,
      //       testActivity: {},
      //       checkerCanvas: res.data.checkerCanvas ?? res.data.canvasData,
      //     })
      //   ),
      // });
      console.log(article);
      console.log("done");
    }
  };
  const saveArticle = async () => {
    const res = await articleApi.updateArticle(id, article);
    if (res.success) {
      console.log("Article Updated");
    }
  };

  const updateMarkdown = (index, textData) => {
    setArticle((prev) => {
      const newContent = [...prev.content];
      newContent[index].data = textData;
      return { ...prev, content: newContent };
    });
  };

  const addMarkdown = (index) => {
    setArticle((prev) => {
      let newContent = [...prev.content];
      newContent.splice(index, 0, {
        boxId: boxCount + 1,
        data: "type here",
        type: "markdown",
      });
      setBoxCount((prev) => prev + 1);
      return { ...prev, content: newContent };
    });
  };

  const deleteMarkdown = (index) => {
    setArticle((prev) => {
      let newContent = [...prev.content];
      newContent.splice(index, 1);
      return { ...prev, content: newContent };
    });
  };

  useEffect(() => {
    getArticleInfo();
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(article);
    //WriteArticle();
  }, [article]);

  return (
    article && (
      <div>
        <div className="flex flex-row justify-between">
          <Title title={article.title} sub_title={article.subtitle} />
        </div>
        <WriteArticle
          article={article}
          colorMode={colorMode}
          updateMarkdown={updateMarkdown}
          addMarkdown={addMarkdown}
          deleteMarkdown={deleteMarkdown}
        />

        <div className="flex justify-center">
          <div className="mx-6 pd-2">
            <button
              className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400"
              onClick={() => addMarkdown(article.content.length - 1)}
            >
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
          <div className="mx-6 pd-2">
            <button
              className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400"
              onClick={() => saveArticle()}
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AdminArticleEditor;
