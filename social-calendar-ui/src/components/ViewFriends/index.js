import React, {useState} from "react";
import Styles from "./style.css"

export default function ViewFriends() {

  const [friend, setFriend] = useState(null);

  const handleClick = () => {
    console.log("clicked the list group");
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("clicked the Button");
  }

  return (
    <div>
      {/* create search container */}
      <div className="friend-container">
        <div class="list-group">
          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
            {/* <span></span> */}
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>
          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div><div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div><div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div><div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div><div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div><div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div><div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>

          <div onClick={handleClick} class="list-group-item">
            <p>Will</p>
            <button onClick={handleButtonClick} class="btn btn-primary">Hello</button>
          </div>
        </div>
      </div>

      {/* // Button to add friends */}
      <div className="bottom-container">
        <button class="btn btn-primary">Add Friends</button>
      </div>
    
    </div>
    
  )
}