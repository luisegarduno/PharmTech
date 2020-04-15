import React from "react";
import Logo from "./erpharmtechgrayer.png";
import {Link} from "react-router-dom";

export class Prescription extends React.Component {

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }


    Prescriptionlist = [{
        name : "patient1",
        druglist : ["drug1", "drug2", "drug3"],
        unitlist : [2,3,4]
    },
    {
        name : "patient2",
        druglist : ["drug2", "drug3", "drug4"],
        unitlist : [3,4,5]
    }]

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
                            <th>User</th>
                            <th>Drug Name</th>
                            <th>Units</th>
                        </tr>
                        {this.Prescriptionlist.map(item => (
                            <tr>
                                <td id = "item">{item.name}</td>

                                <td id = "item">
                                    <div>{
                                            item.druglist.map((drugitem) =>
                                                <li style={{ listStyleType: "none" }}>{drugitem}</li>
                                            )
                                        }
                                    </div>
                                </td>

                                <td id = "item">
                                    <div>{
                                        item.unitlist.map((unititem) =>
                                            <li style={{ listStyleType: "none" }}>{unititem}</li>
                                            )
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>

           <div>
                <Link to="/Pharmacist">
                    <button className = "return">Return to Homepage</button>
                </Link> 
            </div> 
           </div>
        );
    }
}