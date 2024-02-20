import React from "react";
import "./TextBoxInputComponent.css"
import { IClassName } from "../../../../data/interface";
import { IInputComponent } from "../../../../data/interface";


const TextBoxInputComponent = ({...props} : IInputComponent & IClassName) => { 
    return <>
    <label>{props.label}</label>
    <textarea className={props.className + ""}  rows={5} onChange={(e) => {
        if (props.onChange) 
            props?.onChange(e.target.value)
    }} value={props.value} /> 
    </>
};

export default TextBoxInputComponent;