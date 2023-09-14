import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import { Link } from "react-router-dom";

export class Pharmacist extends React.Component {
    
    username;
    
    constructor(props){
        super(props);
        this.username = localStorage['username']
        this.state = {
            username: "test",
            notificationlist: ["firstly created 3/27", "double checked 3/28","test notification 3/29", "new notification 3/30"]
        };
    }

    render(){
        return(
            <div className = "body">
                <div className = "navBar">
                    <nav>
                        <div className = "img">
                            <img src={Logo} alt="Logo" />
                        </div>
                        <h1 className = "welcome">
                            Welcome back {this.username}!
                        </h1>
                    </nav>
                </div>

                <div className = "menu">
                    <Link to ="/pharmacist/PharmacistIn"><button type = "button" id = "menuButton"><br />Inventory</button></Link>
                    <Link to ="/pharmacist/IncomingOrder"><button type = "button" id = "menuButton">Incoming<br />Order</button></Link>
                    <Link to ="/pharmacist/OutgoingOrder"><button type = "button" id = "menuButton">Outgoing<br />Order</button></Link>
                    <Link to ="/pharmacist/ReceivedOrder"><button type = "button" id = "menuButton">Received<br />Order</button></Link>
                    <Link to ="/pharmacist/Prescription"><button type = "button" id = "menuButton"><br />Prescription</button></Link>
                </div>
            </div>
        );
    }
}