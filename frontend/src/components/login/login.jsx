import React from "react";
import Logo from "../../images/pharmtechblue.png";
import Logo2 from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { sha256 } from 'js-sha256';
import { LoginRepository } from "../../API";

export class Login extends React.Component {

    loginRepository = new LoginRepository()

    constructor(props) {
        super(props);
        this.state = {
            loginType: "",
            username: "",
            password: "",
        };
        this.findLoginType = this.findLoginType.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.onLogin = this.onLogin.bind(this)
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
        this.loginRepository.verifyUser(this.state.username, password, this.state.loginType)
        localStorage.setItem('username', this.state.username);
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
                        <div className="form">
                            <div className = "username" onChange={this.getUsername}>
                                <input type = "text" name="username" placeholder = "Username" id = "input"></input>
                            </div>
                            <div className = "password" onChange={this.getPassword}>
                                <input type = "password" name="password" placeholder = "Password" id = "input"></input>
                            </div>
                            <div className = "loginType">
                                <select id = "type" onChange={this.findLoginType}>
                                    <option value = "default" selected disabled>Select an account type...</option>
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
                        if (this.state.loginType === "2" && this.state.username) {
                            return (
                                <Link to={"/pharmManager"}><button type = "button" className="button" onClick ={this.onLogin}>Login</button></Link>
                            )
                        }
                        else if (this.state.loginType === "4" && this.state.username) {
                            return (
                                <Link to={"/Manufacturer"}><button type = "button" className="button" onClick ={this.onLogin}>Login</button></Link>
                            )
                        }
                        else if (this.state.loginType === "1" && this.state.username) {
                            return (
                                <Link to={"/Pharmacist"}><button type = "button" className="button" onClick ={this.onLogin}>Login</button></Link>
                            )
                        }  
                        else if (this.state.loginType === "3" && this.state.username) {
                            return (
                                <Link to={"/Doctor"}><button type = "button" className="button" onClick ={this.onLogin}>Login</button></Link>
                            )
                        }
                        })()}
                    </div>
                    <div className = "registerHere">
                        <Link to="/register" ><button type = "button" className="button">Register</button></Link>
                    </div>
                </div>

            </div>
        );
        
        
    }
}
