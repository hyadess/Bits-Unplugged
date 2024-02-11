import React, {
  useState,
  useEffect,
  Suspense,
  useRef,
  forwardRef,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../App";
import { articleApi } from "../../api";
import { useGlobalContext } from "../../store/GlobalContextProvider";
import { set } from "date-fns";
import Title from "components/Title";
import MarkdownPreview from "components/Markdown/MarkdownPreview";
import CanvasContainer from "components/Canvases/CanvasContainer";
import { Button, IconButton, Tooltip } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SendIcon from "@mui/icons-material/Send";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
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
const Canvas = ({
  index,
  onSubmit,
  content,
  onReset,
  articleBackup,
  updateCanvas,
}) => {
  const canvasRef = useRef(null);
  console.log("content for canvas");
  console.log(articleBackup.current.content[index]);
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
          // activityData={problem.activityData}
          // setActivityData={(data) => {
          //   dispatch({
          //     type: "UPDATE_USER_ACTIVITY",
          //     payload: { ...data },
          //   });
          // }}
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
            startIcon={
              <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
            }
          >
            Reset
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={onSubmit}
            endIcon={<SendIcon sx={{ fontSize: "2rem", color: "white" }} />}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  );
};

export default function Article() {
  const { id } = useParams();
  const articleBackup = useRef(null);
  const [article, setArticle] = useState({});

  function getColorModeFromLocalStorage() {
    return localStorage.getItem("color-theme") || "light";
  }
  const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

  const getArticleInfo = async () => {
    const res = await articleApi.getArticleById(id);
    if (res.success) {
      articleBackup.current = JSON.parse(JSON.stringify(res.data));
      setArticle(res.data);
      console.log(article);
      console.log("done");
    }
  };

  const updateCanvas = (index, canvasData) => {
    const newCanvasData = [...article.content];
    newCanvasData[index].canvasData = canvasData;
    setArticle({ ...article, content: newCanvasData });
  };

  const reset = (index) => {
    console.log(articleBackup.current.content);
    updateCanvas(
      index,
      JSON.parse(
        JSON.stringify(articleBackup.current.content[index].canvasData)
      )
    );
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
            return (
              <Canvas
                index={index}
                content={content}
                onReset={reset}
                onSubmit={() => console.log("submit")}
                articleBackup={articleBackup}
                updateCanvas={updateCanvas}
              />
            );
          }
        })}
      {/* <h1>{article.name}</h1>
      <p>{article.content}</p> */}
    </div>
  );
}
