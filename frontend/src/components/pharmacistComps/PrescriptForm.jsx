import React from "react";
import {PrescriptionItem} from './jsitem/prescriptionitem'



class PrescriptForm extends React.Component {

    state = {
        title : "",
        patient_id : "",
        drug_id : "",
        create_date : "",
        doctor_id : "",
        quantity : 0,
    }

    handleSubmit = (e) => {                            
        e.preventDefault();
        e.target.reset();
    }

    handleClick = () =>{
        var date= new Date();
        var time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        this.props.Onchange(new PrescriptionItem(this.state.title, this.state.patient_id, this.state.drug_id, this.state.quantity, time, this.state.doctor_id));
    }

    render(){
        return(
            <div className = "container" style = {{width : "60%"}}>
                <div className = "card bg-light">
                    <div className = "card-header bg-secondary text-white">
                        <h3>Add Prescription</h3>
                    </div>

                    <div className = "card-body">
                        <form  onSubmit={this.handleSubmit.bind(this)}>
                            <div className = "form-group">
                                <div className = "row">
                                    <div className = "col-6">
                                        <label htmlFor = "newpatient">Patient ID</label>
                                    </div>
                                    <div className = "col-6">
                                        <label htmlFor = "newtitle">Title</label>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className = "col-6">
                                        <input type="text" className = "form-control" id="newpatient" onChange={e=> this.setState({patient_id: e.target.value})}/>
                                    </div>
                                    <div className = "col-6">
                                        <input type="text" className = "form-control" id="newtitle" onChange={e=> this.setState({title: e.target.value})}/>
                                    </div>
                                </div>                      
                            </div>

                            <div className = "form-group">
                                <div className = "row">
                                    <div className = "col-4">
                                        <label htmlFor = "newdrugs">Drug ID</label>
                                    </div>
                                    <div className = "col-4">
                                        <label htmlFor = "newunits">Quantity</label>
                                    </div>
                                    <div className = "col">
                                        <label htmlFor = "newdoctor">Doctor ID</label>
                                    </div>
                                </div>
                                
                                <div className = "row">
                                    <div className = "col-4">
                                        <div className="input-group">
                                            <input type="text" className = "form-control" onChange={e=> this.setState({drug_id: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className = "col-4">
                                        <input type="text" className = "form-control" onChange={e=> this.setState({quantity: e.target.value})}/>
                                    </div>
                                    <div className = "col">
                                        <input type="text" className = "form-control"onChange={e=> this.setState({doctor_id: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                            <button className = "btn btn-warning btn-block mt-3 mb-3" onClick= {this.handleClick.bind(this)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrescriptForm
