import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";

export class Docinventory extends React.Component {

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
                        <img alt="Logo" src={Logo} />
                </div>
                <h1 className = "yourCart">
                        Inventory
                </h1>
            </nav>
            <select id = "range">
                                    <option disabled selected value = "default">Filter For</option>
                                    <option value = "time">In-Stock</option>
                                    <option value = "date">Other Options</option>
                    </select>
            <h1 className = "tableHeader">All Inventory</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>In-Stock?</th>
                            <th>Tags</th>
                            <th>Related Drugs</th>
                        </tr>
                    </table>
                </div>
                <Link to="/doctor">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}