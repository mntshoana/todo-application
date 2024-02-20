import React, { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom";
import "./AddTaskView.css";
import InputComponent from "../../component/input/inputComponent/InputComponent";
import TextBoxInputComponent from "../../component/input/textBoxInputComponent/TextBoxInputComponent";
import TimeInputComponent from "../../component/input/timeInputComponent/TimeInputComponent";
import CalendarComponent from "../../component/input/calendarComponent/CalendarComponent";
import { Task } from "../../../data/model/Task";
import AddButtonComponent from "../../component/button/addButtonComponent/AddButtonComponent";

const AddTaskView = () => {

    const { id } = useParams();
    const [error, setError] = useState(null);
    const [newTask, setTask] = useState<Task>(new Task(-1, new Date(), "", ""));


    const host = "http://127.0.0.1";
    const port = "3001";
    const url = `${host}:${port}/api`;
    const fetchTask = () => {
        if (parseInt(id as string) < 0)
            return;

        return fetch(url + `/task/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((res) => res.json())
            .then((data) => {

                const source = new Task(data.data.id, new Date(data.data.date), data.data.title, data.data.description, data.data.isDone)
                setTask({ ...source })
            })

            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchTask();
    }, []);

    const addInfo = () => {
        const idExists = (parseInt(id as string) > 0);

        console.log(newTask)

        return fetch(url + "/task" + (idExists ? `/${id}` : ""),
            {
                method: idExists ?  'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({...newTask })
            })

            .then((res) => {
                console.log((idExists) ?  'POST' : 'PUT')
                console.log(res)
                // window.location.href = '/';
            })
            .catch((err) => setError(error));
    };


    const validateTask = () => {
        return newTask.title !== "" && newTask.description !== "";
    }

    const handleDateSelect = (date: Date) => {
        const replacedWith: Date = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            newTask.date.getHours(),
            newTask.date.getMinutes()
        );
        setTask({ ...newTask, date: replacedWith });
    }

    const handleTimeSelect = (time: String) => {
        const replacedWith: Date = new Date(
            newTask.date.getFullYear(),
            newTask.date.getMonth(),
            newTask.date.getDate(),
            parseInt(time.substring(0, 2).replace(/^0/, '')),
            parseInt(time.substring(3, 5).replace(/^0/, ''))
        );
        setTask({ ...newTask, date: replacedWith });
    }

    return (<>
        <Link to={"/"}><AddButtonComponent className="back-button" buttonText={"\u2039"} /></Link>

        <h1>Ok</h1>
        <h3>Let's help you add a </h3>
        <h3>task for</h3>
        {
            <div className="box">
                <CalendarComponent className={"center-calendar"} onDateSelected={(e) => handleDateSelect(e)} date={newTask.date} />

                <InputComponent label={"Title"}
                    value={newTask.title as string}
                    onChange={(e) => setTask({ ...newTask, title: e as String })} />
                {newTask.title === "" && <span
                    className={"notice"}>Title cannot be blank</span>}

                <TimeInputComponent
                    value={newTask.date.toLocaleTimeString().substring(0, 5)}
                    label={"When"}
                    onChange={(e) => handleTimeSelect(e as String)} />

                <TextBoxInputComponent value={newTask.description as string} label={"Description"} onChange={(e) => setTask({ ...newTask, description: e as String })} />
                {newTask.description === "" && <span className={"notice"}>Description cannot be blank</span>}

                <AddButtonComponent isValid={validateTask()}
                    className={`comfirm ${validateTask() ? "valid" : "invalid"}`}
                    buttonText={validateTask() ? "\u2714" : "\u2717"}
                    onClick={() => addInfo()}></AddButtonComponent>

                {error && <span className={"error"}>Error: {error}</span>}

            </div>
        }
    </>
    )
}

export default AddTaskView;