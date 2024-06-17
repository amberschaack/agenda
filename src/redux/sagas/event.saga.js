import { put, takeLeading } from "redux-saga/effects";
import axios from "axios";

function* fetchEvents() {
    try {
        const response = yield axios.get('/api/event');
        yield put({ type: 'SET_EVENT', payload: response.data});
    } catch (error) {
        console.log(`Error getting events`, error);
    }
}

function* eventSaga() {
    yield takeLeading('FETCH_EVENT', fetchEvents);
}

export default eventSaga;