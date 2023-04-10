import React from "react";
import { Calendar, View, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

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
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week" 
        views={["month", "week"]}
        startAccessor="start"
        endAccessor="end"
        titleAccessor={(event) => event.title}
        style={{ height: "450px"}}
      />
  );
};

export default TutorCalendar;