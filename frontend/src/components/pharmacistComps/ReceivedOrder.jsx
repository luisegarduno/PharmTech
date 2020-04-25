import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { PharmacistRepository } from '../../API/pharmacistRepository'


export class ReceivedOrder extends React.Component {

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }
    render() {
        return (
            <div>
           <div className = "body">
            <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} />
                </div>
            </nav>
           </div>
            <div>
                <h2  className = "ml-3 mt-1" >Received Order List</h2>
            </div>
           <div>
                <Link to="/Pharmacist">
                    <button className = "btn btn-info mb-5 ml-5">Return to Homepage</button>
                </Link> 
            </div> 
           </div>
        );
    }
}