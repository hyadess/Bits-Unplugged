import { faTrashCan, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MarkdownEditor from "components/Markdown/MarkdownEditor";
import MarkdownEditor2 from "components/Markdown/MarkdownEditor2";
import { React, useState } from "react";

export default function MarkDownContainer({
  text,
  setText,
  index,
  onDelete,
  onAdd,
  colorMode,
}) {
  const [cur, setCur] = useState(text);
  const IntermediateSet = (value) => {
    setCur(value);
    setText(index, value);
  };
  return (
    <div className="flex flex-col my-10 mx-10 mb-4">
      <div className="flex justify-center items-center ">
        <div className="mx-6">
          <button
            className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400"
            onClick={onDelete}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
        <div className="mx-6 pd-2">
          <button
            className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400"
            onClick={onAdd}
          >
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>
      </div>

      <div>
        <MarkdownEditor
          text={cur}
          setText={IntermediateSet}
          colorMode={colorMode}
        />
      </div>
    </div>
  );
}
