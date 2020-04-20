import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";

export class Mansales extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            sales:[],
        }
        this.getTotal = this.getTotal.bind(this);
        this.formatQuantity = this.numberWithCommas.bind(this);
        this.formatPrice = this.formatPrice.bind(this);
    }

    componentDidMount(){
        this.manufacturerRepository.getSales().then(Sale => this.setState({sales : Sale.data}));
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
        total = this.formatQuantity(total);
        return total;
    }

    // searchFor(item) {
    //     this.manufacturerRepository.getSales(item)
    // }

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
                {/* <h1 className = "tableHeader">Recent Sales</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Units Sold</th>
                            <th>Cost Per Unit</th>
                            <th>Total Price</th>
                        </tr>
                        {this.state.sales.slice(0, 5).map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{item.quantity}</td>
                                <td id="item">${item.purchase_price}</td>
                                <td id="item">${this.getTotal(item.quantity, item.purchase_price)}</td>
                            </tr>
                        ))}
                    </table>
                </div> */}
                <h1 className = "tableHeader">All Sales</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Units Sold</th>
                            <th>Cost Per Unit</th>
                            <th>Total Price</th>
                        </tr>
                        {this.state.sales.map(item => (
                            <tr>
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
