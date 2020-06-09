const APIURL = "http://localhost:3003";
const axios = require("axios");
// export const getCalendar = () => axios.get(`${APIURL}/calendar`);
export const getCalendar = (id) => axios.get(`/api/calendar/${id}`);

// export const addCalendar = (data) => axios.post(`${APIURL}/calendar`, data);
export const addCalendar = (data) => axios.post(`/api/calendar`, data);

export const editCalendar = (data) => axios.put(`/api/calendar/${data.id}`, data);

export const deleteCalendar = (id) => axios.delete(`/api/calendar/${id}`);
