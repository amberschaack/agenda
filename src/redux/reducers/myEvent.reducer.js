const myEventReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MY_EVENT':
            return action.payload;
        default:
            return state;
    }
}

export default myEventReducer;