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
        selectedOption: 'all',
    }

    componentDidMount(){
        this.doctorRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}));
        this.doctorRepository.getInventory().then(Drug => this.setState({backup : Drug.data}));
        this.doctorRepository.getDrugTypes().then(Type => this.setState({drugtypes : Type.data}));
    }

    sortBy(field) {
        if (field == "all") {
            this.doctorRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}));
        } else {
            this.setState({drugs: this.state.backup})
            this.setState({ 
                drugs: _.filter(this.state.backup, ['drug_type', field])
            });
            this.setState({selectedOption: field})
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
                    <input type="radio" id="filterAll" name="filter" value="all" onClick={this.sortBy.bind(this, 'all')} checked={this.state.selectedOption === 'all'}></input>
                    <label htmlFor="filterAll">All</label>
                    {this.state.drugtypes.map(item => (
                        <><input type="radio" id={item.drug_type} name="filter" value="1" onClick={this.sortBy.bind(this, item.drug_type)} checked={this.state.selectedOption === item.drug_type}></input>
                        <label htmlFor={item.drug_type} className="capWord">{item.drug_type}</label></>
                    ))}
                </form>
            <h1 className = "tableHeader">All Inventory</h1>
                <div className = "itemsTable scrollTableSort">
                    <table>
                        <thead><tr className="headerFixed">
                            <th>Drug Type</th>
                            <th>Name (Batch ID)</th>
                            <th>Quantity</th>
                            <th>Expiration Date</th>
                            <th>Related Drugs</th>
                        </tr></thead>
                        <tbody>
                            {this.state.drugs.map(item => (
                                <tr key={ item.batch_id }>
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
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}