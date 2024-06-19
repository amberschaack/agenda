const membershipReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MEMBERSHIPS':
            return action.payload ?? [];
        default:
            return state;
    }
}

export default membershipReducer;