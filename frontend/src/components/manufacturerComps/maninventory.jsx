import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { ManufacturerRepository } from "../../API";

export class Maninventory extends React.Component {

    manufacturerRepository = new ManufacturerRepository();

    username;

    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            drugs:[],
        }
    }

    componentDidMount(){
        this.manufacturerRepository.getInventory()
            .then(Drug => this.setState({drugs : Drug.data}))
    }

    toggleExpired(item) {
        // this.manufacturerRepository.markExpired(item)
    }

    toggleBuy(item) {
        // this.manufacturerRepository.markBuy(item)
    }

    render() {
        return (
           <div className = "body">
            <nav>
                <div className = "img" id = "logo">
                        <img src={Logo} alt="Logo" />
                </div>
                <h1 className = "yourCart">
                        Inventory
                </h1>
            </nav>
            <h1 className = "tableHeader">All Inventory</h1>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Made On</th>
                            <th>Expires</th>
                            <th>Acq From</th>
                            <th>Expired?</th>
                            <th>OK to Buy?</th>
                        </tr>
                        {this.state.drugs.map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{item.madeOn}</td>
                                <td id="item">{item.exp_date}</td>
                                <td id="item">{item.acqFrom}</td>
                                <td id="item">{item.expired}<form><button onClick = {this.toggleExpired(item)}>Flip Expired</button></form></td>
                                <td id="item">{item.okToBuy}<form><button onClick = {this.toggleBuy(item)}>Flip Ok to Buy</button></form></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <Link to="/manufacturer">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}