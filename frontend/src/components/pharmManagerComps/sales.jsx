import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import { Link } from "react-router-dom";
import _ from 'lodash';
import { PharmManagerRepository } from "../../API";

export class Sales extends React.Component {

    pharmManagerRepository = new PharmManagerRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.findDrug = this.findDrug.bind(this);
    }

    findDrug(e) {
        this.setState({ selectedDrug: e.target.value });
    }

    state = {
        sortDirection : 'desc',
        selectedDrug: 'none',
        recentSales: [],
        sales: []
    }

    componentDidMount(){
        this.pharmManagerRepository.getPharmManagerSales().then(Sale => this.setState({sales : Sale.data}))
        this.pharmManagerRepository.getRecentPharmManagerSales().then(Sale => this.setState({recentSales : Sale.data}))
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

    recentsortBy(field) {        
        if (this.state.sortDirection === 'asc') {
            this.setState({sortDirection: 'desc'})
            this.setState({ 
                recentSales: _.orderBy(this.state.recentSales, field, this.state.sortDirection) 
            });
        }
        if (this.state.sortDirection === 'desc') {
            this.setState({sortDirection: 'asc'})
            this.setState({ 
                recentSales: _.orderBy(this.state.recentSales, field, this.state.sortDirection) 
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
                    <h1 className = "yourCart">
                        Sales
                    </h1>
                </nav>

                <h1 className = "tableHeader">Recent Sales</h1>
                <div className = "itemsTable">
                    <table className = "table table-hover">
                        <thead>
                            <tr className>
                                <th><button type = "button" id = "expDate" onClick={this.recentsortBy.bind(this, 'name')}>Item</button></th>
                                <th><button type = "button" id = "expDate" onClick={this.recentsortBy.bind(this, 'quantity')}>Units Sold</button></th>
                                <th><button type = "button" id = "expDate" onClick={this.recentsortBy.bind(this, 'sell_price')}>Cost Per Unit</button></th>
                                <th>Total Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.recentSales.map(item => (
                                <tr>
                                    <td id = "item">{item.name}</td>
                                    <td id = "item">{item.quantity}</td>
                                    <td id = "item">${item.sell_price.toFixed(2)}</td>
                                    <td id = "item">${(item.quantity * item.sell_price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h1 className = "tableHeader">All Sales</h1>
                <div className = "itemsTable">
                    <table className = "table table-hover">
                        <thead>
                            <tr>
                                <th><button type = "button" id = "expDate" onClick={this.sortBy.bind(this, 'name')}>Item</button></th>
                                <th><button type = "button" id = "expDate" onClick={this.sortBy.bind(this, 'quantity')}>Units Sold</button></th>
                                <th><button type = "button" id = "expDate" onClick={this.sortBy.bind(this, 'sell_price')}>Cost Per Unit</button></th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sales.map(item => (
                                <tr>
                                    <td id = "item">{item.name}</td>
                                    <td id = "item">{item.quantity}</td>
                                    <td id = "item">${item.sell_price.toFixed(2)}</td>
                                    <td id = "item">${(item.quantity * item.sell_price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <input type = "text" placeholder="Search for a drug..." id ="range" className = "searchBar" autoCorrect={true} onChange={this.findDrug}></input>
                <div className = "itemsTable" id = "searchTable">
                    <table>
                        <thead>
                            {(() => {
                                if (this.state.selectedDrug !== "none" && this.state.selectedDrug !== "Specify drug..." && this.state.selectedDrug !== 0) {
                                    return (
                                        <tr>
                                            <th>Item</th>
                                            <th>Units Sold</th>
                                            <th>Cost Per Unit</th>
                                            <th>Total Price</th>
                                        </tr>
                                    )
                                }
                            })()}
                        </thead>
                        <tbody>
                            {this.state.sales.map(item => (
                                <tr>
                                    {(() => {
                                        if (this.state.selectedDrug.length > 0 && item.name.toLowerCase().includes(this.state.selectedDrug.toLowerCase())) {
                                            return (
                                                <>
                                                    <td id = "item">{item.name}</td>
                                                    <td id = "item">{item.quantity}</td>
                                                    <td id = "item">${item.sell_price.toFixed(2)}</td>
                                                    <td id = "item">${(item.quantity * item.sell_price).toFixed(2)}</td>
                                                </>
                                            )
                                        }
                                    })()}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div id = "salesButtons">
                        <Link to="inventory">
                            <button className = "return" id = "viewInventory">View All Inventory</button>
                        </Link> 
                        <Link to="/pharmManager">
                            <button className = "return" id>Return to Homepage</button>
                        </Link> 
                    </div>
                </div>
            </div>
        );
    }
}