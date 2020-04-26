import React, {Component} from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link, Redirect} from "react-router-dom";
import { ManufacturerRepository } from "../../API";
import _ from 'lodash';
import axios from 'axios';

export class Maninventory extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;
    intervalID;

    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            drugs:[],
            sortDirection : 'asc',
        }
        this.yesno = this.yesno.bind(this);
        this.opposite = this.opposite.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    getData = () => {
        this.manufacturerRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}))
    }

    componentDidMount() {
        this.getData();
        this.intervalID = setInterval(this.getData.bind(this), 500);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
      }

    sortBy(field) {      
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

    yesno(value) {
        if (value == 1) {
            return "Yes";
        } else {
            return "No";
        }
    }

    opposite(value) {
        if (value == 1) {
            return "No";
        } else {
            return "Yes";
        }
    }

    toggleExpired(expired, batchid) {
        var tf = 0; //0 = false
        if (expired == 0) {
            tf = 1;
        }
        axios.put('http://localhost:8000/updateExpiration', {expired: tf, batch_id: batchid})
    }

    toggleSell(oksell, batchid) {
        var tf = 0; //0 = false
        if (oksell == 0) {
            tf = 1;
        }
        axios.put('http://localhost:8000/updateOK', {expired: tf, batch_id: batchid})
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
                        <thead><tr className="">
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'name')}>Name</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'exp_date')}>Made On</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'aquired_from')}>Acquired From</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'expired')}>Expired?</button></th>
                            <th><button type="button" id="expDate" onClick={this.sortBy.bind(this, 'ok_to_sell')}>OK to Sell?</button></th>
                        </tr></thead>
                        <tbody>
                        {this.state.drugs.map(item => (
                            <tr key={item.name}>
                                <td id="item">{item.name}</td>
                                <td id="item">{this.formatDate(item.exp_date)}</td>
                                <td id="item">{item.aquired_from}</td>
                                <td id="item">{this.yesno(item.expired)} <button className="btn coloredBtn" onClick={this.toggleExpired.bind(this, item.expired, item.batch_id)}>Mark {this.opposite(item.expired)}</button></td>
                                <td id="item">{this.yesno(item.ok_to_sell)} <button className="btn coloredBtn" onClick={this.toggleSell.bind(this, item.ok_to_sell, item.batch_id)}>Mark {this.opposite(item.ok_to_sell)}</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/manufacturer">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}