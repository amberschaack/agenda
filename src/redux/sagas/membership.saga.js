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

function* joinGroup(action) {
    try {
        yield axios.post(`/api/membership/${action.payload}`);
        yield put({ type: 'FETCH_USER' });
    } catch (error) {
        console.log(`Error joining group`, error);
    }
}

function* unjoinGroup(action) {
    try {
        yield axios.delete(`/api/membership/${action.payload}`);
        yield put({ type: 'FETCH_MEMBERSHIPS' });
    } catch (error) {
        console.log(`Error unjoining group`, error);
    }
}

function* membershipSaga() {
    yield takeLeading('FETCH_MEMBERSHIPS', fetchMemberships);
    yield takeLeading('JOIN_GROUP', joinGroup);
    yield takeLeading('UNJOIN_GROUP', unjoinGroup);
}

export default membershipSaga;