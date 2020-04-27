import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { DoctorRepository } from "../../API";
import _ from 'lodash';

export class Docorders extends React.Component {

    doctorRepository = new DoctorRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            orders:[],
            sortDirection: 'asc'
        }
        this.orderDate = this.orderDate.bind(this);
        this.getStatus = this.getStatus.bind(this);
        this.formatQuantity = this.numberWithCommas.bind(this);
    }

    componentDidMount(){
        this.doctorRepository.getOrders().then(Order => this.setState({orders : Order.data})).then(Order => this.setState({ orders: _.orderBy(this.state.orders, 'order_date', 'asc')})).then(Order => this.setState({ orders: _.orderBy(this.state.orders, 'name', 'asc')}));
    }

    sortBy(field) {
        this.setState({revenue: 0})      
        if (this.state.sortDirection == 'asc') {
            this.setState({sortDirection: 'desc'})
            this.setState({ 
                orders: _.orderBy(this.state.orders, field, this.state.sortDirection)
            });
        }
        if (this.state.sortDirection == 'desc') {
            this.setState({sortDirection: 'asc'})
            this.setState({ 
                orders: _.orderBy(this.state.orders, field, this.state.sortDirection)
            });
        }
    }

    orderDate(order_date){
        var orderdate = order_date.substring(5,7) + "-" + order_date.substring(8,10) + "-" + order_date.substring(0,4);
        return orderdate;
    }

    getStatus(fulfillDate){
        if (fulfillDate == null){
            return "Preparing to Ship";
        } else {
            var shipDate = fulfillDate.substring(5,7) + "-" + fulfillDate.substring(8,10) + "-" + fulfillDate.substring(0,4);
            return "Arrived on " + shipDate;
        }
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
                <div className = "itemsTable tableSort">
                    <table><thead>
                        <tr class="headerFixed">
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'name')}>Name</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'order_date')}>Ordered On</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'fulfill_date')}>Status</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'quantity')}>Units</button></th>
                        </tr></thead>
                        <tbody>
                        {this.state.orders.map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{this.orderDate(item.order_date)}</td>
                                <td id="item">{this.getStatus(item.fulfill_date)}</td>
                                <td id="item">{this.formatQuantity(item.quantity)} {item.unit_measure}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Link to="docinventory">
                    <button className = "btn btn-secondary mr-3" id = "viewInventory">View All Inventory</button>
                    </Link> 
                <Link to="/doctor">
                    <button className = "btn coloredBtn ml-3">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}