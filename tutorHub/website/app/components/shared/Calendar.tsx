import React from "react";
import { Calendar, View, momentLocalizer } from "react-big-calendar";
import "./react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const allViews: View[] = ["month", "week", "day"];

type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

type Props = {
  events: Event[];
};

const TutorCalendar: React.FC<Props> = ({ events }) => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="month" 
        views={allViews}
        startAccessor="start"
        endAccessor="end"
        titleAccessor={(event) => event.title}
        style={{ height: '500px'}}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "blue",
            color: "white",
          },
        })}
      />
    </div>
  );
};

export default TutorCalendar;