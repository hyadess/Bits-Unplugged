import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SetterCard from "components/Cards/SetterCard";
import LeaderBoardCard from "components/Cards/LeaderBoardCard";
import Timeline from "./Timeline"; // Import the ApexChart component

const Leaderboard = ({ leaderboard, contest_id, timeline }) => {

  function mergeMultipleLists(lists) {
    // Combine categories from all lists and remove duplicates
    const mergedCategories = [...new Set(lists.reduce((acc, list) => acc.concat(list.categories), []))];

    // Initialize new lists with zeros
    const newLists = lists.map(() => ({ data: Array(mergedCategories.length).fill(0), categories: mergedCategories }));

    // Update data points in the new lists based on original lists
    lists.forEach((list, listIndex) => {
      list.categories.forEach((category, index) => {
        const mergedIndex = mergedCategories.indexOf(category);
        newLists[listIndex].data[mergedIndex] = list.data[index];
      });
    });

    return newLists;
  }

  function mergeAndMakeIncreasing(lists) {
    // Merge lists
    const mergedLists = mergeMultipleLists(lists);

    // Combine and sort numerical x values
    const mergedXValues = [...new Set(lists.reduce((acc, list) => acc.concat(list.categories), []))];
    mergedXValues.sort((a, b) => parseFloat(a) - parseFloat(b));

    // Update categories in merged lists based on sorted x values
    mergedLists.forEach((mergedList) => {
      mergedList.categories = mergedXValues.slice();
    });

    // Iterate through merged lists and make values strictly increasing
    for (let i = 0; i < mergedLists.length; i++) {
      let previousValue = 0;

      for (let j = 0; j < mergedLists[i].data.length; j++) {
        const originalValue = mergedLists[i].data[j];
        mergedLists[i].data[j] += previousValue;
        previousValue = originalValue;
      }
    }

    return mergedLists;
  }

  // Example usage with 5 lists
  const list1 = { data: [10, 15, 20], categories: ['0', '0.5', '2'] };
  const list2 = { data: [10, 25], categories: ['0', '1'] };
  const list3 = { data: [5, 10, 15], categories: ['0', '0.25', '0.5'] };
  const list4 = { data: [30, 35, 40], categories: ['0', '2', '3'] };
  const list5 = { data: [15, 20, 25], categories: ['0', '1', '2'] };

  useEffect(() => {
    const mergedLists = mergeAndMakeIncreasing([list1, list2, list3, list4, list5]);

    console.log("mergedLists increased", mergedLists);
  }, []);

  return (
    <div>
      <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
        <h2 className="bu-text-primary mb-4 text-4xl font-extrabold tracking-tight">
          TIMELINE
        </h2>
      </div>

      <Timeline />

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
            path={`/contests/${contest_id}/${user.username}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
