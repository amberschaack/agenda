import { put, takeLeading } from "redux-saga/effects";
import axios from "axios";

function* fetchGroups() {
    try {
        const result = yield axios.get('/api/group');
        yield put({ type: 'SET_GROUP', payload: result.data });
        console.log(result);
    } catch (error) {
        console.log(`Error getting groups`, error);
    }
}

function* fetchGroupDetails(action) {
    try {
        const result = yield axios.get(`/api/group/${action.payload}`);
        yield put({ type: 'SET_GROUP_DETAILS', payload: result.data ?? {}});
        console.log(result);
    } catch (error) {
        console.log(`Error getting group details`, error);
    }
}

function* addGroup(action) {
    try {
        yield axios.post('/api/group', action.payload);
        yield put({ type: 'FETCH_GROUP' });
    } catch (error) {
        console.log(`Error getting groups`, error);
    }
}


function* groupSaga() {
    yield takeLeading('FETCH_GROUP', fetchGroups);
    yield takeLeading('FETCH_GROUP_DETAILS', fetchGroupDetails);
    yield takeLeading('ADD_GROUP', addGroup);
}

export default groupSaga;