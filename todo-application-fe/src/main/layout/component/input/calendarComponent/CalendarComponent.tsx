import React, { useState } from "react";
import Day from "./day/DayComponent";
import { ICalendarDay, IClassName } from '../../../../data/interface';
import "./CalendarComponent.css";
import {
  getNextMonth, getPreviousMonth,
  getCalendarMonth,
  isDateEqual
} from "./CalendarUtils";

export interface ICalendarComponent {
  onDateSelected: (date: Date) => void;
  date: Date;
}

const CalendarComponent = ({className, onDateSelected, date}: IClassName & ICalendarComponent) => {
  const [activeMonth, setActiveMonth] = useState<Date>(new Date(date));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(date));

  const handleMonthChange = (val: number) => {
    const newDate = (val > 0) ? getNextMonth(activeMonth) : getPreviousMonth(activeMonth);
    setActiveMonth(newDate);
  };

  // portion of the calendar: Day component
  const getCalendarWeek = (week: ICalendarDay[], i: number) => {
    return week.map((day: ICalendarDay, j: number) => {
      const selected = isDateEqual(day.date, selectedDate);
      const handleOnClick = () => {
        setSelectedDate(day.date);
        onDateSelected(day.date);
      }

      return <Day 
      date={day.date}
      isFromNextMonth={day.isFromNextMonth}
      isFromPreviousMonth={day.isFromPreviousMonth}
      selected={selected}
      key={`day-${i}-${j}`}
      onClick={handleOnClick}/>
    })
  };


  // portion of the calendar: Week component
  const days = getCalendarMonth(activeMonth).map((week: ICalendarDay[], i: number) => {
    return <div className="week"
      key={`week-${i}`}>
      {getCalendarWeek(week, i)}
    </div >
  }
  );

  // Completed calendar Component
  return (
    <div className={className + " calendar"}>

      <div className="controls">
        <div className="controls-button" onClick={() => handleMonthChange(-1)}>
        {"\u00AB"}
        </div>

        <div>
          {new Date(activeMonth).toLocaleDateString(undefined, { year: "numeric", month: "short" }).toUpperCase()}
        </div>

        <div className="controls-button" onClick={() => handleMonthChange(1)}>
          {"\u00BB"}
        </div>
      </div>

      <div className="days">{days}</div>

    </div>
  );
}

export default CalendarComponent;