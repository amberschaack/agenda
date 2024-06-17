import { put, takeLeading } from "redux-saga/effects";
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
        const result = yield axios.get(`/api/event/${action.payload}`);
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

function* eventSaga() {
    yield takeLeading('FETCH_EVENT', fetchEvents);
    yield takeLeading('FETCH_EVENT_DETAILS', fetchEventDetails);
    yield takeLeading('FETCH_EVENT_TYPES', fetchEventTypes);
}

export default eventSaga;