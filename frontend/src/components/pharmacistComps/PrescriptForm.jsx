import React from "react";
import {PrescriptionItem} from './jsitem/prescriptionitem'



class PrescriptForm extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        title : "",
        patient_id : 0,
        drug_id : 0,
        create_date : "",
        doctor_id : 0,
        quantity : 0,
        alldrugs : [],
        allpatients : [],
        alldoctors : [],
        isediting: -1,
    }

    
    handleDrug = (event) =>{
        this.setState({ drug_id: event.target.value });
    }

    handlePatient = (event) =>{
        this.setState({patient_id : event.target.value});
    }

    handleDoctor = (event) =>{
        this.setState({doctor_id : event.target.value});
    }

    buildDrugs(){
        var arr = [];
        arr.push(<option value = "0"></option>);
        this.state.alldrugs.forEach(element => {
            arr.push(<option value = {element.DrugID}>{element.DrugName + " with total quantity " + element.Total}</option>);
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

    handleSubmit = (e) => {                            
        e.preventDefault();
        e.target.reset();
    }

    handleClick = () =>{
        var date= new Date();
        var time = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        this.props.Onchange(new PrescriptionItem(this.state.title, this.state.patient_id, this.state.drug_id, this.state.quantity, time, this.state.doctor_id));
        this.setState({isediting: -1});
    }

    handleload(){
        this.setState({alldrugs : this.props.alldrugs, allpatients: this.props.allpatients, alldoctors: this.props.alldoctors, isediting: 1});
    }
    render(){
        return(
            <div className = "container" style = {{width : "60%"}}>
                <div className = "card bg-light">
                    <div className = "card-header bg-info text-white text-center">
                        <button className = "btn btn-info text-center form-control font-weight-bold " style = {{fontSize: "0.7cm"}} onClick = {() => this.handleload()}>Add Prescription</button>
                    </div>
                    {(() => {
                        if(this.state.isediting != -1){
                            return(
                                <div className = "card-body mt-1">
                                    <form  onSubmit={this.handleSubmit.bind(this)}>
                                        <div className = "form-group">
                                            <div className = "row">
                                                <div className = "col-6">
                                                    <label htmlFor = "patientname3">Patient Name</label>
                                                </div>
                                                <div className = "col-6">
                                                    <label htmlFor = "newtitle">Title</label>
                                                </div>
                                            </div>
                                            <div className = "row">
                                                <div className = "col-6">
                                                    <select className = "custom-select form-control" id = "patientname3" onChange = {this.handlePatient}>
                                                        {this.buildPatients()}
                                                    </select>
                                                </div>
                                                <div className = "col-6">
                                                    <input type="text" className = "form-control" id="newtitle" onChange={e=> this.setState({title: e.target.value})}/>
                                                </div>
                                            </div>                      
                                        </div>

                                        <div className = "form-group">
                                            <div className = "row">
                                                <div className = "col-4">
                                                    <label htmlFor = "drugname2">Drug Name</label>
                                                </div>
                                                <div className = "col-4">
                                                    <label htmlFor = "newunits">Quantity</label>
                                                </div>
                                                <div className = "col">
                                                    <label htmlFor = "doctorname2">Doctor Name</label>
                                                </div>
                                            </div>
                                
                                            <div className = "row">
                                                <div className = "col-4">
                                                    <div className="input-group">
                                                        <select className = "custom-select form-control" id = "drugname2" onChange = {this.handleDrug}>
                                                            {this.buildDrugs()}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className = "col-4">
                                                    <input type="text" className = "form-control" onChange={e=> this.setState({quantity: e.target.value})}/>
                                                </div>
                                                <div className = "col">
                                                    <select className = "custom-select form-control" id = "doctorname2" onChange = {this.handleDoctor}>
                                                        {this.buildDoctors()}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button className = "btn btn-warning btn-block mt-3 mb-3" onClick= {this.handleClick.bind(this)}>Submit</button>
                                    </form>
                                </div>
                            )}})()}
                </div>
            </div>
        )
    }
}

export default PrescriptForm
