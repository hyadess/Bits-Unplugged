import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
// import { Button, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faTag,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading, showSuccess } from "../../App";
import { getTimeStamp } from "../../services/dateUtil";
import Confirmation from "../Confirmation";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { DateTimePicker } from "@/components/ui/date-time-picker";
// import { DateTimePicker } from "@mui/x-date-pickers";

// import { TimePickerDemo } from "@/package/time-picker-demo";
// import { TimeField } from "@/components/ui/date-time-picker/time-field";
// import { useDatePickerState } from "react-stately";
// import { useDatePicker } from "react-aria";
// import { useForwardedRef } from "@/lib/useForwardedRef";
// import { DateField } from "@/components/ui/date-time-picker/date-field";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { MobileDatePicker } from "@mui/x-date-pickers";
// import TimePicker from "react-times";
import DateTimePicker from "components/Date/DateTimePicker";
// use material theme
// import "react-times/css/material/default.css";
// import "react-times/css/classic/default.css";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { contestApi } from "api";
import { Avatar } from "@mui/material";
import { format } from "date-fns";

// export function DateTimePickerDemo() {
//   const [date, setDate] = useState();
//   useEffect(() => {
//     console.log(date);
//   }, [date]);
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[280px] justify-start text-left font-normal",
//             "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? (
//             format(date, "PPP hh:mm a")
//           ) : (
//             <span>Pick a date and time</span>
//           )}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
//         <div className="p-3 border-t border-border">
//           <TimePickerDemo setDate={setDate} date={date} />
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }

// const DatePickerDemo = forwardRef((props, forwardedRef) => {
//   const ref = useForwardedRef(forwardedRef);
//   const [date, setDate] = useState();
//   const state = useDatePickerState(props);
//   const {
//     groupProps,
//     fieldProps,
//     buttonProps: _buttonProps,
//     dialogProps,
//     calendarProps,
//   } = useDatePicker(props, state, ref);
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[280px] justify-start text-left font-normal",
//             "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
//           <DateField {...fieldProps} />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
//         <div className="p-3 border-t border-border">
//           <TimePickerDemo setDate={setDate} date={date} />
//           {!!state.hasTime && (
//             <TimeField value={state.timeValue} onChange={state.setTimeValue} />
//           )}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// });

const ContestCard = ({
  id,
  name,
  startDateTime,
  duration,
  endDate,
  status,
  owner,
  updatedAt,
  registerAction,
  userID,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();

  useEffect(() => {
    setLoading(false);
    if (startDateTime) setDate(new Date(startDateTime));
    // console.log("Start: ", startDateTime, new Date());
    // get end date from start date and duration
    // let end = new Date(startDateTime);
    // end.setTime(end.getTime() + duration * 60 * 60 * 1000);
  }, []);

  return (
    <div className="w-full h-full" key={id}>
      <div className="border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col gap-5 p-5">
        <div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col cursor-pointer w-[80%]">
              <h5
                className="text-2xl md:text-3xl font-bold tracking-tight bu-text-title cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis w-full max-w-full"
                onClick={() => {
                  setLoading(true);
                  navigate(`/admin/contests/${id}/preview`);
                }}
              >
                {name}
              </h5>
            </div>
            <div className="flex flex-col items-end gap-2 cursor-pointer">
              <Avatar
                alt={owner?.username}
                src={
                  owner != null
                    ? owner.image
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
                }
                onClick={() => {
                  setLoading(true);
                  navigate("/setter/" + owner.username);
                }}
                style={{ height: "3rem", width: "3rem" }} // Change the size here
              />
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="bu-text-subtitle">
              Approved at {format(updatedAt, "dd/MM/yy h.mm a")}
            </div>
            <h1
              className="bu-text-subtitle cursor-pointer hover:underline"
              onClick={() => {
                setLoading(true);
                navigate("/setter/" + owner.username);
              }}
            >
              @{owner.username}
            </h1>
          </div>
        </div>

        <DateTimePicker date={date} setDate={setDate} />
        <button
          className="font-medium rounded-lg text-lg px-7 py-2 text-center w-full bu-button-primary"
          onClick={async () => {
            const res = await contestApi.updateContest(id, {
              startDateTime: date,
              status: "scheduled",
            });
            showSuccess("Contest scheduled successfully", res);
            // setProblem((prev) => ({ ...prev, seriesId: series?.id }));
          }}
        >
          <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
          Schedule
        </button>
      </div>

      <Confirmation
        open={open}
        setOpen={setOpen}
        onConfirm={registerAction}
        param={id}
      />
    </div>
  );
};

export default ContestCard;
