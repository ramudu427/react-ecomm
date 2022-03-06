import React from 'react';
import './login.scss';
import { object } from 'prop-types';

class LoginComponent extends React.Component {
    constructor() {
        super()
        this.state = { email: '', password: '', emailError: '', passwordError: '' };
        this.onChange = this.onChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.goToSignup = this.goToSignup.bind(this);
        this.errosMsg='';
    }
    onChange = event => {
        let me = this;
        me.setState({ [event.target.name]: event.target.value });
        this.validate();
    }
    validate = () => {
        let errors = {};
        if (!this.state.email && !this.state.password) {
            this.setState({ emailError: "Email is required", passwordError: "password is required" });
        }
        else if (!this.state.email || !this.state.password) {
            if (!this.state.email) {
                this.setState({ emailError: "Email is required" });
            } else if (!this.state.password) {
                this.setState({ passwordError: "password is required" });
            }
            return false;
        }
        else {
            this.setState({ emailError: "", passwordError: "" });
            return true;
        }
    }

    submitLogin(event) {
        var me = this;
        event.preventDefault();
        let valid = me.validate();
        let errosMsg;
        if (!valid) {
            console.log("in the error")
            return false;
        } else {
            console.log("in the true")
            fetch('http://localhost:3001/auth/login', { method: "post", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.state) }).
                then((res) => {
                    return res.json();
                }).then(function (data) {
                    console.log("data ", data);
                    if (data.status) {
                        document.cookie = "token=" + data.token;
                        window.location.href = "/dashboard";
                    }else{
                        me.errosMsg=data.info;
                        return false;
                    }

                })
        }

    }
    goToSignup() {
        const { history } = this.props;
        history.push('/signup')
    }

    render() {
        return (
            <div className="container">
                <div className="loginBlock col-6">
                    <form noValidate>
                        <div className="row">
                        {this.errosMsg?<div className="col-8 offset-2" style={{'color':'red'}}>{this.errosMsg}</div>:''}
                            <div className="col-8 offset-2">
                                <div className="form-group">
                                    <label className="form-label">Email:</label>
                                    <input type="text" value={this.state.email} name="email" className="form-control" onChange={this.onChange}></input>
                                    {this.state.emailError ? <span style={{ color: "red" }}>{this.state.emailError}</span> : null}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8 offset-2">
                                <div className="form-group">
                                    <label className="form-label">Password:</label>
                                    <input type="password" value={this.state.password} name="password" className="form-control" onChange={this.onChange}></input>
                                    {this.state.passwordError ? <span style={{ color: "red" }}>{this.state.passwordError}</span> : null}

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8 offset-2">
                                <button className="bgBlueviolet btn btn-primary w-100" onClick={this.submitLogin}>Login</button>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-8 offset-2">
                                <button className="bgBlueviolet btn btn-primary w-100" onClick={this.goToSignup}>Signup</button>
                            </div>
                        </div>
                    </form>

                </div>


            </div>
        )
    }
}
export default LoginComponent;