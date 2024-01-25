import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import IconButton from "@mui/material/IconButton";

const UndoRedoButton = ({ handleUndo, handleRedo }) => {
  return (
    <div className="absolute bottom-0 left-0 flex flex-row px-2">
      <IconButton
        sx={{
          fontSize: "2rem",
        }}
        onClick={() => handleUndo()}
      >
        <div className="flex items-center bu-text-primary">
          <UndoIcon sx={{ fontSize: "2rem" }} />
        </div>
      </IconButton>
      <IconButton
        sx={{
          fontSize: "2rem",
        }}
        onClick={() => handleRedo()}
      >
        <div className="flex items-center bu-text-primary">
          <RedoIcon sx={{ fontSize: "2rem" }} />
        </div>
      </IconButton>
    </div>
  );
};

export default UndoRedoButton;
