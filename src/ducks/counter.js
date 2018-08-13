// CONSTANTS
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const UNDO = 'UNDO';
const REDO = 'REDO';


// ACTION CREATORS
export function increment(amount) {
    return {
        type: INCREMENT,
        payload: amount
    }
}

export function decrement(amount) {
    return {
        type: DECREMENT,
        payload: amount
    }
}

export function undoing() {
    return {
        type: UNDO
    }
}

export function redoing() {
    return {
        type: REDO
    }
}

// make a reducer 
// export default reducer

const defaultState = {
    currentValue: 0,
    futureValues: [],
    previousValues: [],
    disableUndo: true,
    disableRedo: true
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case INCREMENT:
            let oldVals = state.previousValues.slice()
            oldVals.unshift(state.currentValue);
            let newVal = action.payload + state.currentValue;
            let future = []
            return Object.assign({}, state, {
                currentValue: newVal,
                futureValues: future,
                previousValues: oldVals
            })
        case DECREMENT:
            oldVals = state.previousValues.slice();
            oldVals.unshift(state.currentValue)
            newVal = state.currentValue - action.payload;
            future = [];
            return Object.assign({}, state, {
                currentValue: newVal,
                futureValues: future,
                previousValues: oldVals
            })
        case UNDO:
            newVal = state.previousValues[0];

            oldVals = state.previousValues.slice(1);
            future = state.futureValues.slice();
            future.unshift(state.currentValue);
            return Object.assign({}, state, {
                currentValue: newVal,
                futureValues: future,
                previousValues: oldVals
            })
        case REDO:
            newVal = state.futureValues[0]
            oldVals = state.previousValues.slice()
            oldVals.unshift(state.currentValue);
            future = state.futureValues.slice(1)
            return Object.assign({}, state, {
                currentValue: newVal,
                futureValues: future,
                previousValues: oldVals
            })
        default:
            console.log('you broke it...')
            return state;
    }
}

export default reducer;