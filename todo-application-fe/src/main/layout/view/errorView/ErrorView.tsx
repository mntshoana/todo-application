import React from "react";

export interface IErrorViewProp {
    error: any;
    errorInfo: any;
}


const ErrorView = ({error, errorInfo, ...props} : IErrorViewProp & any) => {
    console.log("ErrorView: error: ", error)
    if (errorInfo) {
        // Error path
        return (
            <div>
                <h2>Something went wrong.</h2>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {error && error.toString()}
                    <br />
                    {errorInfo.componentStack}
                </details>
            </div>
        );
    }


    // Normally, just render children
    return props?.children;
};

export default ErrorView;