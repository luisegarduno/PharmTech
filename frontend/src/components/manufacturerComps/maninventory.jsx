import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";

export class Maninventory extends React.Component {

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
                    </table>
                </div>
                <Link to="/manufacturer">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}