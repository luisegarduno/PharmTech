import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";

export class IncomingOrder extends React.Component {

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    render() {
        return (
            <div>
            <div className = "body">
            <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} />
                </div>
            </nav>
            <div>
                <h2>Incoming Order List</h2>
            </div>
           </div>
           <div>
                <Link to="/Pharmacist">
                    <button className = "return">Return to Homepage</button>
                </Link> 
            </div> 
           </div>
        );
    }
}