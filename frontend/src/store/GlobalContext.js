import { createContext } from "react";
const GlobalContext = createContext({
  pendingUpdate: false,
  setPendingUpdate: () => {},
  newNotificationFlag: false,
  setNewNotificationFlag: () => {},
  notificationUpdate: false,
  setNotificationUpdate: () => {},
  type: 0,
  setType: () => {},
});
export default GlobalContext;
