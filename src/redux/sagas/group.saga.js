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


function* groupSaga() {
    yield takeLeading('FETCH_GROUP', fetchGroups);
}

export default groupSaga;