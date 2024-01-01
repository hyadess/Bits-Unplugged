import { Tooltip, Zoom } from "@mui/material";

const BUTooltip = (props) => {
  <Tooltip
    title=<h1 className="text-lg text-white">{props.title}</h1>
    placement="top"
    TransitionComponent={Zoom}
    arrow
    slotProps={{
      popper: {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, props.offsetY],
            },
          },
        ],
      },
    }}
  >
    {props.children}
  </Tooltip>;
};
export default BUTooltip;
