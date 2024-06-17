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

function* rsvpSaga() {
    yield takeLeading('FETCH_RSVP', fetchRSVP);
}

export default rsvpSaga;