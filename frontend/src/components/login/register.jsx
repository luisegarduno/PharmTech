import React from "react";
import Logo from "../../images/pharmtechblue.png";
import Logo2 from "../../images/erpharmtechgrayer.png";
import {Link, Redirect} from "react-router-dom";
import { sha256 } from 'js-sha256';
import axios from 'axios'

export class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            loginType: "",
            checkPasswords: "",
        };
        this.getFirstName = this.getFirstName.bind(this);
        this.getLastName = this.getLastName.bind(this);
        this.getEmail = this.getEmail.bind(this)
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getConfirmPassword = this.getConfirmPassword.bind(this);
        this.findLoginType = this.findLoginType.bind(this);
        this.onRegister = this.onRegister.bind(this)
    }


    getFirstName(e) {
        this.setState({ firstName: e.target.value });
    }

    getLastName(e) {
        this.setState({ lastName: e.target.value });
    }

    getEmail(e) {
        this.setState({ email: e.target.value });
    }

    getPassword(e) {
        this.setState({ password: e.target.value });
    }

    getConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    getUsername(e) {
        this.setState({ username: e.target.value });
        localStorage.setItem('username', this.state.firstName);
    }

    findLoginType(e) {
        this.setState({ loginType: e.target.value });
    }

    onRegister() {
        const { password, confirmPassword } = this.state;
        // perform all neccassary validations
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            this.setState({checkPasswords: false});
            document.getElementById("password").value = "";
            document.getElementById("cpassword").value = "";
        }
        else {
            this.setState({checkPasswords: true});
            let password = this.state.password
            password = sha256(password);
            axios.put('http://localhost:8000/registerUser', {firstname: this.state.firstName, lastname: this.state.lastName, username: this.state.username, password: password, email: this.state.email, type: this.state.loginType})
        }
    }


    render() {
        return (
            <div>
                <div className = "navBar">
                    <nav>
                        <div className = "img">
                            <img src={Logo2} alt="Logo2"/>
                        </div>
                        <h1 className = "welcome">
                            Welcome To PharmTech!
                        </h1>
                    </nav>
                </div>
                <div className = "base-container" id = "register">
                    <div className = "contents">
                        <div className = "img">
                            <img id = "logo" src={Logo} alt="Logo"/>
                        </div>
                        <div className="form" id = "form">
                            <div className = "firstName" onChange={this.getFirstName}>
                                <input className="form-control mx-auto" type = "text" name="firstName" placeholder = "First Name" id = "input"></input>
                            </div>
                            <div className = "lastName" onChange={this.getLastName}>
                                <input className="form-control mx-auto" type = "text" name="lastName" placeholder = "Last Name" id = "input"></input>
                            </div>
                            <div className = "email" onChange={this.getEmail}>
                                <input className="form-control mx-auto" type = "email" name="email" placeholder = "Email" id = "input"></input>
                            </div>
                            <div className = "username" onChange={this.getUsername}>
                                <input className="form-control mx-auto" type = "text" name="username" placeholder = "Username" id = "input"></input>
                            </div>
                            <div className = "password" onChange={this.getPassword}>
                                <input className="form-control mx-auto" type = "password" name="password" placeholder = "Password" id = "password"></input>
                            </div>                    
                            <div className = "confirmPassword" onChange={this.getConfirmPassword}>
                                <input className="form-control mx-auto" type = "password" name="confirmPassword" placeholder = "Confirm Password" id = "cpassword"></input>
                            </div>
                            <div className = "loginType">
                                <select className="form-control mx-auto" id = "type" onChange={this.findLoginType}>
                                    <option value = "default">Select an account type...</option>
                                    <option value = "2">Pharmacy Manager</option>
                                    <option value = "4">Manufacturer</option>
                                    <option value = "1">Pharmacist</option>
                                    <option value = "3">Doctor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        {(() => {
                        if (this.state.loginType === "2" && this.state.firstName && this.state.lastName && this.state.email && this.state.username && this.state.password && this.state.confirmPassword ) {
                            return (
                                <div>
                                    <button type = "button" className="btn coloredBtn button" onClick ={this.onRegister}>Create Account</button>
                                    {this.state.checkPasswords ? 
                                    <Redirect to={"/pharmManager"}/>: 
                                    <Redirect to = {"/register"}/>}
                                </div>
                            )
                        } 
                        else if (this.state.loginType === "4" && this.state.firstName && this.state.lastName && this.state.email && this.state.username && this.state.password && this.state.confirmPassword ) {
                            return (
                                <div>
                                    <button type = "button" className="btn coloredBtn button" onClick ={this.onRegister}>Create Account</button>
                                    {this.state.checkPasswords ? 
                                    <Redirect to={"/Manufacturer"}/>: 
                                    <Redirect to = {"/register"}/>}
                                </div>
                            )
                        }
                        else if (this.state.loginType === "1" && this.state.firstName && this.state.lastName && this.state.email && this.state.username && this.state.password && this.state.confirmPassword ) {
                            return (
                                <div>
                                    <button type = "button" className="btn coloredBtn button" onClick ={this.onRegister}>Create Account</button>
                                    {this.state.checkPasswords ? 
                                    <Redirect to={"/Pharmacist"}/>: 
                                    <Redirect to = {"/register"}/>}
                                </div>
                            )
                        } 
                        else if (this.state.loginType === "3" && this.state.firstName && this.state.lastName && this.state.email && this.state.username && this.state.password && this.state.confirmPassword ) {
                            return (
                                <div>
                                    <button type = "button" className="btn coloredBtn button" onClick ={this.onRegister}>Create Account</button>
                                    {this.state.checkPasswords ? 
                                    <Redirect to={"/Doctor"}/>: 
                                    <Redirect to = {"/register"}/>}
                                </div>
                            )
                        }
                        })()}
                    </div>
                </div>
            </div>
        );
    }
}
