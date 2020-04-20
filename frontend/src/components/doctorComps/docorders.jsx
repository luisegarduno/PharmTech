import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { DoctorRepository } from "../../API";

export class Docorders extends React.Component {

    doctorRepository = new DoctorRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            orders:[],
        }
        this.formatDate = this.formatDate.bind(this);
        this.formatQuantity = this.numberWithCommas.bind(this);
    }

    componentDidMount(){
        this.doctorRepository.getOrders().then(Order => this.setState({orders : Order.data}))
    }

    formatDate(myDate){
        var d = myDate.substring(5,7) + "-" + myDate.substring(8,10) + "-" + myDate.substring(0,4);
        return d;
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        return (
           <div className = "body">
            <nav>
                <div className = "img" id = "logo">
                        <img alt="Logo" src={Logo} />
                </div>
                <h1 className = "yourCart">
                        Orders
                </h1>
            </nav>
            <h1 className = "tableHeader">All Incoming Orders</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Units</th>
                        </tr>
                        {this.state.orders.map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{this.formatDate(item.date)}</td>
                                <td id="item">{item.status}</td>
                                <td id="item">{this.formatQuantity(item.units)}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <Link to="docinventory">
                    <button className = "return" id = "viewInventory">View All Inventory</button>
                    </Link> 
                <Link to="/doctor">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}