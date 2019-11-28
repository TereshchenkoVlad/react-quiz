import React from "react";
import is from "is_js";
import "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from "axios";

export default class Auth extends React.Component {
    state = {
        isFormVaild: false,
        formControls: {
            email: {
                value: "",
                type: "email",
                label: "Email",
                errorMessage: "Please enter valid email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: "",
                type: "password",
                label: "Password",
                errorMessage: "Please enter valid password",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    logInHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try {
            const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEQpB29OMwG5MLTNwmyL8Uuhjeo4It1s0", authData);
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try {
            const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEQpB29OMwG5MLTNwmyL8Uuhjeo4It1s0", authData);
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    validateControl(value, validation){
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== "" && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }


        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls}; 
        const control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormVaild = true;

        Object.keys(formControls).forEach((name) => {
            isFormVaild = formControls[name].valid && isFormVaild;
        });

        this.setState({
            formControls, isFormVaild
        });
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input 
                    key={control + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            )
        });
    }

    render(){
        return (
            <div className="Auth">
                <div>
                    <h1>Authorization</h1>

                    <form onSubmit={this.submitHandler} className="AuthForm"> 
                        { this.renderInputs()}
                        <Button 
                            type="success" 
                            onClick={this.logInHandler} 
                            disabled={!this.state.isFormVaild}
                        >Login</Button>
                        <Button 
                            type="primary" 
                            onClick={this.registerHandler} 
                            disabled={!this.state.isFormVaild}
                        >Registration</Button>
                    </form>
                </div>
            </div>
        );
    }
};