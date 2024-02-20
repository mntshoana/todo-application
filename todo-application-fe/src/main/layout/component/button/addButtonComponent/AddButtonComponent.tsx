import React from "react";
import "./AddButtonComponent.css"
import { IClassName } from "../../../../data/interface";

export interface IButton {
    buttonText?: string;
    isValid?: boolean;
    onClick?: () => void;
}
const AddButtonComponent = ({className, buttonText, isValid = true, onClick} : IClassName & IButton) => { 
    return (<div onClick={(e) =>{ if (isValid && onClick) {onClick()}}} className={`rounded-button ${className} ${isValid ? "valid": "invalid"}`}><span>{buttonText || "\u271A"}</span></div>
)};

export default AddButtonComponent;