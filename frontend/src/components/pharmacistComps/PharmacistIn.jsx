import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";

export class PharmacistIn extends React.Component {

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    drugs = [{
        "name": "Symbyzide Parodafinil",
        "cost": 6,
        "units": 10
    },
    {
        "name": "Ibuprofen",
        "cost": 8,
        "units": 11
    },
    ]


    render(){
        return (
            <div className = "body">
                <div className = "navBar">
                    <nav>
                        <div className = "img">
                            <img src={Logo} />
                        </div>
                    </nav>
                </div>
                <div>
                    <h2>Inventory</h2>
                </div>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Units</th>
                            <th>Cost Per Unit</th>
                        </tr>
                            {this.drugs.map(item => (
                                <tr>
                                  <td id = "item">{item.name}
                                  </td>
                                  <td id = "item">
                                      {item.units}
                                    </td>

                                    <td id = "item">${item.cost}</td>
                                </tr>
                            ))}
                    </table>
                </div>

                <div>
                    <form>
                        <label htmlFor="newdrugname">Drug Name</label>
                        <label htmlFor="newdrugunit">Unit</label>
                        <label htmlFor="newdrugoption">Option</label><br/>
                        <input type="text" id="durgname"/>
                        <input type="number" id="drugamount" min="0"></input>
                        <select>
                            <option defaultValue> </option>
                            <option value = "add">Add Drug</option>
                            <option value = "remove">Remove Drug</option>
                            <option value = "request">request Drug</option>
                        </select>
                        <button >Submit</button>
                    </form>
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
