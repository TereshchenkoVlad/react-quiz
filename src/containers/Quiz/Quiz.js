import React from "react";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends React.Component {
    state = {
        results: {}, 
        isFinished: false,
        activeQuestion: 0,
        answerState: null, 
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === "success") return;
        }

        // Checking thec correct answer if rightAnswerId === answerId the current item event than OK
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = "success";
            }

            // Set Result to state
            this.setState({
                answerState: {[answerId]: "success"},
                results
            })

            // Action for button if Answer is correct
            const timeOut = window.setTimeout(() => {

                // If this is the last question we do ->
                if (this.state.quiz.length === this.state.activeQuestion + 1) {
                    this.setState({isFinished: true});

                // If this is not the END we do -> 
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeOut);
            }, 500);

        // If answert is WRONG we do other things 
        } else {

            // // Set Result to state
            results[question.id] = "error";
            this.setState({
                answerState: {[answerId]: "error"},
                results
            })
        }
    }

    requizHandler = () => {
        this.setState({
            activeQuestion:0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    async componentDidMount(){
        try {
            const res = await axios.get(`quizes/${this.props.match.params.id}.json`);
            const quiz = res.data;

            this.setState({
                quiz,
                loading: false
            });
        } catch (e) {
            console.log(e);
        }
    }
    
    render(){
        return (
            <div className="Quiz">
                <div className="QuizWrapper">
                    <h1>Quiz</h1>

                    {
                        this.state.loading 
                        ?
                        <Loader />
                        :
                        // Else
                        this.state.isFinished 
                        ?
                        <FinishedQuiz 
                            quiz={this.state.quiz}
                            results={this.state.results}
                            onRequiz={this.requizHandler}
                        />
                        :
                        <ActiveQuiz 
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1} 
                            state={this.state.answerState}
                        />
                        // Else 
                    }
                    
                </div>
            </div>
        );
    }
}

export default Quiz;