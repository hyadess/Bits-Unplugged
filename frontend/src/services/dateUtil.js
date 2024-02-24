import { format } from "date-fns";
export const getTime = (hours, minutes = 0, seconds = 0) => {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    hours,
    minutes
  );
};

export const getTimeStamp = (timestamp) => {
  if (timestamp === undefined) return "Invalid date";
  const curr_date = new Date();
  const curr_year = curr_date.getFullYear();
  const curr_month = curr_date.getMonth();
  const curr_day = curr_date.getDate();
  const curr_hour = curr_date.getHours();
  const curr_minutes = curr_date.getMinutes();

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const diff = curr_date - date;
  const diff_minutes = Math.floor(diff / 60000);
  const diff_hours = Math.floor(diff_minutes / 60);
  if (diff_hours < 24) {
    if (diff_hours < 1) {
      if (diff_minutes === 0) {
        return "Just now";
      } else {
        return (
          diff_minutes + " minute" + (diff_minutes > 1 ? "s" : "") + " ago"
        );
      }
    } else {
      return diff_hours + " hour" + (diff_hours > 1 ? "s" : "") + " ago";
    }
  }

  if (curr_year === year) {
    if (curr_month === month) {
      if (curr_day === day) {
        if (curr_hour === hour) {
          if (curr_minutes === minutes) {
            return "Just now";
          } else {
            let m = curr_minutes - minutes;
            return m + " minute" + (m > 1 ? "s" : "") + " ago";
          }
        } else {
          let h = curr_hour - hour;
          return curr_hour - hour + " hour" + (h > 1 ? "s" : "") + " ago";
        }
      } else {
        let d = curr_day - day;
        return (
          (d === 1 ? "Yesterday" : format(date, "MMM d")) +
          " at " +
          format(date, "h:mm a")
        );
      }
    } else {
      return format(date, "MMM d");
    }
  } else {
    return format(date, "MMM d, yyyy");
  }
};

// format(new Date(timestamp), "eee, MMM d, yyyy") +
//       " at " +
//       format(new Date(timestamp), "hh:mm a")
