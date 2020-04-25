import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";

export class Manfinancial extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username'];
        this.state = {
            drugs:[],
            revenue: 0
        }
        this.formatQuantity = this.numberWithCommas.bind(this);
        this.formatPrice = this.formatPrice.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.formatRevenue = this.formatRevenue.bind(this);
    }

    componentDidMount(){
        this.manufacturerRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}))
    }
    
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    formatPrice(price){
        return price.toFixed(2);
    }

    getTotal(amount, sellPrice, purchasePrice){
        var difference = sellPrice - purchasePrice;
        var rev = amount * difference;
        this.state.revenue = this.state.revenue + rev;
        rev = rev.toFixed(2);
        rev = rev.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return rev;
    }

    formatRevenue(rev){
        var revenue = rev.toFixed(2);
        revenue = revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return revenue;
    }

    render() {
        return (
           <div className = "body">
                <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo"/>
                </div>
                <h1 className = "yourCart">
                        Financial
                </h1>
                </nav>
                <div className = "financeInfo">
                    <h1 className="tableHeader">Revenues and Expenses</h1>
                    <div className = "itemsTable">
                    <table>
                        <tr class="headerFixed">
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Production Cost per Unit</th>
                            <th>Sell Price Per Unit</th>
                            <th>Total Gain/Loss</th>
                        </tr>
                        {this.state.drugs.map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{this.formatQuantity(item.quantity)} {item.unit_measure}</td>
                                <td id="item">${this.formatPrice(item.manu_price)}/{item.unit_measure}</td>
                                <td id="item">${this.formatPrice(item.purchase_price)}/{item.unit_measure}</td>
                                <td id="item">${this.getTotal(item.quantity, item.purchase_price, item.manu_price)}</td>
                            </tr>
                        ))}
                        </table>
                        <h1>Total Revenue: ${this.formatRevenue(this.state.revenue)}</h1>
                        </div>
                </div>
                <Link to="/manufacturer">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}
