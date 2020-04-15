import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";

export class Mansales extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    sales = [
        {"name": "drug", "units": 7, "cost": 2, "price": 14},
        {"name": "other drug", "units": 1, "cost": 2, "price": 2}
    ]

    // searchFor(item) {
    //     this.manufacturerRepository.getSales(item)
    // }

    render() {
        return (
           <div className = "body">
                <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo"/>
                </div>
                <h1 className = "yourCart">
                        Sales
                </h1>
                </nav>
                <h1 className = "tableHeader">Recent Sales</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Units Sold</th>
                            <th>Cost Per Unit</th>
                            <th>Total Price</th>
                        </tr>
                        {this.sales.slice(0, 1).map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{item.units}</td>
                                <td id="item">${item.cost}</td>
                                <td id="item">${item.price}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <h1 className = "tableHeader">All Sales</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Units Sold</th>
                            <th>Cost Per Unit</th>
                            <th>Total Price</th>
                        </tr>
                        {this.sales.map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{item.units}</td>
                                <td id="item">${item.cost}</td>
                                <td id="item">${item.price}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <h1 className = "tableHeader">Search
                <select id = "range">
                                    <option value = "0" selected>Specify drug...</option>
                    </select></h1>
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
