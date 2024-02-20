import React from "react";
import "./InputComponent.css"
import { IClassName } from "../../../../data/interface";
import { IInputComponent } from "../../../../data/interface";


const AddButtonComponent = ({...props} : IInputComponent & IClassName) => { 
    return <>
    <label>{props.label}</label>
    <input className={props.className + " textInput"} onChange={(e) => {
        if (props.onChange) 
            props?.onChange(e.target.value)
    }} type={"input"} value={props.value}/> 
    </>
};

export default AddButtonComponent;