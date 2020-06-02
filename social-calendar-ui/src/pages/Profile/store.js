import { observable, action, decorate } from "mobx";
class CalendarStore {
  calendarEvents = [];
  setCalendarEvents(calendarEvents) {
    this.calendarEvents = calendarEvents;
  }
}
CalendarStore = decorate(CalendarStore, {
  calendarEvents: observable,
  setCalendarEvents: action,
});
export { CalendarStore };
