import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";
import _ from 'lodash';

export class Manorders extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            orders:[],
            sortDirection : 'asc',
        }
        this.formatDate = this.formatDate.bind(this);
        this.formatQuantity = this.numberWithCommas.bind(this);
        this.formatPrice = this.formatPrice.bind(this);
        this.getTotal = this.getTotal.bind(this);
    }

    componentDidMount(){
        this.manufacturerRepository.getOrders().then(Order => this.setState({orders : Order.data}))
    }

    sortBy(field) {      
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

    formatDate(myDate){
        var d = myDate.substring(5,7) + "-" + myDate.substring(8,10) + "-" + myDate.substring(0,4);
        return d;
    }

    getStatus(fulfillDate){
        if (fulfillDate == null){
            return "Packing";
        } else {
            var shipDate = fulfillDate.substring(5,7) + "-" + fulfillDate.substring(8,10) + "-" + fulfillDate.substring(0,4);
            return "Shipped on " + shipDate;
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    formatPrice(price){
        return price.toFixed(2);
    }

    getTotal(price, purchase_price){
        var total = price * purchase_price;
        total = total.toFixed(2);
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        return (
           <div className = "body backgroundextend">
            <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo" />
                </div>
                <h1 className = "yourCart">
                        Orders
                </h1>
            </nav>
                <h1 className = "tableHeader">All Outgoing Orders</h1>
                <div className = "itemsTable tableSort">
                    <table>
                        <thead><tr>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'id')}>Order #</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'order_date')}>Date</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'fulfill_date')}>Status</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'name')}>Item</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'quantity')}>Quantity</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'sell_price')}>Unit Price</button></th>
                            <th>Total</th>
                        </tr></thead>
                        <tbody>
                        {this.state.orders.map(item => (
                            <tr>
                                <td id="item">{item.id}</td>
                                <td id="item">{this.formatDate(item.order_date)}</td>
                                <td id="item">{this.getStatus(item.fulfill_date)}</td>
                                <td id="item">{item.name}</td>
                                <td id="item">{this.formatQuantity(item.quantity)} {item.unit_measure}</td>
                                <td id="item">${this.formatPrice(item.sell_price)}/{item.unit_measure}</td>
                                <td id="item">${this.getTotal(item.quantity, item.sell_price)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Link to="maninventory">
                    <button className = "return" id = "viewInventory">View All Inventory</button>
                    </Link> 
                <Link to="/manufacturer">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}