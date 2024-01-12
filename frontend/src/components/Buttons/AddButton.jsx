import AddIcon from "@mui/icons-material/Add";
const AddButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-10 z-10 right-10 hidden md:flex items-center justify-center ">
      <div
        onClick={onClick}
        className="w-16 h-16 rounded-full justify-center inline-flex items-center text-white font-medium text-sm p-4 text-center ursor-pointer shadow-lg cursor-pointer bu-button-secondary "
      >
        <div className="text-primary-900 dark:text-gray-900">
          <AddIcon sx={{ fontSize: "4rem" }} />
        </div>
      </div>
    </div>
  );
};

export default AddButton;
