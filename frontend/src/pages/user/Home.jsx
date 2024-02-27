import { problemApi } from "api";
import RecentProblems from "./RecentProblems";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import { userActivityApi, recommendationApi } from "../../api";
import RecommendationCard from "components/Cards/RecommendationCard";
import Title from "../../components/Title";
import TableContainer from "../../containers/TableContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheckToSlot,
  faFire,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function UserHome() {
  const [problems, setProblems] = useState([]);
  const [recomType, setRecomType] = useState("series-hunter");
  const tags = ["series-hunter", "rating-burner"];

  const getRecommendedProblems = async () => {
    if (recomType === "series-hunter") {
      const res = await recommendationApi.getRecommendationbySeries();
      if (res.success) {
        console.log("series-hunter recommend", res);
        setProblems(res.data);
        setLoading(false);
      }
    } else if (recomType == "rating-burner") {
      const res = await recommendationApi.getRecommendationByRating();
      if (res.success) {
        console.log("rating-burner recommend", res);
        setProblems(res.data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getRecommendedProblems();
  }, []);
  useEffect(() => {
    getRecommendedProblems();
  }, [recomType]);

  return (
    <div>
      {problems.length > 0 && (
        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <Title
              title={"Recommended Problems"}
              //sub_title={"The best problems for you to solve right now"}
            />
            <div className="flex flex-wrap mt-1">
              {tags.map((tag, index) => (
                <div className="mx-1">
                  <button
                    key={index}
                    className="bg-white hover:bg-blue-100 text-red-800 font-dark px-4 py-1 pt-2 pb-2 rounded-full shadow-md text-large transition duration-300 ease-in-out"
                    onClick={() => setRecomType(tag)}
                  >
                    {tag}
                  </button>
                </div>
              ))}
            </div>
            {recomType === "series-hunter" ? (
              <Title
                //title={"Recommended Problems"}
                sub_title={"The best problems from your favorite series"}
              />
            ) : (
              <Title
                //title={"Recommended Problems"}
                sub_title={"The best problems at your level"}
              />
            )}
          </div>

          <div className="flex flex-col gap-5 w-full">
            <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
              <div className="text-xl w-[45%] font-medium">Name</div>
              <div className="text-xl w-[20%] font-medium flex gap-2 items-center justify-center">
                {/* <FontAwesomeIcon icon={faCheckDouble} /> */}
                <HowToRegIcon />
                Acceptance
              </div>
              <div className="text-xl w-20% font-medium flex gap-2 items-center justify-center">
                <FontAwesomeIcon icon={faFire} />
                Difficulty
              </div>
              <div className="text-xl w-15% font-medium flex gap-2 items-center justify-center">
                <FontAwesomeIcon icon={faHeartPulse} />
                Status
              </div>
            </div>
            <TableContainer>
              {problems.map((problem, index) => (
                <div className="flex w-full">
                  <RecommendationCard
                    idx={index + 1}
                    id={problem.id}
                    name={problem.title}
                    path={`/problems/${problem.id}`}
                    rating={problem.rating}
                  />
                </div>
              ))}
            </TableContainer>
          </div>
        </div>
      )}
      <RecentProblems />
    </div>
  );
}
