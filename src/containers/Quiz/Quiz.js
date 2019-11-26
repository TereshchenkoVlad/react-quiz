import React from "react";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
    state = {
        results: {}, // {[id]: success}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: "success" "error" }
        quiz: [
            {
                question: "What is the actual colour of the sky?",
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: "Yellow-Blue", id: 1},
                    {text: "Blue", id: 2},
                    {text: "White-Blue", id: 3},
                    {text: "White", id: 4}
                ]
            },
            {
                question: "What is capital of Ukraine?",
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: "Dnipro", id: 1},
                    {text: "Kharkiv", id: 2},
                    {text: "Kiev", id: 3},
                    {text: "Lviv", id: 4}
                ]
            }
        ]
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

        console.log(this.state.results);
    }

    requizHandler = () => {
        this.setState({
            activeQuestion:0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    componentDidMount(){
        console.log("Quiz ID = ", this.props.match.params.id);
    }
    
    render(){
        return (
            <div className="Quiz">
                <div className="QuizWrapper">
                    <h1>Quiz</h1>
                    {
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
                    }
                    
                </div>
            </div>
        );
    }
}

export default Quiz;