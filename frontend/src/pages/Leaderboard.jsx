import React, { useEffect, useState } from "react";
import { contestApi } from "../api";

const Leaderboard = ({ contestId }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    getLeaderboard();
  }, [contestId]);

  const getLeaderboard = async () => {
    const res = await contestApi.getLeaderboard(contestId); // Assuming you have an API to fetch leaderboard data
    if (res.success) {
      setLeaderboard(res.data);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry.userId}>
            {entry.username}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
