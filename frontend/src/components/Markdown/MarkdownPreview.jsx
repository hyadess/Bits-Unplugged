import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import MarkdownEditor from "@uiw/react-markdown-editor";
import DefaultMarkdownPreview from "@uiw/react-markdown-preview";
import katex from "katex";
import "katex/dist/katex.css";
import { getCodeString } from "rehype-rewrite";
import "./styles.scss";

const MarkdownPreview = ({ colorMode, text, customStyle }) => {
  const calculateNumberOfLines = (content) => {
    return content.split("\n").length;
  };

  const convert = (text) => {
    let newText = text;
    const regex = /`\$\$(.*)\$\$`/g;
    const matches = newText.match(regex);
    if (matches) {
      matches.forEach((match) => {
        const html = katex.renderToString(
          match.replace(/`\$\$(.*)\$\$`/, "$1"),
          {
            throwOnError: false,
          }
        );
        newText = newText.replace(
          match,
          <code
            dangerouslySetInnerHTML={{ __html: html }}
            style={{ background: "transparent" }}
          />
        );
      });
    }
    console.log("Preview", newText);
    return newText;
  };
  return (
    <div data-color-mode={colorMode} className="text-2xl">
      <div className="wmde-markdown-var "> </div>
      <DefaultMarkdownPreview
        source={text}
        wrapperElement={{
          "data-color-mode": colorMode,
        }}
        className="bg-white dark:bg-gray rounded-[20px] p-5 border-2 text-3xl"
        style={{
          fontSize: "1.4rem",
          background: colorMode === "dark" ? "black" : "white",
          ...customStyle,
        }}
        components={{
          code: ({ children = [], className, ...props }) => {
            if (
              typeof children === "string" &&
              /^\$\$(.*)\$\$/.test(children)
            ) {
              const html = katex.renderToString(
                children.replace(/^\$\$(.*)\$\$/, "$1"),
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
              /^language-katex/.test(className.toLocaleLowerCase())
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
        }}
      />
      {/* <MDEditor
        height={70 + 15 * calculateNumberOfLines(text) + text.length / 1.6}
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
        overflow={true}
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
      /> */}
    </div>
  );
};
export default MarkdownPreview;
