import React from "react";
import Logo from "./erpharmtechgrayer.png";
//import Cart from "./cart.png";
import {Link} from "react-router-dom";

export class Doctor extends React.Component {

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    render() {
        return (
           <div className = "body">
               <div className = "navBar">
                <nav>
                    <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo"/>
                    </div>
                    <h1 className = "welcomeMan">
                        Welcome back {this.username}!
                    </h1>
                </nav>
               </div>
               <div className = "menu" id = "doctor">
                    <Link to ="/doctor/docinventory"><button type = "button" id = "manMenuButton">View<br />Inventory<br/>Information</button></Link>
                    <Link to ="/doctor/docorders"><button type = "button" id = "manMenuButton">View<br/>Incoming<br/>Orders</button></Link>
               </div>
           </div>
        );
    }
}











