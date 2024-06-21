import { put, takeLeading } from "redux-saga/effects";
import axios from "axios";

function* fetchRSVP(action) {
    try {
        const result = yield axios.get(`/api/rsvp/${action.payload}`);
        yield put({ type: 'SET_RSVP', payload: result.data ?? {}});
        console.log(result);
    } catch (error) {
        console.log(`Error getting RSVPs`, error);
    }
}

function* updateRSVP(action) {
    try {
        console.log('action payload', action.payload);
        yield axios.put(`/api/rsvp/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_RSVP', payload: action.payload.id});
    } catch (error) {
        console.log(`Error getting RSVPs`, error);
    }
}

function* rsvpSaga() {
    yield takeLeading('FETCH_RSVP', fetchRSVP);
    yield takeLeading('UPDATE_RSVP', updateRSVP);
}

export default rsvpSaga;