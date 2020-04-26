import React from "react";
import Logo from "../../images/pharmtechblue.png";
import Logo2 from "../../images/erpharmtechgrayer.png";
import {Link, Redirect} from "react-router-dom";

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
                                <input type = "text" name="firstName" placeholder = "First Name" id = "input"></input>
                            </div>
                            <div className = "lastName" onChange={this.getLastName}>
                                <input type = "text" name="lastName" placeholder = "Last Name" id = "input"></input>
                            </div>
                            <div className = "email" onChange={this.getEmail}>
                                <input type = "email" name="email" placeholder = "Email" id = "input"></input>
                            </div>
                            <div className = "username" onChange={this.getUsername}>
                                <input type = "text" name="username" placeholder = "Username" id = "input"></input>
                            </div>
                            <div className = "password" onChange={this.getPassword}>
                                <input type = "password" name="password" placeholder = "Password" id = "password"></input>
                            </div>                    
                            <div className = "confirmPassword" onChange={this.getConfirmPassword}>
                                <input type = "password" name="confirmPassword" placeholder = "Confirm Password" id = "cpassword"></input>
                            </div>
                            <div className = "loginType">
                                <select id = "type" onChange={this.findLoginType}>
                                    <option value = "default">Select an account type...</option>
                                    <option value = "pharmManager">Pharmacy Manager</option>
                                    <option value = "Manufacturer">Manufacturer</option>
                                    <option value = "Pharmacist">Pharmacist</option>
                                    <option value = "Doctor">Doctor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        {(() => {
                        if (this.state.loginType === "pharmManager" && this.state.firstName && this.state.lastName && this.state.email && this.state.username && this.state.password && this.state.confirmPassword ) {
                            return (
                                <div>
                                    <button type = "button" className="button" onClick ={this.onRegister}>Create Account</button>
                                    {this.state.checkPasswords ? 
                                    <Redirect to={"/pharmManager"}/>: 
                                    <Redirect to = {"/register"}/>}
                                </div>
                            )
                        } 
                        else if (this.state.loginType === "Manufacturer" && this.state.firstName && this.state.lastName && this.state.email && this.state.username && this.state.password && this.state.confirmPassword ) {
                            return (
                                <div>
                                    <button type = "button" className="button" onClick ={this.onRegister}>Create Account</button>
                                    {this.state.checkPasswords ? 
                                    <Redirect to={"/Manufacturer"}/>: 
                                    <Redirect to = {"/register"}/>}
                                </div>
                            )
                        }
                        else if (this.state.loginType === "Pharmacist" && this.state.firstName && this.state.lastName && this.state.email && this.state.username && this.state.password && this.state.confirmPassword ) {
                            return (
                                <div>
                                    <button type = "button" className="button" onClick ={this.onRegister}>Create Account</button>
                                    {this.state.checkPasswords ? 
                                    <Redirect to={"/Pharmacist"}/>: 
                                    <Redirect to = {"/register"}/>}
                                </div>
                            )
                        } 
                        else if (this.state.loginType === "Doctor" && this.state.firstName && this.state.lastName && this.state.email && this.state.username && this.state.password && this.state.confirmPassword ) {
                            return (
                                <div>
                                    <button type = "button" className="button" onClick ={this.onRegister}>Create Account</button>
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
