import React, {
  useState,
  useEffect,
  Suspense,
  useRef,
  forwardRef,
  useContext,
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
  faPause,
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
import GlobalContext from "store/GlobalContext";
import html2canvas from "html2canvas";
import StatementPreview from "components/StatementPreview";
import CanvasPreview from "pages/CanvasPreview";
import ProblemContextProvider, {
  useProblemContext,
} from "store/ProblemContextProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const deepCopy = (obj) => {
  return typeof obj === "string"
    ? JSON.parse(obj)
    : JSON.parse(JSON.stringify(obj));
};

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

const ArticleCanvas = ({ data }) => {
  const { state: problem, dispatch } = useProblemContext();
  const canvasRef = useRef();

  const setProblem = async () => {
    dispatch({
      type: "SET_INITIAL_STATE",
      payload: deepCopy({
        canvasId: data.canvasId,
        test: deepCopy(data.canvasData),
        testActivity: {},
        checkerCanvas: deepCopy(data.checkerCanvas),
        canvasData: deepCopy(data.canvasData),
        editOptions: deepCopy(data.editOptions),
        previewOptions: deepCopy(data.previewOptions),
        checkerCode: data.checkerCode,
      }),
    });
  };

  useEffect(() => {
    setProblem();
  }, [data]);
  return (
    data.canvasId && (
      <CanvasPreview ref={canvasRef} onSubmit={() => {}} takeSnapshot={false} />
    )
  );
};

const SlideShow = (props) => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  useState(() => {
    setImages(deepCopy(props.images));
  }, [props.images]);

  // If autoPlay is true, then set a timeout to change the index
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        if (index === images.length - 1) setAutoPlay(false);
        else setIndex((prev) => Math.min(prev + 1, images.length - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, index]);

  return (
    <div className="flex flex-col bg-[#fbfbfb] rounded-[30px]">
      <div className="bg-[#fbfbfb] rounded-[30px] flex flex-col h-[32rem]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row p-4 items-start bu-text-primary text-2xl font-semibold">
            {index + 1}/{images.length}
          </div>
        </div>
        <div className="h-full flex-center">
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
        </div>
        {/* <img
          key={index}
          src={images[index]?.url}
          alt={images[index]?.caption}
          style={{ width: "40rem", margin: "auto" }}
        /> */}
      </div>
      <div className="w-full h-[.2rem] bg-gray-200"></div>
      <div className=" rounded-full w-80 mx-auto h-12 flex items-center justify-between gap-1 my-4">
        <div
          className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-l-full text-2xl"
          // style={{ visibility: serial === 0 ? "hidden" : "visible" }}
          onClick={() => {
            setIndex((prev) => Math.max(prev - 1, 0));
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>

        <div
          className="flex gap-2 items-center justify-center bu-button-secondary w-full h-full text-2xl "
          onClick={() => {
            setAutoPlay((prev) => !prev);
          }}
        >
          <FontAwesomeIcon icon={autoPlay ? faPause : faPlay} />
        </div>
        <div
          className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
          onClick={() => {
            setIndex((prev) => Math.min(prev + 1, images.length - 1));
          }}
          // style={{
          //   visibility: serial === images.length - 1 ? "hidden" : "visible",
          // }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
};
export default function Article() {
  const { id } = useParams();
  const { type } = useContext(GlobalContext);
  const articleBackup = useRef(null);
  const [article, setArticle] = useState({});
  const navigate = useNavigate();
  function getColorModeFromLocalStorage() {
    return localStorage.getItem("color-theme") || "light";
  }
  const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

  const getArticleInfo = async () => {
    const res = await articleApi.getArticleById(id);
    if (res.success) {
      articleBackup.current = JSON.parse(JSON.stringify(res.data));
      setArticle(res.data);
      console.log(res.data);
      console.log("done");
    }
  };
  const solutionSubmit = async (verdict) => {
    // await submissionApi.submitSolution(content.canvasData, res.output, id);
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
      <div className="flex flex-row justify-between">
        <Title title={article.title} sub_title={article.subtitle} />
        {type != 0 ? (
          <div className="flex items-center">
            <Tooltip
              title={<h1 className="text-lg text-white">Edit</h1>}
              placement="top"
              arrow
              size="large"
            >
              <IconButton>
                <div
                  data-tooltip-target="tooltip-default"
                  className="bu-text-primary flex cursor-pointer items-center text-4xl"
                  onClick={() => {
                    setLoading(true);
                    navigate(
                      `/${type == 1 ? "setter" : "admin"}/articles/${
                        article.id
                      }/edit`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col gap-5">
        {article?.content?.length > 0 &&
          article?.content?.map((content, index) => {
            if (content.type === "markdown") {
              return <Statement data={content.data} />;
            } else if (content.type === "canvas") {
              return (
                <ProblemContextProvider>
                  <DndProvider backend={HTML5Backend}>
                    <ArticleCanvas data={content} />
                  </DndProvider>
                </ProblemContextProvider>
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
