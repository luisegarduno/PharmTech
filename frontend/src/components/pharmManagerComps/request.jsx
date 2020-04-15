import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";

export class Request extends React.Component {

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    render() {
        return (
           <div className = "body">
                <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo"/>
                </div>
                <h1 className = "yourCart">
                        Request Form
                </h1>
                </nav>
                <Link to="/pharmManager">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}
