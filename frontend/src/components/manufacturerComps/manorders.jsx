import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";

export class Manorders extends React.Component {

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
                        <img src={Logo} alt="Logo" />
                </div>
                <h1 className = "yourCart">
                        Orders
                </h1>
            </nav>
                <select id = "range">
                                    <option disabled selected value = "default">Sort By</option>
                                    <option value = "time">Order #</option>
                                    <option value = "date">Date</option>
                                    <option value = "status">Status</option>
                    </select>
            <h1 className = "tableHeader">Recent Outgoing Orders</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Item</th>
                            <th>Units Sold</th>
                            <th>Price Per Unit</th>
                            <th>Total Price</th>
                        </tr>
                    </table>
                </div>
                <h1 className = "tableHeader">All Outgoing Orders</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Item</th>
                            <th>Units Sold</th>
                            <th>Price Per Unit</th>
                            <th>Total Price</th>
                        </tr>
                    </table>
                </div>
                <Link to="maninventory">
                    <button className = "return" id = "viewInventory">View All Inventory</button>
                    </Link> 
                <Link to="/manufacturer">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}