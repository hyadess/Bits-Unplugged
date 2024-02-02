import { useEffect, useState } from "react";
import Layout4 from "../../components/Layouts/Layout4";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import { authApi } from "../../api";
import { setLoading, showSuccess, showToast } from "../../App";
import CardContainer from "../../containers/CardContainer";
import Title from "../../components/Title";

const AdminSetters = () => {
  const [setterList, setSetterList] = useState([]);
  const getData = async () => {
    const result = await authApi.getSetterRequests();
    if (result.success) {
      console.log(result.data);
      setLoading(false);
      setSetterList(result.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Title title={`Setter Requests`} sub_title={`Approve setters`} />
      <CardContainer col={3}>
        {setterList.map((user, index) => (
          <div className="w-full h-full bu-card-primary rounded-2xl shadow-xl flex flex-col items-center justify-center p-5">
            <img
              src={user.image}
              alt="profile"
              className="w-40 h-40 rounded-full"
              style={{
                // width: "15rem",
                // height: "14rem",
                objectFit: "cover",
                aspectRatio: "1/1",
              }}
            />
            <div className="text-3xl font-bold bu-text-primary">
              @{user.username}
            </div>
            <div className="text-xl bu-text-primary">{user.fullname}</div>
            {/* <div className="text-xl bu-text-primary">{user.username}</div> */}
            <div className="flex flex-row gap-3 w-full">
              <div
                className="text-white font-medium rounded-lg text-sm px-5 py-2 text-center bu-button-delete mt-5 cursor-pointer w-50%"
                // onClick={async () => {
                //   const result = await authApi.approveSetter(user.id);
                //   if (result.success) {
                //     showSuccess("Setter approved", result);
                //     setSetterList((prevSetterList) =>
                //       prevSetterList.filter((setter) => setter.id !== user.id)
                //     );
                //   }
                // }}
              >
                REJECT
              </div>
              <div
                className="text-white font-medium rounded-lg text-sm px-5 py-2 text-center bu-button-primary mt-5 cursor-pointer w-50%"
                onClick={async () => {
                  const result = await authApi.approveSetter(user.id);
                  if (result.success) {
                    showSuccess("Setter approved", result);
                    setSetterList((prevSetterList) =>
                      prevSetterList.filter((setter) => setter.id !== user.id)
                    );
                  }
                }}
              >
                APPROVE
              </div>
            </div>
          </div>
        ))}
      </CardContainer>
    </>
  );
};
export default AdminSetters;
