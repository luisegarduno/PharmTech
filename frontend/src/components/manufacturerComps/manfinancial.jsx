import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";
import _ from 'lodash';

export class Manfinancial extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username'];
        this.state = {
            drugs:[],
            revenue: 0,
            sortDirection: 'asc'
        }
        this.formatQuantity = this.numberWithCommas.bind(this);
        this.formatPrice = this.formatPrice.bind(this);
        this.gainLoss = this.gainLoss.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.formatRevenue = this.formatRevenue.bind(this);
    }

    componentDidMount(){
        this.manufacturerRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}))
    }

    sortBy(field) {
        this.setState({revenue: 0})      
        if (this.state.sortDirection === 'asc') {
            this.setState({sortDirection: 'desc'})
            this.setState({ 
                drugs: _.orderBy(this.state.drugs, field, this.state.sortDirection)
            });
        }
        if (this.state.sortDirection === 'desc') {
            this.setState({sortDirection: 'asc'})
            this.setState({ 
                drugs: _.orderBy(this.state.drugs, field, this.state.sortDirection)
            });
        }
    }
    
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    formatPrice(price){
        return price.toFixed(2);
    }

    gainLoss(purchase, manu){
        var val = purchase - manu;
        val = val.toFixed(2);
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return val;
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
                        <thead><tr className="headerFixed">
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'name')}>Item</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'manu_price')}>Production Cost per Unit</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'purchase_price')}>Sell Price Per Unit</button></th>
                            <th>Gain/Loss Per Unit</th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'quantity')}>Quantity</button></th>
                            <th>Total Gain/Loss</th>
                        </tr></thead>
                        <tbody>
                        {this.state.drugs.map(item => (
                            <tr key={item.name}>
                                <td id="item">{item.name}</td>
                                <td id="item">${this.formatPrice(item.manu_price)}/{item.unit_measure}</td>
                                <td id="item">${this.formatPrice(item.purchase_price)}/{item.unit_measure}</td>
                                <td id="item">${this.gainLoss(item.purchase_price, item.manu_price)}/{item.unit_measure}</td>
                                <td id="item">{this.formatQuantity(item.quantity)} {item.unit_measure}</td>
                                <td id="item">${this.getTotal(item.quantity, item.purchase_price, item.manu_price)}</td>
                            </tr>
                        ))}
                        </tbody>
                        </table>
                        <h1>Total Revenue: ${this.formatRevenue(this.state.revenue)}</h1>
                        </div>
                </div>
                <Link to="/manufacturer">
                    <button className = "btn coloredBtn ml-3">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}
