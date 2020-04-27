import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { PharmManagerRepository } from "../../API";

export class ViewOrders extends React.Component {

    username;
    pharmManagerRepository = new PharmManagerRepository();
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            orders: [
                {
                    name: "drug",
                    quantity: 10,
                    date_requested: "10/20/2020"         
                }
                
            ],
        }
        this.onFulfill = this.onFulfill.bind(this);
    }

    componentDidMount(){
        this.pharmManagerRepository.getPharmRequest().then(order => this.setState({orders : order.data}))
    }

    onFulfill(index) {
        alert("Order fulfilled")
        var newOrders = this.state.orders
        newOrders.splice(index, 1)
        this.setState({orders: newOrders} )
    }

    render() {
        return (
           <div className = "body">
                <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo"/>
                </div>
                <h1 className = "yourCart">
                        Pending Orders
                </h1>
                </nav>
                 <div className = "itemsTable tableSort">
                    <table>
                        <tr>
                        <th><button type = "button" id = "expDate">Item Name</button></th>
                            <th><button type = "button" id = "expDate">Amount Requested</button></th>
                            <th><button type = "button" id = "expDate">Date of Request</button></th>
                        </tr>
                            {this.state.orders.map((order, index) => (
                                <tr>
                                  <td id = "item">{order.name}
                                  </td>
                                  <td id = "item">
                                      {order.quantity}
                                    </td>
                                    <td id = "item">{order.date_requested}<button type = "button" id = "swap" onClick = {e => this.onFulfill(index)}>Fulfill Order</button></td>
                                </tr>
                            ))}
                    </table>
                 </div>
                <Link to="/pharmManager">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}
