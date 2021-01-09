import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import { Link } from "react-router-dom";
import { ManufacturerRepository } from "../../API";
import _ from 'lodash';

export class Mansales extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            sales:[],
            sortDirection : 'asc',
        }
        this.getTotal = this.getTotal.bind(this);
        this.formatQuantity = this.numberWithCommas.bind(this);
        this.formatPrice = this.formatPrice.bind(this);
    }

    componentDidMount(){
        this.manufacturerRepository.getSales().then(Sale => this.setState({sales : Sale.data}))
    }

    sortBy(field) {      
        if (this.state.sortDirection === 'asc') {
            this.setState({sortDirection: 'desc'})
            this.setState({ 
                sales: _.orderBy(this.state.sales, field, this.state.sortDirection)
            });
        }
        if (this.state.sortDirection === 'desc') {
            this.setState({sortDirection: 'asc'})
            this.setState({ 
                sales: _.orderBy(this.state.sales, field, this.state.sortDirection)
            });
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
        total = this.formatQuantity(total);
        return total;
    }

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
                <h1 className = "tableHeader">All Sales</h1>
                <div className = "itemsTable">
                    <table>
                        <thead><tr className="headerFixed">
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'name')}>Item</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'quantity')}>Quantity</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'purchase_price')}>Unit Price</button></th>
                            <th>Total</th>
                        </tr></thead>
                        <tbody>
                            {this.state.sales.map(item => (
                                <tr key={item.name}>
                                    <td id="item">{item.name}</td>
                                    <td id="item">{this.formatQuantity(item.quantity)} {item.unit_measure}</td>
                                    <td id="item">${this.formatPrice(item.purchase_price)}/{item.unit_measure}</td>
                                    <td id="item">${this.getTotal(item.quantity, item.purchase_price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Link to="/manufacturer">
                    <button className = "btn coloredBtn ml-3">Return to Homepage</button>
                </Link> 
                <Link to="manfinancial">
                    <button className = "btn btn-secondary mr-3" id = "viewInventory">View Financial Info</button>
                </Link> 
           </div>
        );
    }
}