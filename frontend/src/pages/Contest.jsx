import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import { showSuccess } from "../App";
import { contestApi } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import ContestProblem from "./ContestProblem";
import LayoutMain from "../components/Layouts/LayoutMain";
import Leaderboard from "./Timer";
import CountdownTimer from "./Timer";



// ... other imports

const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const { problemid } = useParams();
    const [selectedProblemId, setSelectedProblemId] = useState(null);
  
    useEffect(() => {
      getProblems();
    }, []);
  
    const getProblems = async () => {
      const res = await contestApi.getAllProblemsByContest(id);
      if (res.success) {
        const sortedProblems = res.data.sort((a, b) => a.rating - b.rating);
        setProblems(sortedProblems);
      }
      return res;
    };
  
    const handleProblemClick = (problemId) => {
      (problemId=="details")? 
      navigate(`/contests/${id}`) : navigate(`/contests/${id}/problems/${problemId}`);
      setSelectedProblemId(problemId);
    };
  
    return (
      <div className="flex flex-col gap-5">
        <div className="max-h-[80vh] overflow-y-auto">
          <div
            className={`flex flex-col items-left mb-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer relative w-[15vw] h-[10vh] ${
              problemid === "details" ? "bg-gray-100" : ""
            } ${selectedProblemId === "details" ? "bg-gray-100" : ""}`}
            onClick={() => handleProblemClick("details")}
          >
            <span className="font-medium text-gray-800 text-lg hover:underline">
              DETAILS
            </span>
          </div>
          {problems?.map((problem) => (
            <div
              key={problem.id}
              className={`flex flex-col items-left mb-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer relative w-[15vw] h-[10vh] ${
                selectedProblemId === problem.id ? "bg-gray-100" : ""
              }`}
              onClick={() => handleProblemClick(problem.id)}
            >
              <span className="font-medium text-gray-800 text-lg hover:underline">
                {problem.title}
              </span>
              <div className="absolute bottom-2 right-2 flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
                <h3 className="bu-text-subtitle font-semibold text-sm">
                  {problem.rating}
                </h3>
                <FontAwesomeIcon icon={faFire} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // ... rest of the code
  
  
  

// Inside the UserContest component
const UserContest = () => {
  const { id } = useParams();
  const { problemid } = useParams();
  let endTime;

  useEffect(() => {
    // Call a function to fetch contest details and get the contest duration
    const fetchContestDetails = async () => {
      try {
        const contest = await contestApi.getContestById(id);
        if (contest.success) {
          const contestDuration = contest.data[0].duration * 60 * 60 * 1000;
          const startDateTime = new Date(contest.data[0].startDateTime);
          endTime = new Date(startDateTime.getTime() + contestDuration);
        }
      } catch (error) {
        console.error("Error fetching contest details", error);
      }
    };

    fetchContestDetails();

    // Cleanup function
    return () => {
      // Add any cleanup logic if needed
    };
  }, []); // Removed 'id' from the dependency array

  return (
    <LayoutMain
      left={<ProblemList />}
      //right={<CountdownTimer targetDate={endTime} flag={"end"} />}
    >
      {problemid && <ContestProblem />}
    </LayoutMain>
  );
};

export default UserContest;
