import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CustomCard from "../../Components/Cards/CustomCard";
import CardContainer from "../../Components/Containers/CardContainer";
import Cookies from "universal-cookie";
import Title from "../../Components/Title";
import TopicCard from "../../Components/Cards/TopicCard";
import AdminNavbar from "../../Components/navbar/AdminNavbar";
import Layout4 from "../../Components/Layouts/Layout4";

import CanvasController from "../../controller/canvasController";
const canvasController = new CanvasController();

const AdminCanvasList = () => {
  const [type, setType] = useState(-1);
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const [loading, setLoading] = useState(false);
  const [canvasList, setCanvasList] = useState([]);

  const getCanvasList = async () => {
    const res = await canvasController.getAllCanvas();
    if (res.success) {
      setCanvasList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));
    getCanvasList();
  }, []);
  return (
    <>
      <Title title={`Canvas`} sub_title={`Add/Delete/Update Canvas`} />

      {!loading && (
        <CardContainer col={3}>
          {canvasList.map((canvas, index) => (
            <CustomCard
              key={index}
              id={`Canvas ${index + 1}`}
              name={canvas.name}
              image={canvas.logo}
              path={`/admin/canvas/${canvas.canvas_id}`}
              action="View Canvas"
            />
          ))}
        </CardContainer>
      )}
    </>
  );
};

export default AdminCanvasList;
