import React, { useState } from "react";
import Divider from "@mui/material/Divider";
// import UserCard from "../Cards/UserCard";
// import SearchBar from "../InputFields/SearchBar";
// import "./CardContainer.scss";
import Zoom from "@mui/material/Zoom";
// export const List = (props) => {
//   return (
//     <Zoom in={true}>
//       <div className="cards">
//         {props.list.map((user, index) =>
//           user.NAME.toLowerCase().startsWith(props.query.toLowerCase()) ? (
//             user.USER_ID === undefined ? (
//               user.COACHING_ID === undefined ? (
//                 <></>
//               ) : (
//                 <UserCard user={user} id={user.COACHING_ID} />
//               )
//             ) : (
//               <UserCard user={user} id={user.USER_ID} />
//             )
//           ) : (
//             <></>
//           )
//         )}
//       </div>
//     </Zoom>
//   );
// };

const CardContainer = (props) => {
  return (
    <div className="grid grid-cols-1 justify-center items-center pb-8 mx-auto max-w-screen-2xl xl:gap-8 x:gap:16 gap-8 md:grid-cols-3 h-full">
      {props.children}
    </div>
  );
};

export default CardContainer;
