import "./DayComponent.css";
import { ICalendarDay, IClassName, IOnClickEvent} from "../../../../../data/interface";

const DayComponent = ({...props}: ICalendarDay & IClassName & IOnClickEvent) =>  {
  const cssSelected = props.selected && "day-selected";
  const cssNextMonth = props.isFromNextMonth && "day-next-month";
  const cssPrevMonth = props.isFromPreviousMonth && "day-previous-month";
  
  const css = `day ${cssSelected} ${cssNextMonth} ${cssPrevMonth}  ${props.className}`;
  
  return <div 
  onClick={props.onClick}
  className={css}>
    {props.date.getDate()}
    </div >
};

export default DayComponent;