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

function* fetchAllGroups() {
    try {
        const result = yield axios.get('/api/group/all-groups');
        yield put({ type: 'SET_ALL_GROUPS', payload: result.data });
        console.log(result);
    } catch (error) {
        console.log(`Error getting all groups`, error);
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

function* editGroup(action) {
    try {
        console.log('action payload', action.payload);
        yield axios.put(`/api/group/${action.payload.groupId}`, action.payload.details);
        yield put({ type: 'FETCH_GROUP_DETAILS', payload: action.payload.groupId });
        yield put({ type: 'CLEAR_GROUP_DETAILS' });
    } catch (error) {
        console.log(`Error editing group`, error);
    }
}

function* deleteGroup(action) {
    try {
        console.log('action payload', action.payload);
        yield axios.delete(`/api/group/${action.payload}`);
    } catch (error) {
        console.log(`Error deleting group`, error);
    }
}

function* joinGroup(action) {
    try {
        yield axios.post(`/api/membership/${action.payload}`);
    } catch (error) {
        console.log(`Error joining group`, error);
    }
}


function* groupSaga() {
    yield takeLeading('FETCH_GROUP', fetchGroups);
    yield takeLeading('FETCH_GROUP_DETAILS', fetchGroupDetails);
    yield takeLeading('ADD_GROUP', addGroup);
    yield takeLeading('FETCH_ALL_GROUPS', fetchAllGroups);
    yield takeLeading('EDIT_GROUP', editGroup);
    yield takeLeading('DELETE_GROUP', deleteGroup);
    yield takeLeading('JOIN_GROUP', joinGroup);
}

export default groupSaga;