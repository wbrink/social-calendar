import React from "react"

function ErrorHandler(props){

    return(
        <div className="col-12" id="ErrorMsgDiv">
            {props.message}
        </div>
    )
}

export default ErrorHandler