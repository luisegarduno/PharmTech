import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";

export class Manorders extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    orders = [
        {"num": 2, "date": "today", "status": "shipped", "item": "drugs", "units": 7, "priceUnit": 5, "price": 35},
        {"num": 1, "date": "yesterday", "status": "packing", "item": "other drugs", "units": 3, "priceUnit": 2, "price": 6}
    ]

    sortMe(event, sortKey){
        const orders = this.orders;
        orders.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({orders})
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
                                    <option value = "time" onChange={e => this.sortMe(e, "num")}>Order #</option>
                                    <option value = "date" onChange={e => this.sortMe(e, "date")}>Date</option>
                                    <option value = "status" onChange={e => this.sortMe(e, "status")}>Status</option>
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
                        {this.orders.slice(0, 1).map(item => (
                            <tr>
                                <td id="item">{item.num}</td>
                                <td id="item">{item.date}</td>
                                <td id="item">{item.status}</td>
                                <td id="item">{item.item}</td>
                                <td id="item">{item.units}</td>
                                <td id="item">${item.priceUnit}</td>
                                <td id="item">${item.price}</td>
                            </tr>
                        ))}
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
                        {this.orders.map(item => (
                            <tr>
                                <td id="item">{item.num}</td>
                                <td id="item">{item.date}</td>
                                <td id="item">{item.status}</td>
                                <td id="item">{item.item}</td>
                                <td id="item">{item.units}</td>
                                <td id="item">${item.priceUnit}</td>
                                <td id="item">${item.price}</td>
                            </tr>
                        ))}
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