import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomeView.css";
import OverViewComponent from "../../component/welcome/OverviewComponent";
import TaskListComponent, { OnListUpdateEvent } from "../../component/taskListComponent/TaskListComponent";
import AddButtonComponent from "../../component/button/addButtonComponent/AddButtonComponent";
import { Task } from "../../../data/model";


const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};


const HomeView = () => {
    // const task: Task = new Task(new Date(2024, 1, 16, 21, 40),
    //     'Dummy title',
    //     "This is an ipsum lipsum description that obviously is not meant to make sense." +
    //     "This is an ipsum lipsum description that obviously is not meant to make sense" +
    //     "This is an ipsum lipsum description that obviously is not meant to make sense" +
    //     "This is an ipsum lipsum description that obviously is not meant to make sense" +
    //     "This is an ipsum lipsum description that obviously is not meant to make sense" +
    //     "This is an ipsum lipsum description that obviously is not meant to make sense" +
    //     "This is an ipsum lipsum description that obviously is not meant to make sense");

    // const task2: Task = new Task(new Date(2024, 3, 1, 3, 30),
    //     "Title 2",
    //     task.description);

    /*task, task2, { ...task }, { ...task2 } */
    const [tasks, setTasks] = useState([] as Task[]);
    const host = "http://127.0.0.1";
    const port = "3001";
    const url = `${host}:${port}/api`;
    const fetchInfo = () => {
        return fetch(url + "/tasks",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((res) => res.json())
            .then((data) => data.data)
            .then((data) => setTasks(data.map((task: any) => new Task(task.id, new Date(task.date), task.title, task.description, task.isDone))))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const deleteInfo = (index: number) => {
        return fetch(url + "/task/" + tasks[index].id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((res) => res.json())
            .then((data) => {console.log(data); return data})
            .then((data) => setTasks(tasks.filter((task: Task) => task.id !== tasks[index].id)))
            .catch((err) => console.log(err));
    }
    return (<>
        <OverViewComponent count={tasks.length} />
        <TaskListComponent taskList={{ ...tasks }} onListUpdate={setTasks} onDelete={deleteInfo}  />
        <Link to={"/add"}><AddButtonComponent className="add-button" onClick={scrollToTop} /></Link>
    </>
    )
}

export default HomeView;