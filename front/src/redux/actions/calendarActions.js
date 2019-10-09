/* eslint-disable import/prefer-default-export */
import {
  ADD_EVENT, //
  DELETE_EVENT,
  GET_EVENT,
  UPDATE_EVENT,
} from '../actionNames/calendarActionNames';

export const getEvents = (cookies) => async (dispatch) => {
  try {
    const response = await fetch('http://134.209.82.36:3000/api/family/calendar', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    const calendars = data[0].Calendars;
    // console.log('calendars',calendars);
    const selected = calendars.map((date) => date.dateStart.substr(0, 10));
    // console.log('selected ----------',selected);
    const selectedObj = {};
    selected.forEach((element) => {
      selectedObj[element] = { color: 'green' };
    });
    console.log('selectedObj--------', selectedObj);
    
    dispatch({ type: GET_EVENT, payload: selectedObj });
  } catch (err) {
    console.log(err);
  }
};

export const addEvent = (cookies,event) => async (dispatch) => {
  try {
    const response = await fetch('http://134.209.82.36:3000/api/user/calendar', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });

    // dispatch({ type: ADD_EVENT, payload: data });
  } catch (err) {
    console.log(err);
  }
  getEvents();
};

export const deleteEvent = (cookies,id) => async (dispatch) => {
  try {
    const response = await fetch('http://134.209.82.36:3000/api/user/calendar', {
      method: 'DELETE',
      body: JSON.stringify(id),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    // const data = await response.json();
    // dispatch({ type: DELETE_EVENT, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateEvent = (cookies) => async (dispatch) => {
  try {
    const response = await fetch('http://134.209.82.36:3000/api/user/calendar', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    const data = await response.json();
    console.log(data);
    dispatch({ type: UPDATE_EVENT, payload: data });
  } catch (err) {
    console.log(err);
  }
};
