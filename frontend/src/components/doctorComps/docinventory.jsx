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
        this.currInventory.filter((filterBy,drug_type) => drug_type = filterBy);
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
                    <input type="radio" id="sortNum" name="sort" value="all" onClick={e => this.pickFilter(e, 0)}></input>
                    <label htmlFor="sortNum">All</label>
                    <input type="radio" id="sortNum" name="sort" value="1" onClick={e => this.pickFilter(e, 1)}></input>
                    <label htmlFor="sortNum">1</label>
                    <input type="radio" id="sortDate" name="sort" value="2" onClick={e => this.pickFilter(e, 2)}></input>
                    <label htmlFor="sortDate">2</label>
                    <input type="radio" id="sortStatus" name="sort" value="3" onClick={e => this.pickFilter(e, 3)}></input>
                    <label htmlFor="sortStatus">3</label>
                    <input type="radio" id="sortNum" name="sort" value="4" onClick={e => this.pickFilter(e, 4)}></input>
                    <label htmlFor="sortNum">4</label>
                </form>
            <h1 className = "tableHeader">All Inventory</h1>
                <div className = "itemsTable scrollTableSort">
                    <table>
                        <thead><tr className="headerFixed">
                            <th>Drug Type</th>
                            <th>Name (Drug ID)</th>
                            <th>Quantity</th>
                            <th>Expiration Date</th>
                            <th>Related Drugs</th>
                        </tr></thead>
                        <tbody>
                            {this.state.drugs.map(item => (
                                <tr key={ item.drug_id }>
                                    <td id="item">{item.drug_type}</td>
                                    <td id="item">{item.name} ({item.drug_id})</td>
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