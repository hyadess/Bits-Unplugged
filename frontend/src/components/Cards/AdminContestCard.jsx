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
        <div
          className="cursor-pointer"
          // onClick={() => navigate(`/contests/${id}/preview`)}
        >
          <h5 className="text-2xl md:text-3xl font-bold tracking-tight bu-text-title">
            {name}
          </h5>
          <div className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
            <FontAwesomeIcon icon={faTag} />
            <h3 className="bu-text-primary font-semibold">{owner.username}</h3>
          </div>
        </div>

        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Start Date"
            inputFormat="MM/dd/yyyy"
            // value={}
            // onChange={(date) => {
            //   console.log(date);
            //   setUser({ ...user, dob: date });
            // }}
            // renderInput={(params) => (
            //   <TextField
            //     {...params}
            //     sx={{
            //       width: "100%",
            //     }}
            //   />
            // )}
            className="date-picker"
          />
        </LocalizationProvider> */}
        <DateTimePicker date={date} setDate={setDate} />
        <button
          className="font-medium rounded-lg text-lg px-7 py-2 text-center w-full bu-button-primary"
          onClick={async () => {
            const res = await contestApi.updateContest(id, {
              startDateTime: date,
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
