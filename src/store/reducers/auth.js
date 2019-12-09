import { AUTH_SUCCESS, AUTH_LOG_OUT } from "../actions/actionsTypes";

const initialState = {
    token: null
};

export default function authReducer (state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token
            }
        case AUTH_LOG_OUT:
            return {
                ...state,
                token: null
            }
        default:
            return state;
    }
}