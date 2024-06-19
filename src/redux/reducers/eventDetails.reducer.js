const eventDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EVENT_DETAILS':
            return action.payload ?? {};
        case 'CLEAR_EVENT_DETAILS':
            return {};
        case 'EDIT_EVENT_DETAILS':
            console.log('modify state obj', state);
            console.log('action payload', action.payload);
            return {...state, ...action.payload};
        default: 
            return state;
    }
}

export default eventDetailsReducer;