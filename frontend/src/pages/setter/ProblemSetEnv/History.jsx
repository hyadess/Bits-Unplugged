import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { problemApi } from "../../../api";
import CardContainer from "../../../containers/CardContainer2";
import ProblemSetCard from "../../../components/Cards/ProblemSetCard";
import TableContainer from "../../../containers/TableContainer";
import ProblemVersionCard from "../../../components/Cards/ProblemVersionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { showSuccess } from "../../../App";

const History = () => {
  const { problemid } = useParams();
  const [versions, setVersions] = useState([]);
  const getVersions = async () => {
    console.log(problemid);
    const res = await problemApi.getAllVersions(problemid);
    if (res.success) {
      setVersions(res.data);
      console.log(res.data);
    }
  };
  const updateAll = async () => {
    // Save all with a new api call
    const res = await problemApi.submitProblem(problemid); // Or send through this
    if (res.success) {
      showSuccess("Problem submitted for approval", res);
      getVersions();
    }
  };

  useEffect(() => {
    getVersions();
  }, [problemid]);
  return (
    <div className="flex flex-col gap-5 w-full">
      <button
        className="flex flex-row gap-2 justify-center items-center bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-semibold"
        onClick={updateAll}
      >
        <FontAwesomeIcon icon={faUpload} size="lg" />
        <h1>PUBLISH</h1>
      </button>
      <TableContainer>
        {versions.map((version) => (
          <ProblemVersionCard
            id={version.id}
            name={version.title}
            canvas={version.canvas.name}
            timestamp={version.updatedAt}
            key={version.id}
            approvalStatus={version.approvalStatus}
            feedback={version.feedback}
          />
        ))}
      </TableContainer>
    </div>
  );
};
export default History;
