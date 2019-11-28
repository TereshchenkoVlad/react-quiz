import React from "react";
import "./FinishedQuiz.css";
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === "success") {
            total++;
        }
        return total;
    },0)

    return (
        <div className="FinishedQuiz">
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        "fa", 
                        props.results[quizItem.id] === "error" ? "fa-times" : "fa-check",
                        `FinishedQuiz_${props.results[quizItem.id]}`
                    ];

                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>. &nbsp;
                            {quizItem.question}
                            <i className={cls.join(" ")}/>
                        </li>
                    );
                }) }
            </ul>

            <p>Correct {successCount} from {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRequiz} type="primary">Requiz</Button>
                <Link to="/">
                    <Button type="success">Test list</Button>
                </Link>
            </div>
        </div>
)};

export default FinishedQuiz;