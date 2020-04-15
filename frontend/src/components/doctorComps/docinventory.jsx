import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { DoctorRepository } from "../../API";

export class Docinventory extends React.Component {

    doctorRepository = new DoctorRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    currInventory = [
        {"name": "drug", "instock": 7, "tags": "medicine", "related": "otherdrug"},
        {"name": "otherdrug", "instock": 0, "tags": "not medicine", "related": "drug"}
    ]

    pickFilter(filterBy) {
        this.currInventory.filter((filterBy,status) => status > 0)
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
                                    <option value = "time" onChange={e => this.pickFilter(e, "instock")}>In-Stock</option>
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
                        {this.currInventory.map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{item.instock}</td>
                                <td id="item">{item.tags}</td>
                                <td id="item">{item.related}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <Link to="/doctor">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}