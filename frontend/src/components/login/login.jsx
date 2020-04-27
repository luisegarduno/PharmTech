import React from "react";
import Logo from "../../images/pharmtechblue.png";
import Logo2 from "../../images/erpharmtechgrayer.png";
import {Link, Redirect} from "react-router-dom";
import { sha256 } from 'js-sha256';
import { LoginRepository } from "../../API";
import axios from 'axios'

export class Login extends React.Component {

    loginRepository = new LoginRepository()

    constructor(props) {
        localStorage.setItem('username', null)
        super(props);
        this.state = {
            loginType: "0",
            username: "",
            password: "",
            redirect: "",
        };
        this.findLoginType = this.findLoginType.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.onLogin = this.onLogin.bind(this)
        this.badLogin = this.badLogin.bind(this)
        this.goodLogin = this.goodLogin.bind(this)
    }
    findLoginType(e) {
        this.setState({ loginType: e.target.value });
    }
    getUsername(e) {
        var value = e.target.value;
        this.setState({username: value});
    }

    getPassword(e) {
        var value = e.target.value;
        this.setState({password: value});
    }

    onLogin() {
        let password = this.state.password
        password = sha256(password);
        console.log(this.loginRepository.verifyUser(this.state.username, password, this.state.loginType))
        axios.post('http://localhost:8000/verifyUser', {username: this.state.username, password: password, type: this.state.loginType})
                    .then(response => {
                        if (response.data === 0) {
                            this.badLogin()
                        }
                        else {
                            console.log(response.data)
                            this.goodLogin(response.data)
                        }
        })
    }

    badLogin() {
        alert("Invalid Login");
        this.setState({redirect: false})
        document.getElementById("loginfo").reset();
    }

    goodLogin(name) {
        localStorage.setItem('username', name);
        this.setState({redirect: true})
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
                <div className = "base-container">
                    <div className = "contents">
                        <div className = "image">
                            <img id = "logo" src={Logo} alt="Logo"/>
                        </div>
                        <form id = "loginfo" className="form">
                            <div className = "username" onChange={this.getUsername}>
                                <input className="form-control mx-auto" type = "text" name="username" placeholder = "Username" id = "input"></input>
                            </div>
                            <div className = "password" onChange={this.getPassword}>
                                <input className="form-control mx-auto" type = "password" name="password" placeholder = "Password" id = "input"></input>
                            </div>
                            <div className = "loginType">
                                <select className="form-control mx-auto" id = "type" onChange={this.findLoginType}>
                                    <option value = "0" >Select an account type...</option>
                                    <option value = "2">Pharmacy Manager</option>
                                    <option value = "4">Manufacturer</option>
                                    <option value = "1">Pharmacist</option>
                                    <option value = "3">Doctor</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="footer">
                        {(() => {
                        if (this.state.loginType === "0") {
                            return (
                                <div>
                                    <button type = "button" className="btn coloredBtn button disabled">Login</button>
                                </div>
                            )
                        }
                        else if (this.state.loginType === "2" && this.state.username) {
                            return (
                                <div>
                                    <button type = "button" className="btn coloredBtn button" onClick ={this.onLogin}>Login</button>
                                    {this.state.redirect ? 
                                    <Redirect to={"/pharmManager"}/>: 
                                    <Redirect to = {"/"}/>}
                                </div>
                            )
                        }
                        else if (this.state.loginType === "4" && this.state.username) {
                            return (
                                <div>
                                    <button type = "button" className="btn coloredBtn button" onClick ={this.onLogin}>Login</button>
                                    {this.state.redirect ? 
                                    <Redirect to={"/Manufacturer"}/>: 
                                    <Redirect to = {"/"}/>}
                                </div>
                            )
                        }
                        else if (this.state.loginType === "1" && this.state.username) {
                            return (
                                <div>
                                    <button type = "button" className="btn coloredBtn button" onClick ={this.onLogin}>Login</button>
                                    {this.state.redirect ? 
                                    <Redirect to={"/Pharmacist"}/>: 
                                    <Redirect to = {"/"}/>}
                                </div>
                            )
                        }  
                        else if (this.state.loginType === "3" && this.state.username) {
                            return (
                                <div>
                                <button type = "button" className="btn coloredBtn button" onClick ={this.onLogin}>Login</button>
                                    {this.state.redirect ? 
                                    <Redirect to={"/Doctor"}/>: 
                                    <Redirect to = {"/"}/>}
                                </div>
                            )
                        }
                        })()}
                    </div>
                    <div className = "registerHere">
                        <Link to="/register" ><button type = "button" className="btn btn-secondary button">Register</button></Link>
                    </div>
                </div>

            </div>
        );
        
        
    }
}
