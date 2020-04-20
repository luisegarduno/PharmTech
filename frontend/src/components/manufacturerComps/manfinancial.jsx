import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
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
                    <h1>Revenues</h1>
                    <table>
                        <tr>
                            <th>Order #</th>
                            <th>Item</th>
                            <th>Units Sold</th>
                            <th>Production Cost per Unit</th>
                            <th>Sell Price Per Unit</th>
                            <th>Total Gain/Loss</th>
                        </tr>
                        </table>
                    <h1>Expenses</h1>
                </div>
                <Link to="/manufacturer">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}
