import React, {useState} from "react"
import "./AddFriendBtn.css"

function AddFriendBtn(props) {

    const [msgState, setMsgState] = useState("")
    const [btnState, setBtnState] = useState("Add Friend")
    function addFriend(){
        const username = props.state.username
        console.log(username)
        fetch("/api/request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username }),
          })
            .then((response) => response.json())
            .then((data) => {
              // successful sent request
              console.log(data);
              setMsgState(data.msg)
              if(data.msg === "Friend Request is already Pending"){
                  setBtnState("Request Pending")
              }
            });
    }

    return(
        <div className="row">
            <div className="col-12">
                <button id="friendRequestBtn" onClick={addFriend}>
                    {btnState}
                </button>
                <div className="greentxt">
                    {msgState}
                </div>
            </div>
        </div>
    )
}

export default AddFriendBtn