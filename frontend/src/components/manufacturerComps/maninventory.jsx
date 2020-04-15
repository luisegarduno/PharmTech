import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";

export class Maninventory extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    currInventory = [
        {"name": "first", "madeOn": "date", "expires": "never", "acqFrom": "SMU", "expired": true, "okToBuy": true}
    ]

    toggleExpired(item) {
        this.manufacturerRepository.markExpired(item)
    }

    toggleBuy(item) {
        this.manufacturerRepository.markBuy(item)
    }

    render() {
        return (
           <div className = "body">
            <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo" />
                </div>
                <h1 className = "yourCart">
                        Inventory
                </h1>
            </nav>
            <h1 className = "tableHeader">All Inventory</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Made On</th>
                            <th>Expires</th>
                            <th>Acq From</th>
                            <th>Expired?</th>
                            <th>OK to Buy?</th>
                        </tr>
                        {this.currInventory.map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{item.madeOn}</td>
                                <td id="item">{item.expires}</td>
                                <td id="item">{item.acqFrom}</td>
                                <td id="item"><input type="checkbox" id="item" value={item.expired}></input></td>
                                <td id="item"><input type="checkbox" id="item" value={item.okToBuy}></input></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <Link to="/manufacturer">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}