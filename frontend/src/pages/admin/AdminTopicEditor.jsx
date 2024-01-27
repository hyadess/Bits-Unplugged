import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Title from "../../components/Title";
import { TextField2 } from "../../components/InputFields";
import { setLoading, showSuccess } from "../../App";
import { topicApi } from "../../api";
import CardContainer from "../../containers/CardContainer2";
import CustomCard from "../../components/Cards/CustomCard";
import SeriesCard from "../../components/Cards/AdminSeriesCard";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function DraggableSeriesCard({
  id,
  name,
  index,
  moveCard,
  series,
  setSeries,
  deleteSeries,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (item.index !== index && monitor.isOver({ shallow: true })) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <SeriesCard
        key={series.id}
        id={series.id}
        name={series.name}
        image={series.logo}
        path={`/admin/series/${series.id}`}
        action="View Series"
        isLive={series.isLive}
        setSeries={setSeries}
        deleteAction={deleteSeries}
        isEdit={true}
      />
    </div>
  );
}
const AdminTopicEditor = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [seriesList, setSeriesList] = useState([]);
  // const [isEdit, setIsEdit] = useState(false);
  const handleChange = (prop) => (event) => {
    setTopic({ ...topic, [prop]: event.target.value });
  };
  const getTopic = async () => {
    console.log(id);
    const res = await topicApi.getTopicById(id);
    if (res.success) {
      setTopic(res.data);
      const res2 = await topicApi.getAllSeries(res.data.id);
      if (res2.success) {
        console.log(res2.data);
        setSeriesList(res2.data);
        setLoading(false);
        // console.log(res);
      }
    }
  };

  const handleSave = async () => {
    const series = seriesList.map((item, index) => ({
      ...item,
      serialNo: seriesList.length - index,
    }));

    console.log(series);
    await topicApi.updateSeries(id, series);
    setSeriesList(series);

    const res = await topicApi.updateTopic(id, topic);
    if (res.success) {
      console.log(res);
      showSuccess("Changes are saved", res);
    }
  };

  const deleteSeries = async (seriesId) => {
    setSeriesList((prev) => prev.filter((series) => series.id !== seriesId));
  };

  const setSeries = (id, data) => {
    // set series in given id with given data
    setSeriesList((prev) =>
      prev.map((series) => (series.id === id ? { ...series, ...data } : series))
    );
  };

  const moveCard = (dragIndex, hoverIndex) => {
    setSeriesList((prevState) => {
      const dragCard = prevState[dragIndex];
      const copiedStateArray = [...prevState];
      // Remove the dragged card from its original position
      copiedStateArray.splice(dragIndex, 1);
      // Insert it to the new position
      copiedStateArray.splice(hoverIndex, 0, dragCard);
      return copiedStateArray;
    });
  };

  useEffect(() => {
    getTopic();
  }, []);
  return (
    topic && (
      <DndProvider backend={HTML5Backend}>
        <Title title={topic.name} sub_title={topic.description} />
        <div className="flex flex-col gap-5">
          <TextField2
            label="Topic Name"
            onChange={handleChange}
            value={topic.name}
            id="name"
          />
          <TextField2
            label="Description"
            onChange={handleChange}
            value={topic.description}
            id="description"
          />
          <TextField2
            label="Logo URL"
            onChange={handleChange}
            value={topic.logo}
            id="logo"
          />
          <div className="bu-bg-title text-white p-5 mb-3 rounded-md text-3xl font-bold">
            Series
          </div>
          <CardContainer col={2}>
            {seriesList.map((series, index) => (
              <DraggableSeriesCard
                key={series.id}
                id={series.id}
                index={index}
                name={series.name}
                image={series.logo}
                series={series}
                setSeries={setSeries}
                deleteSeries={deleteSeries}
                moveCard={moveCard}
              />
            ))}
          </CardContainer>
          <button
            className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary mt-5"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </DndProvider>
    )
  );
};

export default AdminTopicEditor;
