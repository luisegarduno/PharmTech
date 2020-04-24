import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { PharmacistRepository } from '../../API/pharmacistRepository'


export class PharmacistIn extends React.Component {

    username;
    pharmacistRepository = new PharmacistRepository();
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            drugs:[],
        }
    }


    componentDidMount(){
        this.pharmacistRepository.getInventory()
            .then(Drug => this.setState({drugs : Drug.data}))
    }


    colorforunit(quantity){
        var color = '';
        if(quantity === 0){
            color = 'red'
        }
        else if(quantity > 0 && quantity <= 500){
            color = 'blue'
        }
        else if(quantity > 500 && quantity <= 1000){
            color = 'yellow'
        }
        else if (quantity > 1000 && quantity <= 5000){
            color = 'green'
        }
        else if (quantity > 5000 && quantity <= 8000){
            color = 'orange'
        }
        else {
            color = 'purple'
        }
        return color
    }

    render(){
        return (
            <div className = "body mb-4">
                <div className = "navBar">
                    <nav>
                        <div className = "img">
                            <img src={Logo} />
                        </div>
                    </nav>
                </div>

                <div className = "bg-secondary pb-2 mb-4 pt-1 mt-2">
                    <h2>Inventory</h2>
                </div>
                
                <div className = "container">
                    <table  className = "table">
                        <thead>
                            <tr className = "bg-secondary">
                                <th>Batch_id</th>
                                <th>Drug_id</th>
                                <th>Expire_Date</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.drugs.map(item => (
                                <tr className = " bg-light" key = {item.batch_id}>
                                    <td>{item.batch_id}</td>
                                    <td>{item.drug_id}</td>
                                    <td>{item.exp_date}</td>
                                    <td bgcolor = {this.colorforunit(item.quantity)} >{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
                    <div className = "card bg-light mb-4">
                        <div className = "card-header bg-secondary text-white">
                            <h3 >Edit Inventory</h3>
                        </div>
                        <div className = "card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="newdrugname">Drug Name</label>
                                    <input type="text" id="durgname" className = "form-control"/>
                                </div>

                                <div className ="form-group">
                                    <label htmlFor="newdrugunit">Unit</label>
                                    <input type="number" id="drugamount" min="0" className = "form-control" placeholder = "0"></input>
                                </div>
                    
                                <div className = "form-group">
                                    <label htmlFor="newdrugoption">Option</label>
                                    <select className = "custom-select">
                                        <option defaultValue> </option>
                                        <option value = "add">Add Drug</option>
                                        <option value = "remove">Remove Drug</option>
                                        <option value = "request">request Drug</option>
                                    </select>                       
                                </div>
                                <button className = "btn btn-info form-control" >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

                <footer>
                    <Link to="/Pharmacist">
                        <button className = "return">Return to Homepage</button>
                    </Link> 
                </footer>
            </div>
        );
    }
}
