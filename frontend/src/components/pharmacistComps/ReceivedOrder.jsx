import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import { PharmacistRepository } from '../../API/pharmacistRepository'
import {Link} from "react-router-dom";
import _ from 'lodash';
import {ReceiveorderItem} from './jsitem/receiveorderitem'


export class ReceivedOrder extends React.Component {

    username;
    pharmacistRepository = new PharmacistRepository();
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state ={
            sortDirection : 'desc',
            orders:[],
            isediting: -1,
            newPatient: "",
            newdockor_name : "",
            newname : "",
            newquantity : 0,
            newcreate_date: "",
            newfill_date: "",
        }
    }
    
    componentDidMount(){
        this.pharmacistRepository.getReceived()
            .then(Order => this.setState({orders : Order.data}))
    }


    sortBy(field) {        
        if (this.state.sortDirection == 'asc') {
            this.setState({sortDirection: 'desc'})
            this.setState({ 
                orders: _.orderBy(this.state.orders, field, this.state.sortDirection) 
            });
        }
        if (this.state.sortDirection == 'desc') {
            this.setState({sortDirection: 'asc'})
            this.setState({ 
                orders: _.orderBy(this.state.orders, field, this.state.sortDirection) 
            });
        }
    }

    GoEdit(index){
        this.setState({isediting:index});
    }

    GoSave(index){
        var newReceiveorder = new ReceiveorderItem(this.state.newPatient, this.state.newdoctor_name, this.state.newname, this.state.newquantity, this.state.newcreate_date, this.state.newfill_date);
        this.setState({newPatient : "", newdoctor_name : "", newname : "", newquantity :0, isediting: -1, newcreate_date: "", newfill_date : ""});
    }

    handleSave(type, index){

        alert("change saved")
    }

    handleSubmit = (e) => {                            
        e.preventDefault();
        e.target.reset();
    }

    render() {
        return (
        <div>
            <div className = "body">
                <nav>
                    <div className = "img" id = "logo">
                        <img src={Logo} />
                    </div>
                </nav>
                <div className = "bg-secondary pb-2 mb-4 pt-1 mt-2">
                    <h2  className = "ml-3 mt-1">Received Order List</h2>
                </div>

                <div className = "container">
                    <table  className = "table  bg-light  table-striped table-bordered">
                        <thead>
                            <tr className = "thead-dark">
                                <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'Patient')}>Patient </button> </th>
                                <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'doctor_name')}>Doctor </button></th>
                                <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'name')}>Drug </button></th>
                                <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'quantity')}>Quantity </button></th>
                                <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'create_date')}>Create Date </button></th>
                                <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'fill_date')}>Fill Date </button></th>
                                <th><button className = "btn text-light font-weight-bold">Setting</button></th>
                            </tr>
                        </thead>

                         <tbody>
                        {this.state.orders.map((item,index) => (
                                <tr className = " bg-light" key = {index}>
                                    <td>{item.Patient}</td>
                                    <td>{item.doctor_name}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.create_date}</td>
                                    <td>{item.fill_date}</td>
                                    <td><button className = "btn btn-warning mb-2" onClick = {() => this.GoEdit(index)}>Edit</button> <br /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(() => {
                        if(this.state.isediting != -1){
                            return(
                                <form class="form-inline" onSubmit = {this.handleSubmit}>
                                    <div className = "card mb-3 d-inline-block  text-center bg-info text-light" style = {{marginLeft: "10em"}}>
                                        <h4 class="card-title ml-3 mt-3">Edit changes: </h4>
                                        <div className = "card-body">
                                            <div className = "row">
                                                <div className = "col">
                                                    <label for="Patient">Patient</label>
                                                </div>
                                                <div className = "col">
                                                    <label for="doctor_name">doctor_name</label>
                                                </div>
                                                <div className = "col">
                                                    <label for="name">name</label>
                                                </div>
                                            </div>
                                            <div className = "row">
                                                <div className = "col">
                                                    <input type="text" class="form-control mb-2 mr-sm-2" id="Patient" placeholder= {this.state.orders[this.state.isediting].Patient} onChange={e => this.setState({ newPatient: e.target.value })}/>
                                                </div>
                                                <div className = "col">
                                                    <input type="text" class="form-control mb-2 mr-sm-2" id="doctor_name" placeholder= {this.state.orders[this.state.isediting].doctor_name} onChange={e => this.setState({ newdoctor_name: e.target.value })}/>
                                                </div>
                                                <div className = "col">
                                                    <input type="text" class="form-control mb-2 mr-sm-2" id="name" placeholder= {this.state.orders[this.state.isediting].name} onChange={e => this.setState({ newname: e.target.value })}/>
                                                </div>
                                            </div>
                                            <div className = "row">
                                                <div className = "col">
                                                    <label for="quantity">quantity</label>
                                                </div>
                                                <div className = "col">
                                                    <label for="create_date">create_date</label>
                                                </div>
                                                <div className = "col">
                                                    <label for="fill_date">fill_date</label>
                                                </div>
                                            </div>
                                            <div className = "row">
                                                <div className = "col">
                                                    <input type="text" class="form-control mb-2 mr-sm-2 " style = {{maxHeight: "1.5em", width: "5.4cm"}} id="quantity" placeholder= {this.state.orders[this.state.isediting].quantity} onChange={e => this.setState({ newquantity: e.target.value })}/>
                                                </div>
                                                <div className = "col">
                                                    <input type="text" class="form-control mb-2 mr-sm-2 " id="create_date" placeholder= {this.state.orders[this.state.isediting].create_date} onChange={e => this.setState({ newcreate_date: e.target.value })}/>                                            
                                                </div>
                                                <div className = "col">
                                                    <input type="text" class="form-control mb-2 mr-sm-2 " id="fill_date" placeholder= {this.state.orders[this.state.isediting].fill_date} onChange={e => this.setState({ newfill_date: e.target.value })}/>                                            
                                                </div>
                                            </div>
                                            <div className = "row">
                                                <div className = "col-8">
                                            <button className = "btn btn-success form-control"  style = {{marginLeft: "16em"}} onClick = {() => this.GoSave(this.state.isediting)}>Save</button>
                                            </div>
                                            </div>
                                    </div>
                                    </div>
                                </form>

                                )
                                }
                        })()}
                </div>
           </div>
                <div>
                <Link to="/Pharmacist">
                    <button className = "btn btn-info mb-5 ml-5">Return to Homepage</button>
                </Link> 
            </div> 
        </div>        
        );
    }
}