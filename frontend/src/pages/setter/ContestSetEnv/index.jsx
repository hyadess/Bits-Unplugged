import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setLoading } from "../../../App";
import { contestApi } from "../../../api";
import LayoutMain from "../../../components/Layouts/LayoutMain";

import ContestContextProvider, {
  useContestContext,
} from "../../../store/ContestContextProvider";
import ContestSetTab from "../../../components/ContestSetTab";
import ContestHeader from "./ContestHeader"; // Import your ContestHeader component
import DetailsTab from "./ContestDetails";
import ProblemsTab from "./ContestProblems"; // Import your ProblemsTab component
import Collaborators from "./ContestCollaborators"; // Import your ProblemsTab component
import EditorialEditor from "./EditorialEditor";

const ContestSetEnvView = () => {
  const backupContest = useRef(null);
  const { id } = useParams();
  const [isFormDirty, setFormDirty] = useState(false);
  const navigate = useNavigate();
  const { state: contest, dispatch } = useContestContext();
  const [activeComponent, setActiveComponent] = useState("Details");
  const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

  const getContest = async () => {
    const res = await contestApi.getContestById(id);
    const res2 = await contestApi.getAllProblemsByContest(id);
    if (res.success) {
      backupContest.current = res.data[0];

      dispatch({
        type: "SET_INITIAL_STATE",
        payload: JSON.parse(
          JSON.stringify({
            ...res.data[0],
            problems: res2.data,
          })
        ),
      });
      console.log("Contest", res2.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  useEffect(() => {
    if (id !== undefined) {
      getContest();
    }
  }, [id]);

  return (
    <div>
      <ContestHeader backupContest={backupContest} />

      <ContestSetTab
        activeTab={activeComponent}
        click={(tab) => {
          setActiveComponent(tab);
        }}
      />

      <div className="component-container relative">
        <div
          className={`mt-5 flex flex-col gap-5 ${
            activeComponent === "Details" ? "block" : "hidden"
          }`}
        >
          <DetailsTab />
        </div>
        <div
          className={`mt-5 flex flex-col gap-5 ${
            activeComponent === "Problems" ? "block" : "hidden"
          }`}
        >
          <ProblemsTab />
        </div>

        {contest?.editorial !== undefined && (
          <div
            className={`mt-5 flex flex-col gap-5 ${
              activeComponent === "Editorial" ? "block" : "hidden"
            }`}
          >
            <EditorialEditor />
          </div>
        )}
      </div>
    </div>
  );
};

const ContestSetEnv = () => {
  return (
    <ContestContextProvider>
      <LayoutMain left={<Collaborators />}>
        <ContestSetEnvView />
      </LayoutMain>
    </ContestContextProvider>
  );
};

export default ContestSetEnv;
