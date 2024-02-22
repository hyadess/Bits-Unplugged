import React from "react";
import SetterCard from "components/Cards/SetterCard";
import LeaderBoardCard from "components/Cards/LeaderBoardCard";

const Leaderboard = ({ leaderboard, contest_id }) => {
  return (
    <div>
    <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="bu-text-primary mb-4 text-4xl font-extrabold tracking-tight">
            LEADERBOARD
          </h2>
        </div>

    <div className="mx-auto grid h-full w-full grid-cols-1 place-items-center gap-8 md:w-75% md:grid-cols-1">
          {leaderboard?.map((user) => (

            <LeaderBoardCard
              id={user.id}
              contest_id={contest_id}
              name={user.username}
              points={user.points}
              image={user.image}
              path={`/user/${user.username}`}
            />
          ))}
        </div>
    </div>
  );
};

export default Leaderboard;
