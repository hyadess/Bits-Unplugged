import { useEffect } from "react";
import Layout4 from "../../Components/Layouts/Layout4";
import AdminNavbar from "../../Components/navbar/AdminNavbar";

const AdminHome = () => {
  useEffect(() => {
    console.log("Successfully In home");
  }, []);
  return (
    <Layout4 nav={<AdminNavbar />}>
      <></>
    </Layout4>
  );
};

export default AdminHome;
