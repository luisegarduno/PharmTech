import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import PrescriptForm from "./PrescriptForm"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InlineEdit from 'react-edit-inline2';
import { PharmacistRepository } from '../../API/pharmacistRepository'
import {PrescriptionItem} from './jsitem/prescriptionitem'
import {PrescriptSearch} from './PrescriptSearch'


export class Prescription extends React.Component {

    username;
    pharmacistRepository = new PharmacistRepository();

    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.dataChanged = this.dataChanged.bind(this);
    }

    state = {
    alldrugs : [],
    allpatients : [],
    alldoctors : [],
    Prescriptionlist : [],
    CurrentOnchange: 'null',
    isediting: -1,
    line: -1,
    newTitle: "",
    newPatientID: 0,
    newDrugID : 0,
    newdoctor_id: 0,
    newQuantity : 0,
}

    componentDidMount(){
        this.onSearch()
    }


    onSearch(param){
        this.pharmacistRepository.getPrescription(param)
            .then(Prescriptions => this.setState({Prescriptionlist : Prescriptions.data}));
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
        this.setState({newdoctor_id : event.target.value});
    }

    GoAdd(newPrescription){
        this.pharmacistRepository.addPrescription(newPrescription)
            .then(() =>{
                alert("New Item Added");
                this.onSearch("");
            });
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


    GoDuplicate(item){
        var date= new Date();
        var time = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        var newprescription = new PrescriptionItem(item.Title, item.PatientID, item.DrugID, item.Quantity, time, item.doctor_id);
        this.pharmacistRepository.addPrescription(newprescription)
        .then(() =>{
            alert("New Item Added");
            this.onSearch("");
        });
    }

    GoDelete(id){
        if(window.confirm("Are you sure you want to delete this prescription")){
            this.pharmacistRepository.deletePrescription(id)
                .then(() => {
                    alert("Prescription Deleted");
                    this.onSearch("");
                })
        }
    }

    GoEdit(ID, index){
        this.setState({isediting:ID, line:index});
    }

    RemoveDrug(index,i){
        let temparray = this.state.Prescriptionlist;
        temparray[index].druglist.splice(i,1);
        temparray[index].unitlist.splice(i,1);
        this.setState({Prescriptionlist : temparray});
    }

 
    handleSubmit = (e) => {                            
        e.preventDefault();
        e.target.reset();
    }

    dataChanged(data) {
        this.setState({CurrentOnchange: data.message});
    }

    GoSave(){
        var date= new Date();
        var time = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        var newPrescription = this.state.Prescriptionlist[this.state.line];
        newPrescription.Title = this.state.newTitle;
        newPrescription.PatientID = this.state.newPatientID;
        newPrescription.DrugID = this.state.newDrugID;
        newPrescription.doctor_id = this.state.newdoctor_id;
        newPrescription.Quantity = this.state.newQuantity;
        newPrescription.create_date = time;
        this.pharmacistRepository.editPrescription(newPrescription.Title, newPrescription.PatientID, newPrescription.DrugID, newPrescription.Quantity, newPrescription.doctor_id, newPrescription.create_date, newPrescription.PrescriptionID)
            .then(() =>{
                alert("Item Edited");
                this.onSearch("");
            });
        this.setState({newpatientid : "", newpatient : "", newPrescriptionName : "", newquantity :0, isediting: -1});
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
                </div>

                <div  className = "bg-secondary pb-2 mb-4 pt-1 mt-2">
                    <h2 className = "ml-3 mt-1">Prescription List</h2>
                </div>

                <div className = "container mb-4">
                    <Router>
                        <Route path="/pharmacist/Prescription" exact render= {() => <Link className = "btn btn-info form-control mb-2" to="/pharmacist/Prescription/search">Click to Search</Link>}></Route>
                        <Route path="/pharmacist/Prescription/search" render={param => <PrescriptSearch onSearch={param => this.onSearch(param)} {...param}/>}  />
                    </Router>

                    <table  className ="table  bg-light  table-striped table-bordered">
                        <thead className = "thead-dark">
                            <tr>
                                <th>Title</th>
                                <th>Patient Name</th>
                                <th>Patient ID</th>
                                <th>Doctor Name</th>
                                <th>Drug Name</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Setting</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.Prescriptionlist.map((item,index) => (
                                <tr key = {index}>
                                    <td>{item.Title}</td>
                                    <td>{item.Patient}</td>
                                    <td>{item.PatientID}</td>
                                    <td>{item.doctor_name}</td>
                                    <td>{item.DrugName}</td>
                                    <td>{item.Quantity}</td>
                                    <td>{item.Unit}</td>
                                    <td>
                                        <div>
                                            <form onSubmit = {this.handleSubmit}>
                                                <button className = "btn btn-info mb-2" onClick = {() => this.GoDuplicate(item) }>Duplicate</button> <br />
                                                <button className = "btn btn-warning mb-2" onClick = {() => this.GoEdit(item.PrescriptionID, index)}>Edit</button> <br />
                                                <button className = "btn btn-danger" onClick = {() => this.GoDelete(item.PrescriptionID)}>Delete</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {(() => {
                        if(this.state.isediting != -1){
                            return(
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className = "card  text-center bg-light">
                                        <h4 className="card-title ml-3 mt-3">Edit changes: </h4>
                                        <div className = "card-body">
                                            <div className = "row">
                                                <div className = "col">
                                                    <label htmlFor="newTitle">Title</label>
                                                </div>
                                                <div className = "col">
                                                    <label  htmlFor="patientname2">Patient</label>
                                                </div>
                                                <div className = "col">
                                                    <label  htmlFor="drugname2">DrugID</label>
                                                </div>
                                                <div className = "col">
                                                    <label htmlFor="quantity">quantity</label>
                                                </div>
                                                <div className = "col">
                                                    <label htmlFor="doctorname2">DoctorID</label>
                                                </div>
                                            </div>

                                            <div className = "row">
                                                <div className = "col">
                                                    <input type="text" className="form-control mb-2 mr-sm-2" id="newTitle" placeholder= {"Title: " + this.state.Prescriptionlist[this.state.line].Title} onChange={e => this.setState({ newTitle: e.target.value })}/>
                                                </div>
                                                <div className = "col">
                                                    <select className = "custom-select form-control" id = "patientname2" onChange = {this.handlePatient}>
                                                        {this.buildPatients()}
                                                    </select>
                                                </div>
                                                <div className = "col">
                                                    <select className = "custom-select form-control" id = "drugname2" onChange = {this.handleDrug}>
                                                        {this.buildDrugs()}
                                                    </select>
                                                </div>
                                                <div className = "col">
                                                    <input type="number" className="form-control mb-2 mr-sm-2 " style = {{maxHeight: "1.5em", width: "6cm"}} id="quantity" placeholder= {"Quantity: " +this.state.Prescriptionlist[this.state.line].Quantity} onChange={e => this.setState({ newQuantity: e.target.value })}/>
                                                </div>
                                                <div className = "col">
                                                    <select className = "custom-select form-control" id = "doctorname2" onChange = {this.handleDoctor}>
                                                        {this.buildDoctors()}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className = "row">
                                                <button className = "btn btn-info form-control  mt-2 ml-2 mr-2" onClick = {() => this.GoSave()} >Save</button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                                )
                            }
                        }
                    )()}
                </div>
            
                <div>
                    <PrescriptForm Onchange = {newPrescription => this.GoAdd(newPrescription)} alldrugs = {this.state.alldrugs} allpatients = {this.state.allpatients} alldoctors = {this.state.alldoctors}/>
                    <Link to="/Pharmacist">
                        <button className = "btn btn-info mb-5 ml-5">Return to Homepage</button>
                    </Link> 
                </div> 
            </div>
        );
    }
}