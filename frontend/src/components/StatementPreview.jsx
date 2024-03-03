import { useProblemContext } from "store/ProblemContextProvider";
import MarkdownPreview from "./Markdown/MarkdownPreview";

const StatementPreview = ({ colorMode }) => {
  const { state: problem, dispatch } = useProblemContext();
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
            text={problem.statement ?? ""}
            customStyle={{ padding: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatementPreview;
