import { IClassName } from './';
export interface ICalendarDay {
  date: Date;
  isFromPreviousMonth: boolean;
  isFromNextMonth: boolean;
  selected?: Boolean;
};