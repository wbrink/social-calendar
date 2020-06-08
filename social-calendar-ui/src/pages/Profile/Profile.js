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
import { isLoggedInCB } from "../../utils/isLoggedIn.js";

const localizer = momentLocalizer(moment);

function HomePage(props) {

  const {userState, setUserState} = useContext(UserContext);

  // if props.location.state == undefined then we were redirected from another page to view either logged in users friend or someone else
  const loggedInUsersProfile = (props.location.state == undefined) ? false : true;
  
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [calendarEvent, setCalendarEvent] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);
  
  // hide Modals : called by
  const hideModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  // called
  const getCalendarEvents = async () => {
    // if (userState.loggedIn) {
      const response = await getCalendar();
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
      isLoggedInCB(userState, setUserState, props, () => {
        getCalendarEvents();
        console.log("here");
      });
    }
  }, [])


  // if not logged in don't show the route at all
  if (userState.loggedIn == false) {
    return (<body></body>)
  }

  return (
    <div className="page">
      {/* userinfo component */}
  

      {props.location.state == undefined ? <UserInfo state={{user: {...userState}}}/> : <UserInfo {...props.location}/>}
      

      {/* Modal component */}
      <Modal show={showAddModal} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Add Calendar Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarForm
            calendarStore={props.calendarStore}
            calendarEvent={calendarEvent}
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
            onCancel={hideModals.bind(this)}
            edit={true}
          />
        </Modal.Body>
      </Modal>

      {/* calendar Component*/}
      <Calendar
        localizer={localizer}
        events={props.calendarStore.calendarEvents}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        style={{ height: "70vh" }}
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
export default observer(HomePage);
