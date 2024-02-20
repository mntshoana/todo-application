import React from "react";
import "./OverviewComponent.css";

export interface iOverviewComponent {
    count: number;
}
const OverViewComponent = ({count}: iOverviewComponent) => {
    return (<div className="container">
        <div className="title">
            <h1>Hi</h1>
            <h2> You have </h2>
            <h4 className={"taskCount"}>{count > 0 ? count : "no"}</h4>
            <h4 className={"end"}>tasks today</h4>

        </div>
        <div className=" exclamation">
            !
        </div>
    </div>
    );
}


export default OverViewComponent;
