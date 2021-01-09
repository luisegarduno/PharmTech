import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { DoctorRepository } from "../../API";
import _ from 'lodash';

export class Docinventory extends React.Component {

    doctorRepository = new DoctorRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.formatQuantity = this.numberWithCommas.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    state = {
        drugs: [],
        drugtypes: [],
        backup: [],
        sortDirection: 'asc'
    }

    componentDidMount(){
        this.doctorRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}));
        this.doctorRepository.getInventory().then(Drug => this.setState({backup : Drug.data}));
        this.doctorRepository.getDrugTypes().then(Type => this.setState({drugtypes : Type.data}));
    }

    filterFor(field) {
        if (field == "all") {
            this.doctorRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}));
        } else {
            this.setState({drugs: this.state.backup})
            this.setState({ 
                drugs: _.filter(this.state.backup, ['drug_type', field])
            });
        }
    }

    sortBy(field) {
        this.setState({revenue: 0})      
        if (this.state.sortDirection == 'asc') {
            this.setState({sortDirection: 'desc'})
            this.setState({ 
                drugs: _.orderBy(this.state.drugs, field, this.state.sortDirection)
            });
        }
        if (this.state.sortDirection == 'desc') {
            this.setState({sortDirection: 'asc'})
            this.setState({ 
                drugs: _.orderBy(this.state.drugs, field, this.state.sortDirection)
            });
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    formatDate(myDate){
        var d = myDate.substring(5,7) + "-" + myDate.substring(8,10) + "-" + myDate.substring(0,4);
        return d;
    }

    render() {
        return (
           <div className = "body">
                <nav>
                    <div className = "img" id = "logo">
                        <img alt="Logo" src={Logo} />
                    </div>
                    <h1 className = "yourCart">
                        Inventory
                    </h1>
                </nav>

                <h1 className="tableHeader">Filter for Drug Type</h1>

                <form className="sortBy">
                    <input type="radio" id="filterAll" name="filter" value="all" onClick={this.filterFor.bind(this, 'all')} defaultChecked></input>
                    <label htmlFor="filterAll">All</label>
                    {this.state.drugtypes.map(item => (
                        <><input type="radio" id={item.drug_type} name="filter" value="1" onClick={this.filterFor.bind(this, item.drug_type)} ></input>
                        <label htmlFor={item.drug_type} className="capWord">{item.drug_type}</label></>
                    ))}
                </form>

                <h1 className = "tableHeader">All Inventory</h1>
                <div className = "itemsTable scrollTableSort">
                    <table>
                        <thead><tr className="headerFixed">
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'drug_type')}>Drug Type</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'name')}>Name (Batch ID)</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'quantity')}>Quantity</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'exp_date')}>Expiration Date</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'related')}>Related Drugs</button></th>
                        </tr></thead>
                        <tbody>
                            {this.state.drugs.map(item => (
                                <tr key={item.batch_id}>
                                    <td id="item">{item.drug_type}</td>
                                    <td id="item">{item.name} ({item.batch_id})</td>
                                    <td id="item">{this.formatQuantity(item.quantity)}</td>
                                    <td id="item">{this.formatDate(item.exp_date)}</td>
                                    <td id="item">{item.related}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Link to="/doctor">
                    <button className = "btn coloredBtn ml-3">Return to Homepage</button>
                </Link> 
           </div>
        );
    }
}