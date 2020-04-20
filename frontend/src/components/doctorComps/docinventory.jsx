import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { DoctorRepository } from "../../API";

export class Docinventory extends React.Component {

    doctorRepository = new DoctorRepository();

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            drugs:[],
        }
        this.formatQuantity = this.numberWithCommas.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount(){
        this.doctorRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}))
    }

    pickFilter(filterBy) {
        this.currInventory.filter((filterBy,exp_date) => exp_date > "2020-04-19T00:00:00.000Z")
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
            <select id = "range">
                                    <option disabled selected value = "default">Filter For</option>
                                    <option value = "time" onChange={e => this.pickFilter(e, "instock")}>In-Stock</option>
                                    <option value = "date">Other Options</option>
                    </select>
            <h1 className = "tableHeader">All Inventory</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Batch</th>
                            <th>Name (Drug ID)</th>
                            <th>Quantity</th>
                            <th>Expiration Date</th>
                            <th>Related Drugs</th>
                        </tr>
                        {this.state.drugs.map(item => (
                            <tr>
                                <td id="item">{item.batch_id}</td>
                                <td id="item">{item.name} ({item.drug_id})</td>
                                <td id="item">{this.formatQuantity(item.quantity)}</td>
                                <td id="item">{this.formatDate(item.exp_date)}</td>
                                <td id="item">{item.related}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <Link to="/doctor">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}