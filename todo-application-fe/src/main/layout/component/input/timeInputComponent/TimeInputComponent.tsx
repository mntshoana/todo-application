import React from "react";
import "./TimeInputComponent.css"
import { IClassName } from "../../../../data/interface";
import { IInputComponent } from "../../../../data/interface";


const TimeInputComponent = ({ ...props }: IInputComponent & IClassName) => {

    return <>
        <label>{props.label}</label>
        <input  className={props.className + " timeInput"} type={"time"}
        onChange={(e) => {
        if (props.onChange) 
            props?.onChange(e.target.value)
        }} value={props?.value} />
    </>
};

export default TimeInputComponent;