import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";

export class YourPharmacy extends React.Component {

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
                        Your Pharmacy
                </h1>
                </nav>
                <div className = "financeInfo">
                    <h1 className = "tableHeader">Revenues
                    <select id = "range">
                                    <option value = "0">Specify date range...</option>
                    </select>
                    </h1>
                    <h1 className = "tableHeader">Expenses
                    <select id = "range">
                                    <option value = "0">Specify date range...</option>
                    </select>
                    </h1>
                </div>
                <Link to="/pharmManager">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}
