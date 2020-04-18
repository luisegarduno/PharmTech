import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { PharmacistRepository } from '../../API/pharmacistRepository'


export class IncomingOrder extends React.Component {

    username;
    pharmacistRepository = new PharmacistRepository();

    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state ={
            orders:[]
        }
    }


    
    componentDidMount(){
        this.pharmacistRepository.getIncoming()
            .then(Order => this.setState({orders : Order.data}))
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
                    <h2>Incoming Order List</h2>
            </div>

            <div className = "container">
                    <table  className = "table">
                        <thead>
                            <tr className = "bg-secondary">
                                <th>Drug_id</th>
                                <th>Docter_id</th>
                                <th>Create_Date</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.orders.map(item => (
                                <tr className = " bg-light" key = {item.id}>
                                    <td>{item.drug_id}</td>
                                    <td>{item.doctor_id}</td>
                                    <td>{item.create_date}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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