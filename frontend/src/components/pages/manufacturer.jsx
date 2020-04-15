import React from "react";
import Logo from "./erpharmtechgrayer.png";
//import Cart from "./cart.png";
import {Link} from "react-router-dom";

export class Manufacturer extends React.Component {

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
               <div className = "menu" id = "manufacturer">
                    <Link to ="/manufacturer/maninventory"><button type = "button" id = "manMenuButton">View<br />Inventory<br/>Information</button></Link>
                    <Link to ="/manufacturer/manorders"><button type = "button" id = "manMenuButton">View<br/>Outgoing<br/> Orders</button></Link>
                    <Link to ="/manufacturer/mansales"><button type = "button" id = "manMenuButton">View<br/>Your<br/> Sales</button></Link>
                    <Link to ="/manufacturer/manfinancial"><button type = "button" id = "manMenuButton">View<br/>Financial<br/>Information</button></Link>
               </div>
           </div>
        );
    }
}
