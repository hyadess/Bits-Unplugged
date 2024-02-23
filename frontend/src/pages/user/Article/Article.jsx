import React, {
  useState,
  useEffect,
  Suspense,
  useRef,
  forwardRef,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../../App";
import { articleApi, submissionApi } from "../../../api";
import { useGlobalContext } from "../../../store/GlobalContextProvider";
import { set } from "date-fns";
import Title from "components/Title";
import MarkdownPreview from "components/Markdown/MarkdownPreview";
import CanvasContainer from "components/Canvases/CanvasContainer";
import { Button, IconButton, Tooltip } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SendIcon from "@mui/icons-material/Send";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCaretRight,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import SubmissionService from "services/submissionService";
import ImageLoader from "components/ImageLoaders/ImageLoader";
import { Save } from "@mui/icons-material";
import {
  faCamera,
  faCameraRetro,
  faCode,
  faObjectGroup,
  faPlay,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
const Statement = ({ data }) => {
  const { colorMode } = useGlobalContext();
  return (
    <div className="mx-auto items-center w-full">
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
      <div className="flex w-full flex-col">
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
        <div className=" rounded-full w-80 mx-auto h-12 flex items-center justify-between gap-1 my-4">
          <div
            className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-l-full text-2xl"
            onClick={onReset}
          >
            {/* <RotateLeftIcon /> */}
            <FontAwesomeIcon icon={faRotateRight} />
          </div>

          <div
            className="flex gap-2 items-center justify-center bu-button-secondary w-full h-full text-2xl "
            onClick={() => onSubmit(content)}
          >
            <FontAwesomeIcon icon={faPlay} />
            {/* RUN */}
          </div>
          <div
            className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
            onClick={() => {
              // updateSolutionChecker();
            }}
          >
            {/* SAVE */}
            <FontAwesomeIcon icon={faCameraRetro} />
          </div>
        </div>
      </div>
    )
  );
};

const deepCopy = (obj) => {
  return typeof obj === "string"
    ? JSON.parse(obj)
    : JSON.parse(JSON.stringify(obj));
};

const SlideShow = (props) => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useState(() => {
    setImages(deepCopy(props.images));
  }, [props.images]);

  return (
    <>
      <div className="bu-card-primary pb-10 rounded-[30px] flex flex-col min-h-[25rem]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row p-4 items-start bu-text-primary text-2xl font-semibold">
            {index + 1}/{images.length}
          </div>
        </div>
        {images.map((image, i) => {
          return (
            <img
              key={i}
              src={image.url}
              alt={image.caption}
              style={{
                width: "40rem",
                margin: "auto",
                display: index === i ? "block" : "none",
              }}
            />
          );
        })}
        {/* <img
          key={index}
          src={images[index]?.url}
          alt={images[index]?.caption}
          style={{ width: "40rem", margin: "auto" }}
        /> */}
      </div>
      <div className="flex flex-row justify-between w-full">
        <button
          className="text-white font-semibold rounded-lg px-5 py-2 text-center bu-button-primary cursor-pointer flex flex-row gap-3 items-center text-2xl"
          style={{ visibility: index === 0 ? "hidden" : "visible" }}
          onClick={() => {
            setIndex((prev) => Math.max(prev - 1, 0));
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Prev
        </button>
        <button
          className="text-white font-semibold rounded-lg px-5 py-2 text-center bu-button-primary cursor-pointer flex flex-row gap-3 items-center text-2xl"
          onClick={() => {
            setIndex((prev) => Math.min(prev + 1, images.length - 1));
          }}
          style={{
            visibility: index === images.length - 1 ? "hidden" : "visible",
          }}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
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
  const solutionSubmit = async (content) => {
    let res = await SubmissionService.checkSolution(
      content.checkerCode,
      typeof content.checkerCanvas === "string"
        ? JSON.parse(content.checkerCanvas)
        : content.checkerCanvas,
      typeof content.canvasData === "string"
        ? JSON.parse(content.canvasData)
        : content.canvasData,
      content.activityData ?? {}
    );
    await submissionApi.submitSolution(content.canvasData, res.output, id);
  };

  const updateCanvas = (index, canvasData) => {
    setArticle((prev) => {
      const newContent = [...prev.content];
      newContent[index].canvasData = canvasData;
      return { ...prev, content: newContent };
    });
  };

  const updateActivity = (index, activityData) => {
    setArticle((prev) => {
      const newContent = [...prev.content];
      newContent[index].activityData = activityData;
      return { ...prev, content: newContent };
    });
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
      <div className="flex flex-col gap-5">
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
                  onSubmit={solutionSubmit}
                  articleBackup={articleBackup}
                  updateCanvas={updateCanvas}
                  updateActivity={updateActivity}
                />
              );
            } else if (content.type === "slideshow") {
              return (
                content.images.length && <SlideShow images={content.images} />
              );
            } else if (content.type === "image") {
              return (
                content.image && (
                  <ImageLoader
                    // key={i}
                    src={content.image.url}
                    // alt={image.caption}
                    style={{
                      width: "40rem",
                      margin: "auto",
                      pointerEvents: "none",
                    }}
                  />
                )
              );
            }
          })}
      </div>
    </div>
  );
}
