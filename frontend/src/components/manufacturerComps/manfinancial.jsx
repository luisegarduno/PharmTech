import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";

export class Manfinancial extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

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
                        Financial
                </h1>
                </nav>
                <div className = "financeInfo">
                    <h1>Revenues
                    <select id = "range">
                                    <option value = "0">Specify date range...</option>
                    </select>
                    </h1>
                    <h1>Expenses
                    <select id = "range">
                                    <option value = "0">Specify date range...</option>
                    </select>
                    </h1>
                </div>
                <Link to="/manufacturer">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}
