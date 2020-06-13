////PAGE

import React, {useEffect, useState, useContext} from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import CalendarForm from "../../components/CalendarForm.js";
import { observer } from "mobx-react";
import { getCalendar } from "./requests";
import UserInfo from "../../components/userInfo/index.js";
import UserContext from "../../UserContext.js";
import { isLoggedInCB, isLoggedIn } from "../../utils/isLoggedIn.js";
import {useParams} from "react-router-dom";
import "./profile.css";

const localizer = momentLocalizer(moment);

function HomePage(props) {

  const {userState, setUserState} = useContext(UserContext);
  const {usernameParam} = useParams();
  // if props.location.state == undefined then we were redirected from another page to view either logged in users friend or someone else
  const loggedInUsersProfile = (props.location.state == undefined) ? false : true;
  
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [calendarEvent, setCalendarEvent] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);
  const [found, setFound] = useState(false);
  
  // hide Modals : called by
  const hideModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  // called
  const getCalendarEvents = async (id) => {
    console.log("in the getCalendar", userState);
    // if (userState.loggedIn) {
      const response = await getCalendar(id);
      console.log(response);
      if (response.data.length == 0) {
        console.log("no elements in array")
        const evs = [];
        props.calendarStore.setCalendarEvents(evs); // 
        setInitialized(true);
        return;
      } else {
        // console.log(response.data.length);
        const evs = response.data.map((d) => {
          return {
            // ...d,
            id: d._id,
            title: d.title,
            allday: d.allDay,
            start: new Date(d.start),
            end: new Date(d.end),
          };
        });
        console.log(evs);
        props.calendarStore.setCalendarEvents(evs); // 
        setInitialized(true);
      }
    
  };

  // (in calendar component) callback fired when a date selection is made
  const handleSelect = (event, e) => {
    const { start, end } = event;
    const data = { title: "", start, end, allDay: false};
    setShowAddModal(true);
    setShowEditModal(false);
    setCalendarEvent(data);
  };

  // (in calendar componenet) callback fired when a calendar event is selected
  const handleSelectEvent = (event, e) => {
    setShowAddModal(false);
    setShowEditModal(true);
    let { id, title, start, end, allDay } = event;
    start = new Date(start);
    end = new Date(end);
    const data = { id, title, start, end, allDay };
    setCalendarEvent(data);
  };

  // grab calendar events from requests.js ()
  // React.useEffect(() => {
  //   if (!initialized) {
  //     getCalendarEvents();
  //   }
  // });

  // this logs the user in when the page refreshes since userstate is reset to default
  useEffect(() => {
    if (userState.loggedIn === false) {
      isLoggedIn(userState, setUserState, props);
    } else {
      // if they are logged in 
      if (usernameParam == undefined) { 
        // then we are we are only using /profile (personal profile);
        getCalendarEvents(userState._id);
      } else {
        // then we are in someone elses profile
        fetch(`/api/user/${usernameParam}`)
          .then(res => res.json())
          .then(user => {
            const bool = userState.friends.some(el => el._id === user._id);
            if (bool) {
              getCalendarEvents(user._id);
              setFound(true);
            } 
            
          })
      }
    }
  }, [])

  // this runs when the userstate is changed (i.e after first useEffect that logs in the user in)
  useEffect(() => {
    console.log("changed user State");
    if (userState.loggedIn) {
      // copy here and down
      if (usernameParam == undefined) { 
        // then we are we are only using /profile (personal profile);
        getCalendarEvents(userState._id);
      } else {
        // then we are in someone elses profile
        fetch(`/api/user/${usernameParam}`)
          .then(res => res.json())
          .then(user => {
            // setID(id);
            const bool = userState.friends.some(el => el._id === user._id);
            if (bool) {
              getCalendarEvents(user._id);
              setFound(true);
            } 
          })
      }
    }
  }, [userState])



  // if not logged in don't show the route at all
  if (userState.loggedIn == false) {
    return (<body></body>)
  }

  return (
    <div className="page">
      {/* userinfo component */}
  
      {usernameParam == undefined 
      ? <UserInfo name={userState.username} /> 
      : <UserInfo name={usernameParam} />}
      {/* {props.location.state == undefined ? <UserInfo state={{user: {...userState}}}/> : <UserInfo {...props.location}/>} */}
      

      {/* Modal component */}
      <Modal show={showAddModal} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Add Calendar Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarForm
            calendarStore={props.calendarStore}
            calendarEvent={calendarEvent}
            userID={userState._id}
            onCancel={hideModals.bind(this)}
            edit={false}
          />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Calendar Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarForm
            calendarStore={props.calendarStore}
            calendarEvent={calendarEvent}
            userID={userState._id}
            onCancel={hideModals.bind(this)}
            edit={true}
          />
        </Modal.Body>
      </Modal>

      {/* calendar Component*/}
      {usernameParam == undefined
        ? <Calendar
            localizer={localizer}
            events={props.calendarStore.calendarEvents}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            style={{ height: "70vh" }}
            onSelectSlot={handleSelect}
            onSelectEvent={handleSelectEvent}
          />
        : usernameParam != undefined && found == false 
          ? <div id="calendar-blur">
              <div id="message-box" className="warning">
                <svg id="alert-icon" class="bi bi-exclamation-circle" width="1.3em" height="1.4em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
                Must Be Friends To View Calendar
              </div>
            </div> 
          : <Calendar
              localizer={localizer}
              events={props.calendarStore.calendarEvents}
              startAccessor="start"
              endAccessor="end"
              longPressThreshold="0"
              selectable={false}
              style={{ height: "70vh" }}
            />
      }
    </div>
  );
}
export default observer(HomePage);
