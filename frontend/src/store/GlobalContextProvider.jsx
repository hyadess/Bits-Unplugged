import React, { useState, useRef, useContext } from "react";
import GlobalContext from "./GlobalContext";
const GlobalContextProvider = (props) => {
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [newNotificationFlag, setNewNotificationFlag] = useState(false);
  const [notificationUpdate, setNotificationUpdate] = useState(false);
  const [type, setType] = useState(false);
  const val = {
    pendingUpdate,
    setPendingUpdate,
    newNotificationFlag,
    setNewNotificationFlag,
    notificationUpdate,
    setNotificationUpdate,
    type,
    setType,
  };
  return (
    <GlobalContext.Provider value={val}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalContextProvider;
