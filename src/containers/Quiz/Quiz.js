import React from "react";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizById, quizAnswerClick, retryQuiz } from "../../store/actions/quiz";

class Quiz extends React.Component {

    componentDidMount(){
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount(){
        this.props.retryQuiz();
    }
    
    render(){
        return (
            <div className="Quiz">
                <div className="QuizWrapper">
                    <h1>Quiz</h1>

                    {
                        this.props.loading || !this.props.quiz
                        ?
                        <Loader />
                        :
                        // Else
                        this.props.isFinished 
                        ?
                        <FinishedQuiz 
                            quiz={this.props.quiz}
                            results={this.props.results}
                            onRequiz={this.props.retryQuiz}
                        />
                        :
                        <ActiveQuiz 
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1} 
                            state={this.props.answerState}
                        />
                        // Else 
                    }
                    
                </div>
            </div>
        );
    }
};

function mapStateToProps (state) {
    return {
        results: state.quiz.results, 
        isFinished: state.quiz.isFinished, 
        activeQuestion: state.quiz.activeQuestion, 
        answerState: state.quiz.answerState,  
        quiz: state.quiz.quiz, 
        loading: state.quiz.loading
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);