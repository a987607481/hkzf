import { SET_CITYNAME_ACTION } from '../actionTypes'
let defaultState = {
    cityName: '广州'
}
export default (state = defaultState, action) => {
    let { type, value } = action
    switch (type) {
        case SET_CITYNAME_ACTION:
            let newState = JSON.parse(JSON.stringify(state));
            newState.cityName = value;
            return newState
        default:
            return state
    }
}