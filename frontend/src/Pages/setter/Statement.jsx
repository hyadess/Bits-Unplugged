import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Statement.scss";
import Latex from "react-latex";
import ProblemController from "../../controller/problemController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import MDEditor from "@uiw/react-md-editor";
import MarkdownEditor from "@uiw/react-markdown-editor";
import katex from "katex";
import "katex/dist/katex.css";
import { getCodeString } from "rehype-rewrite";

const problemController = new ProblemController();
function ProblemStatement(props) {
  const { prob_id } = useParams();
  const [text, setText] = useState(props.problemStatement);

  const handleProblemStatementChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setText(props.problemStatement);
  }, [props.problemStatement]);

  const updateStatement = async () => {
    console.log(text);
    props.setStatement(text);
    const res = await problemController.updateStatement(prob_id, text);
    if (res.success) {
      console.log(res);
    }
  };
  const calculateNumberOfLines = (content) => {
    return content.split("\n").length;
  };

  function getColorModeFromLocalStorage() {
    return localStorage.getItem("color-theme") || "light";
  }

  const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

  useEffect(() => {
    const handleStorageChange = (event) => {
      setColorMode(getColorModeFromLocalStorage);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <div className="flex flex-col gap-5 pb-5">
      {/* <div className="flex flex-col md:flex-row gap-0 md:gap-5">
        <textarea
          className="text-area w-full md:w-1/2 m-0 bu-text-primary bu-bg-color hover:border-black leading-normal p-[20px] text-[25px] border-none rounded-[20px] resize-none mt-[20px]"
          placeholder=" "
          value={text}
          style={{ height: "50vh" }}
          onChange={(e) => handleProblemStatementChange(e)}
        ></textarea>

        <div
          className="w-full md:w-1/2 border-2 border-gray-500 dark:border-gray-200 bu-text-primary preview-area"
          style={{
            height: "50vh",
            padding: "20px",
            fontSize: "25px",
            // color: "azure",
            marginTop: "20px",
            // border: "black",
            borderRadius: "20px",
            overflow: "scroll",
          }}
        >
          <h3>
            <Latex>{text}</Latex>
          </h3>
        </div>
      </div> */}

      {/* <MarkdownEditor value={text} onChange={setText} height="200px" /> */}

      <div data-color-mode={colorMode} className="mt-5">
        <div className="wmde-markdown-var"> </div>
        <MDEditor
          height={80 + 35 * calculateNumberOfLines(text) + text.length / 2}
          value={text}
          onChange={setText}
          style={{ borderRadius: "0 0 20px 20px" }}
          visibleDragbar={false}
          previewOptions={{
            components: {
              code: ({ children = [], className, ...props }) => {
                if (
                  typeof children === "string" &&
                  /\$\$(.*)\$\$/.test(children)
                ) {
                  const html = katex.renderToString(
                    children.replace(/\$\$(.*)\$\$/, "$1"),
                    {
                      throwOnError: false,
                    }
                  );
                  return (
                    <code
                      dangerouslySetInnerHTML={{ __html: html }}
                      style={{ background: "transparent" }}
                    />
                  );
                }
                const code =
                  props.node && props.node.children
                    ? getCodeString(props.node.children)
                    : children;
                if (
                  typeof code === "string" &&
                  typeof className === "string" &&
                  /language-katex/.test(className.toLocaleLowerCase())
                ) {
                  const html = katex.renderToString(code, {
                    throwOnError: false,
                  });
                  return (
                    <code
                      style={{ fontSize: "150%" }}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  );
                }
                return <code className={String(className)}>{children}</code>;
              },
            },
          }}
          extraCommands={[]}
          preview="edit"
        />
      </div>
      {}
      <div data-color-mode={colorMode} className="text-2xl">
        <div className="wmde-markdown-var "> </div>
        {/* <MDEditor value={text} onChange={setText} /> */}
        <MDEditor
          height={60 + 35 * calculateNumberOfLines(text) + text.length / 2}
          preview="preview"
          hideToolbar={true}
          enableScroll={false}
          visibleDragbar={false}
          value={text}
          style={{
            whiteSpace: "pre-wrap",
            padding: "20px",
            // fontSize: "23px !important;",
            borderRadius: "20px",
          }}
          previewOptions={{
            components: {
              code: ({ children = [], className, ...props }) => {
                if (
                  typeof children === "string" &&
                  /\$\$(.*)\$\$/.test(children)
                ) {
                  const html = katex.renderToString(
                    children.replace(/\$\$(.*)\$\$/, "$1"),
                    {
                      throwOnError: false,
                    }
                  );
                  return (
                    <code
                      dangerouslySetInnerHTML={{ __html: html }}
                      style={{ background: "transparent" }}
                    />
                  );
                }
                const code =
                  props.node && props.node.children
                    ? getCodeString(props.node.children)
                    : children;
                if (
                  typeof code === "string" &&
                  typeof className === "string" &&
                  /language-katex/.test(className.toLocaleLowerCase())
                ) {
                  const html = katex.renderToString(code, {
                    throwOnError: false,
                  });
                  return (
                    <code
                      style={{ fontSize: "150%" }}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  );
                }
                return <code className={String(className)}>{children}</code>;
              },
            },
          }}
        />
      </div>

      <button
        className="text-white font-medium rounded-lg text-lg px-7 py-3.5 text-center bu-button-primary flex flex-row gap-3 items-center justify-center focus:outline-none"
        onClick={updateStatement}
      >
        <FontAwesomeIcon icon={faFloppyDisk} size="sm" />
        SAVE
      </button>
    </div>
  );
}

export default ProblemStatement;
