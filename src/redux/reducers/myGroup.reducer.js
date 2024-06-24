const myGroupReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MY_GROUP':
            return action.payload;
        default:
            return state;
    }
}

export default myGroupReducer;