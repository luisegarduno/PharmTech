import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";

export class Manorders extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            orders:[],
        }
        this.formatDate = this.formatDate.bind(this);
        this.formatQuantity = this.numberWithCommas.bind(this);
        this.formatPrice = this.formatPrice.bind(this);
        this.getTotal = this.getTotal.bind(this);
    }

    componentDidMount(){
        this.manufacturerRepository.getOrders().then(Order => this.setState({orders : Order.data}))
    }

    sortMe(event, sortKey){
        const orders = this.state.orders;
        orders.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({orders})
    }

    formatDate(myDate){
        var d = myDate.substring(5,7) + "-" + myDate.substring(8,10) + "-" + myDate.substring(0,4);
        return d;
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
        return total;
    }

    render() {
        return (
           <div className = "body">
            <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo" />
                </div>
                <h1 className = "yourCart">
                        Orders
                </h1>
            </nav>
                <h1>Sort By</h1>
                <form>
                    <input type="radio" id="sortNum" name="sort" value="num" onClick={e => this.sortMe(e, "num")}></input>
                    <label for="sortNum">Order #</label>
                    <input type="radio" id="sortDate" name="sort" value="date" onClick={e => this.sortMe(e, "date")}></input>
                    <label for="sortDate">Date</label>
                    <input type="radio" id="sortStatus" name="sort" value="status" onClick={e => this.sortMe(e, "status")}></input>
                    <label for="sortStatus">Status</label>
                </form>
            {/* <h1 className = "tableHeader">Recent Outgoing Orders</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Item</th>
                            <th>Units Sold</th>
                            <th>Price Per Unit</th>
                            <th>Total Price</th>
                        </tr>
                        {this.state.orders.slice(0, 1).map(item => (
                            <tr>
                                <td id="item">{item.num}</td>
                                <td id="item">{item.date}</td>
                                <td id="item">{item.status}</td>
                                <td id="item">{item.item}</td>
                                <td id="item">{item.units}</td>
                                <td id="item">${item.priceUnit}</td>
                                <td id="item">${item.price}</td>
                            </tr>
                        ))}
                    </table>
                </div> */}
                <h1 className = "tableHeader">All Outgoing Orders</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Item</th>
                            <th>Units Sold</th>
                            <th>Price Per Unit</th>
                            <th>Total Price</th>
                        </tr>
                        {this.state.orders.map(item => (
                            <tr>
                                <td id="item">{item.id}</td>
                                <td id="item">{this.formatDate(item.date)}</td>
                                <td id="item">{item.status}</td>
                                <td id="item">{item.name}</td>
                                <td id="item">{this.formatQuantity(item.quantity)}</td>
                                <td id="item">${this.formatPrice(item.purchase_price)}</td>
                                <td id="item">${this.getTotal(item.quantity, item.purchase_price)}</td>
                            </tr>
                        ))}
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