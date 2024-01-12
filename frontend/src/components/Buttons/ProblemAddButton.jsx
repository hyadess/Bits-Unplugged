import AddButton from "./AddButton";
import AddIcon from "@mui/icons-material/Add";

const ProblemAddButton = ({ onClick }) => {
  return (
    <>
      <AddButton onClick={onClick} />
      <div className="flex md:hidden items-center justify-center">
        <div
          onClick={onClick}
          className="w-full justify-center inline-flex my-8  text-center bu-button-secondary font-medium rounded-lg text-sm p-4   cursor-pointer gap-3 items-center"
        >
          <AddIcon sx={{ fontSize: "2rem" }} />
          <h5 className="text-2xl md:text-3xl text-center font-bold tracking-tight ">
            New Problem
          </h5>
        </div>
      </div>
    </>
  );
};

export default ProblemAddButton;
