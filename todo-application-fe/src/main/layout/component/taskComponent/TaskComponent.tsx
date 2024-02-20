import { useState } from 'react';
import { Link } from 'react-router-dom';
import './TaskComponent.css';
import './TaskComponent-State.css';
import { ITask, IColor } from '../../../data/interface';
import { Task} from '../../../data/model';

const getDayOfWeekString = ({ task }: ITask) => {
    return task.date.toLocaleString("en", { weekday: "short" })
}

const geDateString = ({ task }: ITask) => {
    return (
        task.date.toLocaleString("en", { day: "numeric" })
        + " "
        + task.date.toLocaleString("en", { month: "short" })
    )
};

export interface OnEvent {
    onDelete?: () => void;
    onEdit?: () => void;
    onAdd?: () => void;
}

const TaskComponent = ({ ...props }: ITask & IColor & OnEvent) => {
    const [isHovering, setIsHovering] = useState(false);

    const onHover = (isHovering: boolean) => {
        setIsHovering(isHovering);
    };

    return <div className="task"
        onMouseOver={() => onHover(true)}
        onMouseOut={() => onHover(false)}>
        <div className={"left " + props.color} >
            <span>{getDayOfWeekString({ ...props })}</span>
            <span>{geDateString({ ...props })}</span>
        </div>

        <div className={"right " + props.color}>
            <div className={"title"}>
                <span>{props.task.title}</span>
                <Link to={"/edit/"+props.task.id}>
                    <img className={"editIcon"} src='src/main/images/editIcon.png'></img>
                </Link>
                <a><img className={"deleteIcon"} src='src/main/images/deleteIcon.png' onClick={props.onDelete}></img></a>
            </div>

            <div className={"body"}>
                <span>{props.task.description}
                </span>
            </div>
        </div>
        <div className={"state "
            + (isHovering ? "show" : "hide")
            + " " + props.task.getStatus()}>
            <span>{props.task.getStatus()}</span>
        </div>
    </div >
}

export default TaskComponent;