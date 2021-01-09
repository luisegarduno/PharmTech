import React from "react";
import {InventoryItem} from "./jsitem/inventoryItem";
import {RequestItem} from './jsitem/requestitem'
import Logo from "../../images/erpharmtechgrayer.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PharmacistRepository } from '../../API/pharmacistRepository'
import { PinventSearch } from './PinventSearch'


export class PharmacistIn extends React.Component {

    username;
    pharmacistRepository = new PharmacistRepository();
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            alldrugs:[],
            drugs: [],
            newdrugid: 0,
            newdrugmount: 0,
            newdrugdate: "",
            date: new Date(),
            marked: [],
            notificationlist: [],
            userNotification: [],
        }
        this.state.date.toISOString();
    }


    componentDidMount(){
        this.onSearch(undefined);
    }

    buildDrugs(){
        var arr = [];
        arr.push(<option value = "0"></option>);
        this.state.alldrugs.forEach(element => {
            arr.push(<option value = {element.DrugID}>{element.DrugName + " with total quantity " + element.Total}</option>);
        });
        return arr;
    }

    _handleChange = (event) => {
        this.setState({ newdrugid: event.target.value })
    }

    onSearch(param){
        this.pharmacistRepository.getInventory(param)
            .then(Drug => this.setState({drugs : Drug.data}));
        this.pharmacistRepository.getNotification()
            .then(Notif => this.setState({notificationlist : Notif.data}));
        this.pharmacistRepository.getDrug()
            .then(Alldrugs => this.setState({alldrugs : Alldrugs.data})); 
        this.pharmacistRepository.getUserNotification(this.username)
            .then(Allnotif => {
                this.setState({userNotification: Allnotif.data});
                this.updatemarked();
            });
    }

    handleAdd(){
        var newitem = new InventoryItem(this.state.newdrugid, this.state.newdrugmount, this.state.newdrugdate);
        this.setState({newdrugid : 0, newdrugmount : 0, newdrugmount: ""})
        this.pharmacistRepository.addinventory(newitem)
            .then(() =>{
                alert("New Item Added");
                this.onSearch("");
            });
    }

    handleRequest(){
        var newrequest = new RequestItem(this.state.newdrugid, this.state.newdrugmount, this.state.newdrugdate);
        this.pharmacistRepository.addRequest(newrequest)
            .then(() =>{
                alert("New Request Added");
                this.onSearch("");
            });   
    }

    handleDelete(){
        var ondeleteid = this.state.newdrugid;
        if(window.confirm("Are you sure you want to delete this drug?")){
            this.pharmacistRepository.deleteinventory(ondeleteid)
                .then(() => {
                    alert("Drug Deleted");
                    this.onSearch("");
                })
        }
    }

    handleSubmit = (e) => {                            
        e.preventDefault();
        e.target.reset();
    }

    handlechecked(id){
        if(this.state.marked[id-1] === true){
            return true;
        }
        else{
            return false;
        }
    }

    updatemarked(){
        var newmarked = [];
        this.state.alldrugs.forEach(element => {
            newmarked.push(false);
        });
        if(this.state.userNotification.length !== 0){
            for (let i = 0; i < this.state.userNotification.length; i++) {
                for (let j = 0; j < this.state.alldrugs.length; j++) {
                    if(this.state.userNotification[i].DrugID === this.state.alldrugs[j].DrugID){
                        newmarked[j] = true;
                    }
                }
            }
        }
        this.setState({marked: newmarked});
    }

    handlecheck(item){
        var newmarked = this.state.marked;
        if(this.state.marked[item-1] === false || this.state.userNotification.length === 0){
            this.pharmacistRepository.addUserNotification(this.username, item)
                .then(() => {
                    alert("Notification Added");
                    this.setState(this.marked[item-1] = true);
                    //this.setState({marked:newmarked});
                    this.onSearch("");
                })
        }
        else{
            this.pharmacistRepository.deleteUserNotification(this.username, item)
                .then(() => {
                    alert("Notification Canceled");
                    this.setState(this.marked[item-1] = true);
                    //this.state.marked[item-1] = true;
                    this.setState({marked:newmarked});
                    this.onSearch("");
                })
        }
    }

    colorforunit(quantity){
        var color = '';
        if(quantity === 0){
            color = 'red'
        }
        else if(quantity > 0 && quantity <= 500){
            color = 'orange'
        }
        else if(quantity > 500 && quantity <= 1000){
            color = 'yellow'
        }
        else if (quantity > 1000 && quantity <= 2000){
            color = '#D2B4DE'
        }
        else if (quantity > 2000 && quantity <= 5000){
            color = '#85C1E9'
        }
        else {
            color = '#2ECC71'
        }
        return color
    }

    render(){
        const listItems = this.state.userNotification.map((item, i) =>
            <li key = {i}>{item.DrugName + " is " + item.InventoryStatus}</li>
        );

        return (
            <div className = "body mb-4">
                <div className = "navBar">
                    <nav>
                        <div className = "img">
                            <img src={Logo} alt=""/>
                        </div>
                    </nav>
                </div>

                <div className = "notification">
                        <p>Your notification</p>
                        <ul>{listItems}</ul>
                </div>

                <div className = "bg-secondary pb-2 mb-4 pt-1 mt-2">
                    <h2  className = "ml-3 mt-1">Inventory</h2>
                </div>
                
                <div className = "container">
                    <Router>
                        <Route path="/pharmacist/PharmacistIn" exact render= {() => <Link className = "btn btn-info form-control mb-2" to="/pharmacist/PharmacistIn/search">Click to Search</Link>}></Route>
                        <Route path="/pharmacist/PharmacistIn/search" render={param => <PinventSearch onSearch={param => this.onSearch(param)} {...param}/>}  />
                    </Router>

                    <table  className = "table  table-bordered">
                        <thead className = "thead-dark">
                            <tr className = "bg-secondary">
                                <th>Drug Name</th>
                                <th>Drug Id</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Expire Date</th>
                                <th>Is expired</th>
                                <th>Mark Drug</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.drugs.map((item,index) => (
                                <tr className = " bg-light" key = {index}>
                                    <td>{item.name}</td>
                                    <td>{item.id}</td>
                                    <td bgcolor = {this.colorforunit(item.quantity)} >{item.quantity}</td>
                                    <td>{item.DrugUnit}</td>
                                    <td>{item.exp_date}</td>
                                    {(() => {
                                        if(this.state.date.toISOString() <= item.exp_date){
                                            return(
                                            <td>Is not expired</td>
                                            )
                                        }
                                        else{
                                            return(
                                                <td className = "bg-danger">Is expired</td>
                                            )
                                        }
                                    })()}
                                    <td>
                                        <button className = "btn btn-info" onClick ={() => this.handlecheck(item.id)}>Mark/UnMark</button>                         
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
                    <div className = "card bg-light mb-4">
                        <div className = "card-header bg-secondary text-white">
                            <h3 >Edit Inventory</h3>
                        </div>
                        <div className = "card-body">
                            <form onSubmit = {this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="selectdrug">Drug_ID</label>
                                    <select className = "custom-select form-control" id = "selectdrug" onChange={this._handleChange}>
                                        {this.buildDrugs()}
                                    </select>
                                </div>

                                <div className ="form-group">
                                    <label htmlFor="newdrugmount">Amount</label>
                                    <input type="number" id="newdrugmount" min="0" className = "form-control" placeholder = "0 (Not required for delete)"onChange={e => this.setState({ newdrugmount: e.target.value })}></input>
                                </div>

                                <div className ="form-group">
                                    <label htmlFor="newdrugdate">Exp_date (year-month-day)</label>
                                    <input type="text" id="newdrugdate"className = "form-control" placeholder = "2000-1-1 (Not required for delete)" onChange={e => this.setState({ newdrugdate: e.target.value })}></input>
                                </div>
                                
                                <button className = "btn btn-info form-control mt-2" onClick ={() => this.handleAdd()} >Add</button>
                                <button className = "btn btn-danger form-control mt-2" onClick ={() => this.handleDelete()} >Delete</button>
                                <button className = "btn btn-warning form-control  mt-2" onClick ={() => this.handleRequest()} >Request</button>
                            </form>
                        </div>
                    </div>
                </div>

                <footer>
                    <Link to="/Pharmacist">
                        <button className = "btn btn-info mb-5 ml-5">Return to Homepage</button>
                    </Link> 
                </footer>
            </div>
        );
    }
}
