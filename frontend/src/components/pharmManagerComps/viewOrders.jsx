import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import { Link } from "react-router-dom";
import { PharmManagerRepository } from "../../API";
import _ from 'lodash';

export class ViewOrders extends React.Component {

    username;
    pharmManagerRepository = new PharmManagerRepository();
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            sortDirection : 'desc',
            orders: []
        }
        this.onFulfill = this.onFulfill.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount(){
        this.pharmManagerRepository.getPharmRequest().then(order => this.setState({orders : order.data}))
    }

    formatDate(myDate){
        var d = myDate.substring(5,7) + "-" + myDate.substring(8,10) + "-" + myDate.substring(0,4);
        return d;
    }

    onFulfill(id, i) {
        this.pharmManagerRepository.deleteOrder(id);
        var newOrders = this.state.orders
        newOrders.splice(i, 1)
        this.setState({orders: newOrders})
    }

    sortBy(field) {        
        if (this.state.sortDirection === 'asc') {
            this.setState({sortDirection: 'desc'})
            this.setState({ 
                orders: _.orderBy(this.state.orders, field, this.state.sortDirection) 
            });
        }
        if (this.state.sortDirection === 'desc') {
            this.setState({sortDirection: 'asc'})
            this.setState({ 
                orders: _.orderBy(this.state.orders, field, this.state.sortDirection) 
            });
        }
    }

    render() {
        return (
           <div className = "body">
                <nav>
                    <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo"/>
                    </div>
                    <h1 className = "yourCart">Pending Orders</h1>
                </nav>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th><button type = "button" id = "expDate" onClick={this.sortBy.bind(this, 'name')}>Item Name</button></th>
                            <th><button type = "button" id = "expDate" onClick={this.sortBy.bind(this, 'quantity')}>Amount Requested</button></th>
                            <th><button type = "button" id = "expDate" onClick={this.sortBy.bind(this, 'date_requested')}>Date of Request</button></th>
                        </tr>
                        {this.state.orders.map((order, index) => (
                            <tr>
                                <td id = "item">{order.name}</td>
                                <td id = "item">{order.quantity} {order.unit_measure}</td>
                                <td id = "item">{this.formatDate(order.date_requested)}<button type = "button" id = "swap" onClick = {e => this.onFulfill(order.id, index)}>Fulfill Order</button></td>
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