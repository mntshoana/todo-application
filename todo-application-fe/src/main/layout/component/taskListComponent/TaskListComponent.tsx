import React, { useEffect } from 'react';
import {IColor} from '../../../data/interface';
import {Task} from '../../../data/model/Task';
import TaskComponent, {OnEvent} from '../taskComponent/TaskComponent';
import './TaskListComponent.css';

export interface ITaskList {
    taskList : Array<Task>;
}

export interface OnListUpdateEvent {
    onListUpdate: (taskList: Array<Task>) => void;
}

export interface OnDeleteEvent {
    onDelete: (index: number) => void;
}

const TaskListComponent = ({taskList, onListUpdate, onDelete}: ITaskList & OnListUpdateEvent & OnDeleteEvent) => {  
    const colors: IColor[] = ["white", "yellow", "red", "blue", "green"]
    .map((colorString: string) =>({color: colorString} as IColor));

    const randomColor = (): IColor => {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    return (
        <div className={"listContainer"} >        
        {
            Object.keys(taskList)
            .map((index: any) => {
                return <TaskComponent key={index} 
                task={{...taskList[index]} }
                color={randomColor().color}
                onDelete={() => onDelete(index)}/>
            })
        }
        </div>
    );
};

export default TaskListComponent;