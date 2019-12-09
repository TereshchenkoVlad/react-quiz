import axios from "axios";
import { AUTH_SUCCESS, AUTH_LOG_OUT } from "./actionsTypes"

export function auth (email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEQpB29OMwG5MLTNwmyL8Uuhjeo4It1s0";

        if (isLogin) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEQpB29OMwG5MLTNwmyL8Uuhjeo4It1s0";
        }

        const res = await axios.post(url, authData);
        const data = res.data;
        const expirationData = new Date(new Date().getTime() + data.expiresIn * 1000); 

        localStorage.setItem("token", data.idToken);
        localStorage.setItem("userId", data.localId);
        localStorage.setItem("expirationData", expirationData);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogOut(data.expiresIn));
    }
}

export function authSuccess (token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogOut (time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, time * 1000);
    }
}

export function logOut () {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); 
    localStorage.removeItem("expirationData");

    return {
        type: AUTH_LOG_OUT
    }
}