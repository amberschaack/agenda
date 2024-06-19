import { put, takeLeading } from "redux-saga/effects";
import axios from "axios";

function* fetchMemberships(action) {
    try {
        const result = yield axios.get(`/api/membership/${action.payload}`);
        yield put({ type: 'SET_MEMBERSHIPS', payload: result.data ?? []});
        console.log(result);
    } catch (error) {
        console.log(`Error getting memberships`, error);
    }
}

function* membershipSaga() {
    yield takeLeading('FETCH_MEMBERSHIPS', fetchMemberships);
}

export default membershipSaga;