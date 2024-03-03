import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storageApi } from "../../../api";
import { setLoading, showSuccess } from "../../../App";
import {
  faAdd,
  faArrowLeft,
  faArrowRight,
  faFloppyDisk,
  faPlay,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import ImageLoader from "components/ImageLoaders/ImageLoader";
import MarkDownContainer from "pages/admin/MarkDownContainer";
import { contestApi } from "api";
import { useContestContext } from "store/ContestContextProvider";

const deepCopy = (obj) => {
  return typeof obj === "string"
    ? JSON.parse(obj)
    : JSON.parse(JSON.stringify(obj));
};

const SlideShow = ({ data, articleId, content, index, onSave }) => {
  const [images, setImages] = useState([]);
  const [serial, setSerial] = useState(0);
  useState(() => {
    console.log(data);
    const newImages = deepCopy(data.images);
    setImages(newImages);
    if (newImages.length > 0) {
      setSerial(0);
    } else {
      setSerial(-1);
    }
  }, [data.images]);
  const { state: contest, dispatch } = useContestContext();
  return (
    <div className="flex flex-col bg-[#fbfbfb] rounded-[30px]">
      <div className="bg-[#fbfbfb] rounded-[30px] flex flex-col h-[32rem]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row p-4 items-start bu-text-primary text-2xl font-semibold">
            {serial + 1}/{images.length}
          </div>
          <div className="flex flex-row p-2 items-center">
            <Tooltip
              title={<h1 className="text-lg text-white">Delete Image</h1>}
              placement="top"
              arrow
              size="large"
            >
              <div className="flex flex-col items-center bu-text-primary font-bold">
                <IconButton
                  sx={{
                    fontSize: "2rem",
                    width: "3rem",
                    height: "3rem",
                  }}
                  onClick={() => {
                    if (serial === -1) return;
                    setImages((prev) => {
                      const newImages = [...prev];
                      newImages.splice(serial, 1);
                      return newImages;
                    });
                    setSerial((prev) => Math.min(prev, images.length - 2));
                  }}
                >
                  <div className="flex items-center bu-text-primary text-3xl">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </div>
                </IconButton>
                <div className="transform translate-y-[-50%] text-sm">
                  Delete
                </div>
              </div>
            </Tooltip>
            <Tooltip
              title={<h1 className="text-lg text-white">Add Image</h1>}
              placement="top"
              arrow
              size="large"
            >
              <input
                type="file"
                id={"fileInput" + index}
                style={{ display: "none" }}
                onChange={(event) => {
                  const file = event.target.files[0];
                  // add this file to images array
                  // insert this file to images array after the current index

                  setImages((prev) => {
                    const newImages = [...prev];
                    const newImage = {
                      url: URL.createObjectURL(file),
                      caption: file.name,
                      status: "new",
                      file: file,
                    };
                    newImages.splice(serial + 1, 0, newImage);
                    return newImages;
                  });
                  setSerial((prev) => prev + 1);
                }}
              />
              <div className="flex flex-col items-center bu-text-primary font-bold">
                <IconButton
                  sx={{
                    fontSize: "2rem",
                    width: "3rem",
                    height: "3rem",
                  }}
                  onClick={() => {
                    document.getElementById("fileInput" + index).click();
                  }}
                >
                  <div className="flex items-center bu-text-primary text-3xl">
                    <FontAwesomeIcon icon={faAdd} />
                  </div>
                </IconButton>
                <div className="transform translate-y-[-50%] text-sm">Add</div>
              </div>
            </Tooltip>
            <Tooltip
              title={<h1 className="text-lg text-white">Save All</h1>}
              placement="top"
              arrow
              size="large"
            >
              <div className="flex flex-col items-center bu-text-primary font-bold">
                <IconButton
                  sx={{
                    fontSize: "2rem",
                    width: "3rem",
                    height: "3rem",
                  }}
                  onClick={async () => {
                    // First list all the images.file that are new
                    let newImageFiles = [];
                    images.forEach((image) => {
                      if (image.status === "new") {
                        newImageFiles.push(image.file);
                      }
                    });

                    if (newImageFiles.length) {
                      // Then upload all the new images
                      const formData = new FormData();
                      newImageFiles.forEach((file, index) => {
                        formData.append("file", file);
                      });
                      console.log(newImageFiles, formData);
                      const res = await storageApi.upload(formData);
                      console.log(res);
                      if (res.success) {
                        const newPaths =
                          newImageFiles.length > 1
                            ? res.data.paths
                            : [res.data.path];
                        // now update the images array with the new paths on status "new"
                        const newImages = [...images];
                        let count = 0;
                        newImages.forEach((image, i) => {
                          if (image.status === "new") {
                            image.url = newPaths[count++];
                            // remove status and file field
                            delete image.status;
                            delete image.file;
                          }
                        });
                        console.log(newImages);

                        const newContent = [...content];
                        newContent[index] = {
                          ...newContent[index],
                          images: newImages,
                        };
                        setImages(newImages);
                        const res2 = await contestApi.updateContest(
                          contest.id,
                          {
                            editorial: newContent,
                          }
                        );

                        if (res2.success) {
                          // console.log(res);
                          showSuccess("Images saved successfully", res2);
                          onSave(newImages);
                        }
                      }
                    } else if (images.length < data.images.length) {
                      // images are deleted
                      const newContent = [...content];
                      newContent[index] = {
                        ...newContent[index],
                        images: images,
                      };
                      const res2 = await contestApi.updateContest(contest.id, {
                        editorial: newContent,
                      });

                      if (res2.success) {
                        // console.log(res);
                        showSuccess("Images saved successfully", res2);
                        // Find which image was deleted by comparing url
                        const deletedImages = data.images
                          .filter((image) => {
                            return !images.find((img) => img.url === image.url);
                          })
                          .map((image) => image.url);
                        console.log(deletedImages);
                        console.log(await storageApi.remove(deletedImages));
                        onSave(images);
                        // update the data.images with the new images
                      }
                    }
                  }}
                >
                  <div className="flex items-center bu-text-primary text-3xl">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </div>
                </IconButton>
                <div className="transform translate-y-[-50%] text-sm">Save</div>
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="h-full flex-center">
          {images?.map((image, i) => {
            return (
              <ImageLoader
                key={i}
                src={image.url}
                alt={image.caption}
                style={{
                  width: "40rem",
                  margin: "auto",
                  display: serial === i ? "block" : "none",
                  pointerEvents: "none",
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
            setSerial((prev) => Math.max(prev - 1, 0));
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>

        <div
          className="flex gap-2 items-center justify-center bu-button-secondary w-full h-full text-2xl "
          // onClick={solutionSubmit}
        >
          <FontAwesomeIcon icon={faPlay} />
        </div>
        <div
          className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
          onClick={() => {
            setSerial((prev) => Math.min(prev + 1, images.length - 1));
          }}
          // style={{
          //   visibility: serial === images.length - 1 ? "hidden" : "visible",
          // }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
      {/* <div className="flex flex-row justify-between w-full p-5">
        <button
          className="text-white font-semibold rounded-lg px-5 py-2 text-center bu-button-primary cursor-pointer flex flex-row gap-3 items-center text-2xl"
          style={{ visibility: serial === 0 ? "hidden" : "visible" }}
          onClick={() => {
            setSerial((prev) => Math.max(prev - 1, 0));
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Prev
        </button>
        <button
          className="text-white font-semibold rounded-lg px-5 py-2 text-center bu-button-primary cursor-pointer flex flex-row gap-3 items-center text-2xl"
          onClick={() => {
            setSerial((prev) => Math.min(prev + 1, images.length - 1));
          }}
          style={{
            visibility: serial === images.length - 1 ? "hidden" : "visible",
          }}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div> */}
    </div>
  );
};

const CustomButton = ({ onClick, label, icon }) => {
  return (
    <button
      className="flex flex-row items-center gap-2 px-5 bu-text-primary border-2 border-black dark:border-white rounded-full hover:bg-[#aadfcf] dark:hover:bg-pink-700 transition-colors duration-500  font-medium"
      onClick={onClick}
    >
      {label}
      {icon}
    </button>
  );
};
const WriteEditorial = ({
  editorial,
  colorMode,
  updateMarkdown,
  addContent,
  deleteContent,
}) => {
  const { state: contest, dispatch } = useContestContext();
  return (
    <div className="flex flex-col justify-between gap-10">
      {editorial?.length > 0 &&
        editorial?.map((content, index) => {
          return (
            <>
              <div className="flex flex-row justify-center items-center gap-5">
                <CustomButton
                  label="Markdown"
                  icon={<FontAwesomeIcon icon={faAdd} />}
                  onClick={() => addContent(index, "markdown")}
                />
                <CustomButton
                  label="Solution"
                  icon={<FontAwesomeIcon icon={faAdd} />}
                  onClick={() => addContent(index, "slideshow")}
                />
                <IconButton
                  sx={{
                    fontSize: "2rem",
                    width: "3rem",
                    height: "3rem",
                  }}
                  onClick={() => deleteContent(index)}
                >
                  <div className="flex flex-row items-center gap-2 bu-text-primary text-2xl">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </div>
                </IconButton>
              </div>
              {content.type === "markdown" ? (
                <MarkDownContainer
                  key={content.boxId}
                  index={index}
                  colorMode={colorMode}
                  text={content.data}
                  setText={updateMarkdown}
                />
              ) : content.type === "slideshow" ? (
                <SlideShow
                  articleId={editorial.id}
                  data={content}
                  content={editorial}
                  index={index}
                  onSave={(images) =>
                    dispatch({
                      type: "UPDATE_EDITORIAL_IMAGES",
                      payload: { index, images },
                    })
                  }
                />
              ) : (
                <></>
              )}
            </>
          );
        })}
    </div>
  );
};

const EditorialEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: contest, dispatch } = useContestContext();
  const [boxCount, setBoxCount] = useState(0);

  function getColorModeFromLocalStorage() {
    return localStorage.getItem("color-theme") || "light";
  }
  const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

  const setEditorial = async () => {
    let max = 0;
    contest.editorial?.forEach((section) => {
      if (section.boxId > max) {
        max = section.boxId;
      }
    });
    setBoxCount(max);
  };

  const saveEditorial = async () => {
    const res = await contestApi.updateContest(contest.id, {
      editorial: contest.editorial,
    });
    if (res.success) {
      showSuccess("Editorial saved successfully", res);
    }
  };

  const updateMarkdown = (index, textData) => {
    dispatch({
      type: "UPDATE_EDITORIAL_MARKDOWN",
      payload: { index, textData },
    });
  };

  const addContent = (index, type) => {
    console.log("Adding new section");
    dispatch({
      type: "ADD_EDITORIAL_SECTION",
      payload: { index, type, id: boxCount + 1 },
    });
    setBoxCount((prev) => prev + 1);
  };

  const deleteContent = (index) => {
    dispatch({ type: "DELETE_EDITORIAL_SECTION", payload: index });
  };

  useEffect(() => {
    setEditorial();
    setLoading(false);
    console.log("Editorial:", contest);
  }, []);

  return (
    contest?.editorial && (
      <div>
        <WriteEditorial
          editorial={contest?.editorial}
          colorMode={colorMode}
          updateMarkdown={updateMarkdown}
          addContent={addContent}
          deleteContent={deleteContent}
        />

        <div className="flex flex-row justify-center items-center gap-5 m-10">
          <CustomButton
            label="Markdown"
            icon={<FontAwesomeIcon icon={faAdd} />}
            onClick={() => addContent(contest?.editorial.length, "markdown")}
          />
          <CustomButton
            label="Solution"
            icon={<FontAwesomeIcon icon={faAdd} />}
            onClick={() => addContent(contest?.editorial.length, "slideshow")}
          />
          <IconButton
            sx={{
              fontSize: "2rem",
              width: "3rem",
              height: "3rem",
            }}
            onClick={() => saveEditorial()}
          >
            <div className="flex flex-row items-center gap-2 bu-text-primary text-2xl">
              <FontAwesomeIcon icon={faFloppyDisk} />
            </div>
          </IconButton>
        </div>
      </div>
    )
  );
};

export default EditorialEditor;
