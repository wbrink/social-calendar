import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
///////
import { CalendarStore } from "./pages/Profile/store.js";
const calendarStore = new CalendarStore();

ReactDOM.render(
  <React.StrictMode>
    <App calendarStore={calendarStore} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

///ORIGINAL CODE

// ReactDOM.render(
//   <React.StrictMode>
//     <App>

//     </App>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
