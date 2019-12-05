import axios from "../../axios/axios-quiz";
import { 
    FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE, FINISH_QUIZ,
    QUIZ_NEXT_QUESTION, QUIZ_RETRY
} from "../actions/actionsTypes";

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

export function fetchQuizById (quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const res = await axios.get(`quizes/${quizId}.json`);
            const quiz = res.data;
            dispatch(fetchQuizSuccess(quiz));
        } catch (e) {
            dispatch(fetchQuizesError(e));
        }
    }
}

export function fetchQuizSuccess (quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizAnswerClick (answerId) {
    return (dispatch, getState) => {
        
        const state = getState().quiz;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === "success") return;
        }

        // Checking thec correct answer if rightAnswerId === answerId the current item event than OK
        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = "success";
            }

            dispatch(quizSetState({[answerId]: "success"}, results));

            // Action for button if Answer is correct
            const timeOut = window.setTimeout(() => {

                // If this is the last question we do ->
                if (state.quiz.length === state.activeQuestion + 1) {
                    dispatch(finishQuiz());

                // If this is not the END we do -> 
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }
                window.clearTimeout(timeOut);
            }, 500);

        // If answert is WRONG we do other things 
        } else {

            // // Set Result to state
            results[question.id] = "error";
            dispatch(quizSetState({[answerId]: "error"}, results));
        }
    }
}

export function quizSetState (answerState, results) {
    return {
        type: QUIZ_SET_STATE, 
        answerState, 
        results
    }
}

export function finishQuiz () {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion (questionNumber) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number: questionNumber
    }
}

export function retryQuiz () {
    return {
        type: QUIZ_RETRY
    }
}