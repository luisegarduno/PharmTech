import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";

export class Maninventory extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;

    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            drugs:[],
        }
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount(){
        this.manufacturerRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}))
    }

    toggleExpired(item) {
        var tf = false; //0 = true
        if (item.expired == false) {
            tf = true;
        }
        var batchid = item.id;
        this.manufacturerRepository.markExpired(tf, batchid);
        this.manufacturerRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}));
    }

    toggleSell(item) {
        var tf = false; //0 = true
        if (item.ok_to_sell == false) {
            tf = true;
        }
        var batchid = item.id;
        this.manufacturerRepository.markBuy(tf, batchid);
        this.manufacturerRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}));
    }

    formatDate(myDate){
        var d = myDate.getMonth() + "-" + myDate.getDate() + "-" + myDate.getFullYear();
        return d;
    }

    render() {
        return (
           <div className = "body">
            <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo" />
                </div>
                <h1 className = "yourCart">
                        Inventory
                </h1>
            </nav>
            <h1 className = "tableHeader">All Inventory</h1>
                <div className = "itemsTable">
                    <table>
                        <tr class="headerFixed">
                            <th>Name</th>
                            <th>Made On</th>
                            <th>Acq From</th>
                            <th>Expired?</th>
                            <th>OK to Sell?</th>
                        </tr>
                        {this.state.drugs.map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{this.formatDate(item.fulfill_date)}</td>
                                <td id="item">{item.acquired_from}</td>
                                <td id="item">{item.expired}<form><button onClick = {this.toggleExpired(item)}>Flip Expired</button></form></td>
                                <td id="item">{item.ok_to_sell}<form><button onClick = {this.toggleSell(item)}>Flip Ok to Sell</button></form></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <Link to="/manufacturer">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}