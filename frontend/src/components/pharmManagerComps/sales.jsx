import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";

export class Sales extends React.Component {

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
                    </table>
                </div>
                <h1 className = "tableHeader">Search
                <select id = "range">
                                    <option value = "0">Specify drug...</option>
                                    //once we have data we need to make a table here 
                                    //this table will show specific information about each drug
                    </select></h1>
                <Link to="inventory">
                    <button className = "return" id = "viewInventory">View All Inventory</button>
                    </Link> 
                <Link to="/pharmManager">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}
