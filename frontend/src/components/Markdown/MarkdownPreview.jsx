import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Latex from "react-latex";
import ProblemController from "../../controller/problemController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import MDEditor from "@uiw/react-md-editor";
import MarkdownEditor from "@uiw/react-markdown-editor";
import katex from "katex";
import "katex/dist/katex.css";
import { getCodeString } from "rehype-rewrite";
import "./styles.scss";

const MarkdownPreview = ({ colorMode, text, customStyle }) => {
  const calculateNumberOfLines = (content) => {
    return content.split("\n").length;
  };
  return (
    <div data-color-mode={colorMode} className="text-2xl">
      <div className="wmde-markdown-var "> </div>
      <MDEditor
        height={70 + 35 * calculateNumberOfLines(text) + text.length / 2}
        preview="preview"
        hideToolbar={true}
        enableScroll={false}
        visibleDragbar={false}
        value={text}
        style={{
          whiteSpace: "pre-wrap",
          paddingTop: "5px",
          // fontSize: "23px !important;",
          borderRadius: "20px",
          ...customStyle, // Merge props.style here
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
  );
};
export default MarkdownPreview;
