import axios from "axios";

export default axios.create({
    baseURL: "https://react-quiz-c1dbe.firebaseio.com/"
});