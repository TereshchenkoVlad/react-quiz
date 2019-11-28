import React from "react";
import "./QuizList.css";
import {NavLink} from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends React.Component {
    state = {
        quizes: [],
        loading: true
    }

    renderQuizes(){
        return this.state.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={"/quiz/" + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            );
        })
    }

    async componentDidMount(){
        try {
            const res = await axios.get("quizes.json");
            
            const quizes = [];
            Object.keys(res.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            });
            this.setState({
                quizes,
                loading: false
            });

        } catch (e) {
            console.log(e);
        }
    }

    render(){
        return (
            <div className="QuizList">
                <div>
                    <h1>Test List</h1>

                    { this.state.loading 
                    ? 
                    <Loader />
                    : 
                    <ul>
                        { this.renderQuizes() }
                    </ul>
                    }
                    
                </div>
            </div>
        );
    }
};