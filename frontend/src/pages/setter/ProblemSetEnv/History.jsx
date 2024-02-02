import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { problemApi } from "../../../api";
import CardContainer from "../../../containers/CardContainer2";
import ProblemSetCard from "../../../components/Cards/ProblemSetCard";
import TableContainer from "../../../containers/TableContainer";
import ProblemVersionCard from "../../../components/Cards/ProblemVersionCard";

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
  useEffect(() => {
    getVersions();
  }, [problemid]);
  return (
    <div className="w-full">
      <TableContainer>
        {versions.map((version) => (
          <ProblemVersionCard
            id={version.id}
            name={version.title}
            canvas={version.canvas.name}
            timestamp={version.updatedAt}
            key={version.id}
            approvalStatus={version.approvalStatus}
          />
        ))}
      </TableContainer>
    </div>
  );
};
export default History;
