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
          ? <p>Person is not your friend</p> 
          : <Calendar
              localizer={localizer}
              events={props.calendarStore.calendarEvents}
              startAccessor="start"
              endAccessor="end"
              selectable={false}
              style={{ height: "70vh" }}
            />
      }
    </div>
  );
}
export default observer(HomePage);
