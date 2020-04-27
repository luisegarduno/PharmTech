import React from "react";
import {InventoryItem} from "./jsitem/inventoryItem";
import Logo from "../../images/erpharmtechgrayer.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PharmacistRepository } from '../../API/pharmacistRepository'
import {PinventSearch} from './PinventSearch'


export class PharmacistIn extends React.Component {

    username;
    pharmacistRepository = new PharmacistRepository();
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            drugs: [],
            newdrugid: 0,
            newdrugmount: 0,
            newdrugdate: "",
            date: new Date(),
            marked: [],
            notificationlist: [],
        }
        this.state.date.toISOString();
    }


    componentDidMount(){
        this.onSearch()
    }


    onSearch(param){
        this.pharmacistRepository.getInventory(param)
            .then(Drug => this.setState({drugs : Drug.data}));
        this.pharmacistRepository.getNotification()
            .then(Notif => this.setState({notificationlist : Notif.data}));
    }

    handleAdd(){
        var newitem = new InventoryItem(this.state.newdrugid, this.state.newdrugmount, this.state.newdrugdate);
        this.pharmacistRepository.addinventory(newitem)
            .then(() =>{
                alert("New Item Added");
                this.setState({newdrugid:0, newdrugmount: 0, newdrugdate: ""});
                this.onSearch(undefined);
            })
    }

    handleDelete(){
        var ondeleteid = this.state.newdrugid;
        if(window.confirm("Are you sure you want to delete this drug?")){
            this.pharmacistRepository.deleteinventory(ondeleteid)
                .then(() => {
                    this.setState({newdrugid:0, newdrugmount: 0, newdrugdate: "", drugs: this.state.drugs.filter(x => x.drug_id != ondeleteid)});
                    alert("Drug Deleted");
                    this.onSearch(undefined);
                })
        }
    }

    handleRequest(){
        alert("New Item Requested");
    }

    handleSubmit = (e) => {                            
        e.preventDefault();
        e.target.reset();
    }

    handlecheck(item){
        var exist = false;
        debugger;
        if(this.state.notificationlist.length != 0){
            this.state.marked.forEach(element => {
                if(element.DrugID == item){
                    exist = true;
                }
            });
        }
        if(exist == false){
            var newmarked = this.state.marked;
            newmarked.push(this.state.notificationlist[item-1]);
            this.setState({marked: newmarked});
        }
    }

    colorforunit(quantity){
        var color = '';
        if(quantity == 0){
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

        function LimitList(input) {  // Set the number of notifications that needs to be displayed. EX: If the bound is 3, it will only show three newest notifications. 
            var ret = new Array();
            if(input.length <= 3){
                ret = input;
            }
            else{
                for(var i = 0; i < input.length; i++) {
                    if(input.length - i <= 3){
                        ret.push(input[i]);
                    }
                }
            }
            return ret;
        }

         var show = LimitList(this.state.marked);

         const listItems = show.map((item, i) =>
                    <li key = {i}>{item.name + " is " + item.Available}</li>
        );



        return (
            <div className = "body mb-4">
                <div className = "navBar">
                    <nav>
                        <div className = "img">
                            <img src={Logo} />
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
                                <th>Expire Date</th>
                                <th>Is expired</th>
                                <th>Marked</th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.drugs.map((item,index) => (
                                <tr className = " bg-light" key = {index}>
                                    <td>{item.name}</td>
                                    <td>{item.id}</td>
                                    <td bgcolor = {this.colorforunit(item.quantity)} >{item.quantity}</td>
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
                                        <div className="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id= {"customCheck"+ index}  onChange = {() => this.handlecheck(item.id)}/>
                                        <label class="custom-control-label" for={"customCheck"+ index}></label>
                                        </div>                            
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
                                    <label htmlFor="newdrugname">Drug_ID</label>
                                    <input type="number" id="durgname" className = "form-control" min="0" className = "form-control" placeholder = "0" onChange={e => this.setState({ newdrugid: e.target.value })}/>
                                </div>

                                <div className ="form-group">
                                    <label htmlFor="newdrugmount">Amount</label>
                                    <input type="number" id="newdrugmount" min="0" className = "form-control" placeholder = "0"onChange={e => this.setState({ newdrugmount: e.target.value })}></input>
                                </div>

                                <div className ="form-group">
                                    <label htmlFor="newdrugdate">Exp_date (year-month-day)</label>
                                    <input type="text" id="newdrugdate"className = "form-control" placeholder = "2000-1-1" onChange={e => this.setState({ newdrugdate: e.target.value })}></input>
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
