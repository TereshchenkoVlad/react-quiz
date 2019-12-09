import React from "react";
import is from "is_js";
import "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

class Auth extends React.Component {
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

    logInHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
            );
    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
            );
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

// function mapStateToProps (state) {
//     return {

//     }
// }

function mapDispatchToProps (dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);