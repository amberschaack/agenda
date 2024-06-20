import { put, takeEvery, takeLeading } from "redux-saga/effects";
import axios from "axios";

function* fetchEvents() {
    try {
        const result = yield axios.get('/api/event');
        yield put({ type: 'SET_EVENT', payload: result.data});
        console.log(result);
    } catch (error) {
        console.log(`Error getting events`, error);
    }
}

function* fetchEventDetails(action) {
    try {
        console.log('Action.payload', action.payload);
        const result = yield axios.get(`/api/event/${action.payload}`);
        console.log('result.data', result.data);
        yield put({ type: 'SET_EVENT_DETAILS', payload: result.data ?? {}});
        console.log(result);
    } catch (error) {
        console.log(`Error getting event details`, error);
    }
}

function* fetchEventTypes() {
    try {
        const result = yield axios.get('/api/event/types');
        yield put({ type: 'SET_EVENT_TYPES', payload: result.data});
        console.log(result);
    } catch (error) {
        console.log(`Error getting event types`, error);
    }
}

function* fetchMyEvents() {
    try {
        const result = yield axios.get('/api/event/my-event');
        yield put({ type: 'SET_MY_EVENT', payload: result.data });
        console.log(result);
    } catch (error) {
        console.log(`Error getting users events`, error);
    }
}

function* addEvent(action) {
    try {
        yield axios.post('/api/event', action.payload);
        yield put({ type: 'FETCH_EVENT' });
    } catch (error) {
        console.log(`Error adding new event`, error);
    }
}

function* editEvent(action) {
    try {
        console.log('action.payload', action.payload);
        yield axios.put(`/api/event/${action.payload.eventId}`, action.payload.details);
        yield put({ type: 'FETCH_EVENT_DETAILS', payload: action.payload.eventId });
        yield put({ type: 'CLEAR_EVENT_DETAILS' });
    } catch (error) {
        console.log(`Error editing event`, error);
    }
}

function* deleteEvent(action) {
    try {
        console.log('action payload', action.payload);
        yield axios.delete(`/api/event/${action.payload}`);
    } catch (error) {
        console.log(`Error deleting event`, error);
    }
}

function* eventSaga() {
    yield takeLeading('FETCH_EVENT', fetchEvents);
    yield takeLeading('FETCH_EVENT_DETAILS', fetchEventDetails);
    yield takeLeading('FETCH_EVENT_TYPES', fetchEventTypes);
    yield takeLeading('ADD_EVENT', addEvent);
    yield takeLeading('FETCH_MY_EVENT', fetchMyEvents);
    yield takeLeading('EDIT_EVENT', editEvent);
    yield takeLeading('DELETE_EVENT', deleteEvent);
}

export default eventSaga;