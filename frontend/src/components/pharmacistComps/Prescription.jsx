import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import PrescriptForm from "./PrescriptForm"
import {Link} from "react-router-dom";
import { PharmacistRepository } from '../../API/pharmacistRepository'


export class Prescription extends React.Component {

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    a = "hello"
    Prescriptionlist = [{
        title : "title1",
        name : "patient1",
        druglist : ["drug1", "drug2", "drug3"],
        unitlist : [2,3,4]
    },
    {
        title : "title2",
        name : "patient2",
        druglist : ["drug2", "drug3", "drug4"],
        unitlist : [3,4,5]
    }]

    GoDuplicate(item, index){

    }

    GoDelete(index){

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

                <div>
                    <h2>Prescription List</h2>
                </div>

                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Patient</th>
                            <th>Drug Name</th>
                            <th>Units</th>
                            <th></th>
                        </tr>

                        {this.Prescriptionlist.map((item,index) => (
                            <tr>
                                <td id = "item">{item.title}</td>
                                <td id = "item">{item.name}</td>
                                <td id = "item">
                                    <div>{
                                        item.druglist.map((drugitem, i) =>
                                            <li key = {i} style={{ listStyleType: "none" }}>{drugitem}</li>
                                        )}
                                    </div>
                                </td>
                                <td id = "item">
                                    <div>{
                                        item.unitlist.map((unititem, i) =>
                                        <li key = {i} style={{ listStyleType: "none" }}>{unititem}</li>
                                        )}
                                    </div>
                                </td>
                                <td id = "item">
                                    <div>
                                        <form>
                                            <button onClick = {this.GoDuplicate(item,index) }>Duplicate</button> <br />
                                            <button>Edit</button> <br />
                                            <button onClick = {this.GoDelete(index)}>Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            
                <div>
                    <PrescriptForm />
                    <Link to="/Pharmacist">
                        <button className = "return">Return to Homepage</button>
                    </Link> 
                </div> 
            </div>
            );
        }
    }