import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import PrescriptForm from "./PrescriptForm"
import {Link, Router} from "react-router-dom";
import InlineEdit from 'react-edit-inline2';
import { PharmacistRepository } from '../../API/pharmacistRepository'


export class Prescription extends React.Component {

    username;

    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.dataChanged = this.dataChanged.bind(this);
    }

    state = {
    Prescriptionlist : [{
        title : "title1",
        name : "patient1",
        druglist : ["drug1", "drug2", "drug3"],
        unitlist : ["2","3","4"]
    },
    {
        title : "title2",
        name : "patient2",
        druglist : ["drug7", "drug8", "drug9"],
        unitlist : ["11","12","13"]
    },
    {
        title : "title3",
        name : "patient3",
        druglist : ["drug2", "drug3", "drug4"],
        unitlist : ["3","4","5"]
    }],
    CurrentOnchange: 'null'
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

    handleSave(type, index, i){
        let temparray = this.state.Prescriptionlist;
        if(type == "title"){
            temparray[index].title = this.state.CurrentOnchange;
        }
        else if(type == "name"){
            temparray[index].name = this.state.CurrentOnchange;
        }
        else if(type == "drugitem"){
            temparray[index].druglist[i] = this.state.CurrentOnchange;
        }
        else if(type == "unititem"){
            temparray[index].unitlist[i] = this.state.CurrentOnchange;
        }
        this.setState({Prescriptionlist:temparray})
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
                    <table  className ="table  bg-light  table-striped table-bordered">
                        <thead className = "thead-dark">
                            <tr>
                                <th>Title</th>
                                <th>Patient</th>
                                <th >Drug Name</th>
                                <th >Units</th>
                                <th >Setting</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Prescriptionlist.map((item,index) => (
                                <tr>
                                    <td>
                                        <InlineEdit
                                            activeClassName="editing"
                                            text={item.title}
                                            paramName="message"
                                            change={this.dataChanged}
                                            style={{
                                            minWidth: 150,
                                            display: 'inline-block',
                                            margin: 0,
                                            padding: 0,
                                            fontSize: 20,
                                            outline: 0,
                                            border: 0
                                            }}
                                        /><br/>
                                        <button className = "btn btn-warning mt-1" onClick = {() => this.handleSave("title",index,-1)}>Save</button>
                                    </td>
                                
                                    <td>
                                        <InlineEdit
                                            activeClassName="editing"
                                            text={item.name}
                                            paramName="message"
                                            change={this.dataChanged}
                                            style={{
                                            minWidth: 150,
                                            display: 'inline-block',
                                            margin: 0,
                                            padding: 0,
                                            fontSize: 20,
                                            outline: 0,
                                            border: 0
                                            }}
                                        /><br/>
                                        <button className = "btn btn-warning mt-1"  onClick = {() => this.handleSave("name",index,-1)}>Save</button>
                                    </td>


                                <td>
                                    <div>{
                                        item.druglist.map((drugitem, i) =>
                                            <li key = {i} style={{ listStyleType: "none" }}>
                                        <InlineEdit
                                            activeClassName="editing"
                                            text={drugitem}
                                            paramName="message"
                                            change={this.dataChanged}
                                            style={{
                                            minWidth: 150,
                                            display: 'inline-block',
                                            margin: 0,
                                            padding: 0,
                                            fontSize: 20,
                                            outline: 0,
                                            border: 0
                                            }}
                                        /><br/>
                                        <button className = "btn btn-warning mr-2 mt-1"  onClick = {() => this.handleSave("drugitem",index,i)}>Save</button>
                                                <button className = "btn btn-danger mt-1" onClick = {() => this.RemoveDrug(index,i)}>Delete</button>
                                            </li>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div>{
                                        item.unitlist.map((unititem, i) =>
                                        <li key = {i} style={{ listStyleType: "none" }}>
                                        <InlineEdit
                                            activeClassName="editing"
                                            text={unititem}
                                            paramName="message"
                                            change={this.dataChanged}
                                            style={{
                                            minWidth: 150,
                                            display: 'inline-block',
                                            margin: 0,
                                            padding: 0,
                                            fontSize: 20,
                                            outline: 0,
                                            border: 0
                                            }}
                                        /><br/>
                                        <button className = "btn btn-warning mt-1"   onClick = {() => this.handleSave("unititem",index,i)}>Save</button>
                                        </li>
                                        )}
                                    
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <form onSubmit = {this.handleSubmit}>
                                            <button className = "btn btn-info mb-3" onClick = {() => this.GoDuplicate(item) }>Duplicate</button> <br />
                                            <button className = "btn btn-danger" onClick = {() => this.GoDelete(index)}>Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            
                <div>
                    <PrescriptForm />
                    <Link to="/Pharmacist">
                        <button className = "btn btn-info mb-5 ml-5">Return to Homepage</button>
                    </Link> 
                </div> 
            </div>
            );
        }
    }