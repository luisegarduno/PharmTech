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
    Prescriptionlist : [],
    CurrentOnchange: 'null',
    isediting: -1,
    newpatientid: "",
    newpatient: "",
    newPrescriptionName : "",
    newDoctorID: "",
    newquantity : 0,
}

    componentDidMount(){
        this.onSearch()
    }


    onSearch(param){
        this.pharmacistRepository.getPrescription(param)
            .then(Prescriptions => this.setState({Prescriptionlist : Prescriptions.data}));
    }

    GoAdd(newPrescription){

    }

    GoDuplicate(item){
        let temparray = this.state.Prescriptionlist;
        item.name = "null";
        item.title = "null";
        temparray.push(item);
        this.setState({Prescriptionlist: temparray})
    }

    GoDelete(index){
        let temparray = this.state.Prescriptionlist;
        temparray.splice(index,1);
        this.setState({Prescriptionlist : temparray});
    }

    GoEdit(index){
        this.setState({isediting:index});
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

    GoSave(index){
        var newPrescription = new PrescriptionItem(this.state.newpatientid, this.state.newpatient, this.state.newPrescriptionName, this.state.newquantity);
        this.setState({newpatientid : "", newpatient : "", newPrescriptionName : "", newquantity :0, isediting: -1});
        debugger;
    }

    handleSave(type, index){
        // let temparray = this.state.Prescriptionlist;
        // if(type == "title"){
        //     temparray[index].title = this.state.CurrentOnchange;
        // }
        // else if(type == "name"){
        //     temparray[index].name = this.state.CurrentOnchange;
        // }
        // else if(type == "drugitem"){
        //     temparray[index].druglist[i] = this.state.CurrentOnchange;
        // }
        // else if(type == "unititem"){
        //     temparray[index].unitlist[i] = this.state.CurrentOnchange;
        // }
        // this.setState({Prescriptionlist:temparray})
        alert("change saved")
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

                <div className = "container">
                    <Router>
                        <Route path="/pharmacist/Prescription" exact render= {() => <Link className = "btn btn-info form-control mb-2" to="/pharmacist/Prescription/search">Click to Search</Link>}></Route>
                        <Route path="/pharmacist/Prescription/search" render={param => <PrescriptSearch onSearch={param => this.onSearch(param)} {...param}/>}  />
                    </Router>
                    <table  className ="table  bg-light  table-striped table-bordered">
                        <thead className = "thead-dark">
                            <tr>
                                <th>Title</th>
                                <th>Patient ID</th>
                                <th>Patient Name</th>
                                <th>Drug Id</th>
                                <th >Drug Name</th>
                                <th >Quantity</th>
                                <th>Doctor ID</th>
                                <th >Setting</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Prescriptionlist.map((item,index) => (
                                <tr>
                                    <td>{item.Title}</td>
                                    <td>{item.PatientID}</td>
                                    <td>{item.Patient}</td>
                                    <td>{item.DrugID}</td>
                                    <td>{item.PrescriptionName}</td>
                                    <td>{item.Quantity}</td>
                                    <td>{item.DrugID}</td>
                                <td>
                                    <div>
                                        <form onSubmit = {this.handleSubmit}>
                                            <button className = "btn btn-info mb-2" onClick = {() => this.GoDuplicate(item) }>Duplicate</button> <br />
                                            <button className = "btn btn-warning mb-2" onClick = {() => this.GoEdit(index)}>Edit</button> <br />
                                            <button className = "btn btn-danger" onClick = {() => this.GoDelete(index)}>Delete</button>
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
                                <form class="form-inline mb-2">
                                    <h4>Edit changes: </h4>
                                    <label class="sr-only" for="newTitle">Title</label>
                                    <input type="text" class="form-control mb-2 mr-sm-2" id="newTitle" placeholder= {"Title: " + this.state.Prescriptionlist[this.state.isediting].Title} onChange={e => this.setState({ newpatientid: e.target.value })}/>
                                    <label class="sr-only" for="inlineFormInputName2">Patient</label>
                                    <input type="text" class="form-control mb-2 mr-sm-2" id="Patient" style = {{maxWidth: "4cm"}} placeholder= {"Patient ID: " + this.state.Prescriptionlist[this.state.isediting].PatientID} onChange={e => this.setState({ newpatient: e.target.value })}/>
                                    <label class="sr-only" for="PrescriptionName">PrescriptionName</label>
                                    <input type="text" class="form-control mb-2 mr-sm-2" id="PrescriptionName" style = {{maxWidth: "3cm"}} placeholder= {"Drug ID: " + this.state.Prescriptionlist[this.state.isediting].DrugID} onChange={e => this.setState({ newPrescriptionName: e.target.value })}/>
                                    <label class="sr-only" for="quantity">quantity</label>
                                    <input type="text" class="form-control mb-2 mr-sm-2 " style = {{maxHeight: "1.5em"}} id="quantity" placeholder= {this.state.Prescriptionlist[this.state.isediting].quantity} onChange={e => this.setState({ newquantity: e.target.value })}/>
                                    <label class="sr-only" for="DoctorID">DoctorID</label>
                                    <input type="text" class="form-control mb-2 mr-sm-2 " style = {{maxHeight: "1.5em",maxWidth: "3cm"}} id="DoctorID" placeholder= {"Doctor ID" + this.state.Prescriptionlist[this.state.isediting].DoctorID} onChange={e => this.setState({ newDoctorID: e.target.value })}/>
                                    <button className = "btn btn-warning" onClick = {() => this.GoSave(this.state.isediting)} >Save</button>
                                </form>

                                )
                                }
                        })()}
                </div>
            
                <div>
                    <PrescriptForm onChange = {newPrescription => this.GoAdd*newPrescription}/>
                    <Link to="/Pharmacist">
                        <button className = "btn btn-info mb-5 ml-5">Return to Homepage</button>
                    </Link> 
                </div> 
            </div>
            );
        }
    }