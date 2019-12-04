import axios from "../../axios/axios-quiz";
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR } from "../actions/actionsTypes";

export function fetchQuizes () {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const res = await axios.get("quizes.json");
            
            const quizes = [];
            Object.keys(res.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            });
            dispatch(fetchQuizesSuccess(quizes));

        } catch (e) {
            dispatch(fetchQuizesError(e));
        }
    }
}

export function fetchQuizesStart () {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess (quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError (e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}