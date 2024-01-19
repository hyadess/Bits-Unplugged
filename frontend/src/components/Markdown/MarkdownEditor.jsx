import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import katex from "katex";
import "katex/dist/katex.css";
import { getCodeString } from "rehype-rewrite";

const MarkdownEditor = ({ colorMode, text, setText }) => {
  const calculateNumberOfLines = (content) => {
    return content.split("\n").length;
  };
  return (
    <div data-color-mode={colorMode}>
      <div className="wmde-markdown-var"> </div>
      <MDEditor
        height={85 + 35 * calculateNumberOfLines(text) + text.length / 2}
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
  );
};

export default MarkdownEditor;
