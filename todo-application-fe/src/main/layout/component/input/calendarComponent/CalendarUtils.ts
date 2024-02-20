import {ICalendarDay} from '../../../../data/interface';
import { TCalendar } from '../../../../data/model/TCalendar';


const isDateEqual = (a?: Date, b?: Date): boolean => {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getNextMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1);
}

const getPreviousMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1);
}


const getCalendarMonth = (date: Date): TCalendar => {
  const firstOfMonth = date.getDay();
  const isFirstOfMonth = firstOfMonth === 0;
  const calendar: Array<Array<ICalendarDay>> = [];
  if (!isFirstOfMonth) {
    // -- dates from the previous month - starts on sunday
    const previousMonth = getPreviousMonth(date);
    const daysInPreviousMonth = getDaysInMonth(previousMonth);
    calendar.push([]);
    for (
      let i = daysInPreviousMonth - firstOfMonth + 1;
      i <= daysInPreviousMonth;
      i++
    ) {
      calendar[0].push({
        date: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), i),
        isFromPreviousMonth: true,
        isFromNextMonth: false
      });
    }
    // -- dates from this month -- remaining days in first week
    for (let i = 1; i <= 7 - firstOfMonth; i++) {
      calendar[0].push({
        date: new Date(date.getFullYear(), date.getMonth(), i),
        isFromPreviousMonth: false,
        isFromNextMonth: false
      });
    }

  }
  const daysInMonth = getDaysInMonth(date);
  const nextMonth = getNextMonth(date);

  let leftoverWeeks = !isFirstOfMonth ? 5 : 6;
  for (let i = 0; i < leftoverWeeks; i++) {
    // week two and onwards of this month
    calendar.push([]);
    const location = !isFirstOfMonth ? i + 1 : i;

    for (let j = 1; j <= 7; j++) {
      let day = 7 * i - firstOfMonth + j;
      day += !isFirstOfMonth ? 7 : 0;
      if (day > daysInMonth) {
        // Add first and / second week from the following month
        // or break
        const dayOfNextMonth = day - daysInMonth;
        calendar[location].push({
          date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), dayOfNextMonth),
          isFromPreviousMonth: false,
          isFromNextMonth: true
        });
      } else {
        // current month
        calendar[location].push({
          date: new Date(date.getFullYear(), date.getMonth(), day),
          isFromPreviousMonth: false,
          isFromNextMonth: false
        });
      }
    }
  }
  return calendar;
}

export { getDaysInMonth, getNextMonth, isDateEqual, getPreviousMonth, getCalendarMonth }