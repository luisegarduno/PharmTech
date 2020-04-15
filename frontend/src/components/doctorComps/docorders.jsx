import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";

export class Docorders extends React.Component {

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
                        Orders
                </h1>
            </nav>
            <h1 className = "tableHeader">All Incoming Orders</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Units</th>
                        </tr>
                    </table>
                </div>
                <Link to="docinventory">
                    <button className = "return" id = "viewInventory">View All Inventory</button>
                    </Link> 
                <Link to="/doctor">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}