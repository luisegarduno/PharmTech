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
        this.truefalse = this.truefalse.bind(this);
        this.yesno = this.yesno.bind(this);
        this.opposite = this.opposite.bind(this);
        this.toggleExpired = this.toggleExpired.bind(this);
        this.toggleSell = this.toggleSell.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {
        this.manufacturerRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}))
    }

    truefalse(value) {
        if(value == true) {
            return "True";
        } else {
            return "False";
        }
    }

    yesno(value) {
        if (value == true) {
            return "Yes";
        } else {
            return "No";
        }
    }

    opposite(value) {
        if (value == true) {
            return "No";
        } else {
            return "Yes";
        }
    }

    toggleExpired(item) {
        var tf = 0; //0 = true
        if (item.expired == false) {
            tf = 1;
        }
        var batchid = item.batch_id;
        this.manufacturerRepository.markExpired(tf, batchid);
        // this.manufacturerRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}));
    }

    toggleSell(oksell, batchid) {
        var tf = false; //0 = true
        if (oksell == false) {
            tf = true;
        }
        this.manufacturerRepository.markBuy(tf, batchid);
        // this.manufacturerRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}));
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
                        <img src={Logo} alt="Logo" />
                </div>
                <h1 className = "yourCart">
                        Inventory
                </h1>
            </nav>
            <h1 className = "tableHeader">All Inventory</h1>
                <div className = "itemsTable">
                    <table>
                        <tr class="">
                            <th>Name</th>
                            <th>Made On</th>
                            <th>Acq From</th>
                            <th>Expired?</th>
                            <th>OK to Sell?</th>
                        </tr>
                        {this.state.drugs.map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{this.formatDate(item.exp_date)}</td>
                                <td id="item">{item.aquired_from}</td>
                                {/* <td id="item">{item.expired}<form><button onClick = {this.toggleExpired(item)}>Flip Expired</button></form></td> */}
                                {/* <td id="item">{item.ok_to_sell}<form><button onClick = {this.toggleSell(item)}>Flip Ok to Sell</button></form></td> */}
                                <td id="item">{this.yesno(item.expired)} <button className="btn btn-primary">Mark {this.opposite(item.expired)}</button></td>
                                <td id="item">{this.yesno(item.ok_to_sell)} <button className="btn btn-primary" onClick={this.toggleSell(item.ok_to_sell, item.batch_id)}>Mark {this.opposite(item.ok_to_sell)}</button></td>
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