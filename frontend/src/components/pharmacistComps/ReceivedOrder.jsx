import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import { PharmacistRepository } from '../../API/pharmacistRepository'
import { Link } from "react-router-dom";
import _ from 'lodash';

export class ReceivedOrder extends React.Component {

    username;
    pharmacistRepository = new PharmacistRepository();
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state ={
            arrdrugs : [],
            allpatients : [],
            alldoctors : [],
            sortDirection : 'desc',
            orders:[],
            isediting: -1,
            line: 0,
            newPatientID: 0,
            newDoctorID : 0,
            newDrugID : 0,
            newquantity : 0,
            newfilldate: "",
        }
    }
    
    componentDidMount(){
        this.pharmacistRepository.getReceived()
            .then(Order => this.setState({orders : Order.data}))
        this.pharmacistRepository.getDrug()
            .then(Alldrugs => this.setState({alldrugs : Alldrugs.data}));
        this.pharmacistRepository.getPatient()
            .then(Allpatients => this.setState({allpatients : Allpatients.data}));
        this.pharmacistRepository.getDoctor()
            .then(Alldoctors => this.setState({alldoctors : Alldoctors.data}));
    }

    handleDrug = (event) =>{
        this.setState({ newDrugID: event.target.value });
    }

    handlePatient = (event) =>{
        this.setState({newPatientID : event.target.value});
    }

    handleDoctor = (event) =>{
        this.setState({newDoctorID : event.target.value});
    }

    buildDrugs(){
        var arr = [];
        arr.push(<option value = "0"></option>);
        this.state.alldrugs.forEach(element => {
            arr.push(<option value = {element.DrugID}>{element.DrugName}</option>);
        });
        return arr;
    }

    buildPatients(){
        var arr = [];
        arr.push(<option value = "0"></option>);
        this.state.allpatients.forEach(element => {
            arr.push(<option value = {element.PatientID}>{element.PatientName}</option>);
        });
        return arr;
    }

    buildDoctors(){
        var arr = [];
        arr.push(<option value = "0"></option>);
        this.state.alldoctors.forEach(element => {
            arr.push(<option value = {element.DoctorID}>{element.DoctorName}</option>);
        });
        return arr;
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

    GoEdit(orderID, index){
        this.setState({isediting:orderID, line:index});
    }

    GoSave(){
        var date= new Date();
        var time = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        var neworder = this.state.orders[this.state.line];
        neworder.DoctorID = this.state.newDoctorID;
        neworder.PatientID = this.state.newPatientID;
        neworder.DrugID = this.state.newDrugID;
        neworder.quantity = this.state.newquantity;
        neworder.create_date = time;
        neworder.fill_date = this.state.newfilldate;
        this.pharmacistRepository.editReceiving(neworder)
            .then(() =>{
                alert("Item Edited");
            });
        this.setState({newDoctorID : 0, newPatientID : 0, newDrugID : 0, newquantity :0, isediting: -1, line: -1, newfilldate : ""});
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
                                    <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'doctor_name')}>Doctor</button></th>
                                    <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'Drug')}>Drug</button></th>
                                    <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'quantity')}>Quantity</button></th>
                                    <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'create_date')}>Create Date</button></th>
                                    <th><button className = "btn text-light font-weight-bold" onClick={this.sortBy.bind(this, 'fill_date')}>Fill Date</button></th> 
                                    <th><button className = "btn text-light font-weight-bold" >Setting</button></th>                           
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.orders.map((item,index) => (
                                    <tr className = " bg-light" key = {index}>
                                        <td>{item.Patient}</td>
                                        <td>{item.doctor_name}</td>
                                        <td>{item.Drug}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.create_date}</td>
                                        <td>{item.fill_date}</td>
                                        <td><button className = "btn btn-warning mb-2" onClick = {() => this.GoEdit(item.OrderID, index)}>Edit</button> <br /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {(() => {
                            if(this.state.isediting != -1){
                                return(
                                    <form onSubmit = {this.handleSubmit}>
                                        <div className = "card  text-center bg-light">
                                            <h4 className="card-title ml-3 mt-3">Edit changes: </h4>
                                            <div className = "card-body">
                                                <div className = "row">
                                                    <div className = "col">
                                                        <label htmlFor="drugname1">Drug name</label>
                                                    </div>
                                                    <div className = "col">
                                                        <label htmlFor="patientname1">Patient Name</label>
                                                    </div>
                                                    <div className = "col">
                                                        <label htmlFor="doctorname1">Doctor Name</label>
                                                    </div>
                                                    <div className = "col">
                                                        <label htmlFor="quantity">quantity</label>
                                                    </div>
                                                    <div className = "col">
                                                        <label htmlFor="fill_date">fill_date</label>
                                                    </div>
                                                </div>
                                                <div className = "row">
                                                    <div className = "col">
                                                        <select className = "custom-select form-control" id = "drugname1" onChange = {this.handleDrug}>
                                                            {this.buildDrugs()}
                                                        </select>
                                                    </div>
                                                    <div className = "col">
                                                        <select className = "custom-select form-control" id = "patientname1" onChange = {this.handlePatient}>
                                                            {this.buildPatients()}
                                                        </select>
                                                    </div>
                                                    <div className = "col">
                                                        <select className = "custom-select form-control" id = "doctorname1" onChange = {this.handleDoctor}>
                                                            {this.buildDoctors()}
                                                        </select>
                                                    </div>
                                                    <div className = "col">
                                                        <input type="text" class="form-control mb-2 mr-sm-2 " style = {{maxHeight: "1.5em", width: "5.4cm"}} id="quantity" placeholder= {this.state.orders[this.state.line].quantity} onChange={e => this.setState({ newquantity: e.target.value })}/>
                                                    </div>
                                                    <div className = "col">
                                                        <input type="text" class="form-control mb-2 mr-sm-2 " id="fill_date" placeholder= {this.state.orders[this.state.line].fill_date} onChange={e => this.setState({ newfilldate: e.target.value })}/>                                            
                                                    </div>
                                                </div>
                                                <div className = "row">
                                                    <button className = "btn btn-info form-control mt-2 ml-2 mr-2"  onClick = {() => this.GoSave()}>Save</button>
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