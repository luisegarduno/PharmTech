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
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount(){
        this.manufacturerRepository.getInventory().then(Drug => this.setState({drugs : Drug.data}))
    }

    toggleExpired(item) {
        // this.manufacturerRepository.markExpired(item)
    }

    toggleSell(item) {
        // this.manufacturerRepository.markBuy(item)
    }

    formatDate(myDate){
        var d = myDate.substring(5,7) + "-" + myDate.substring(8,10) + "-" + myDate.substring(0,4);
        return d;
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
                        <tr class="headerFixed">
                            <th>Name</th>
                            <th>Made On</th>
                            <th>Acq From</th>
                            <th>Expired?</th>
                            <th>OK to Sell?</th>
                        </tr>
                        {this.state.drugs.map(item => (
                            <tr>
                                <td id="item">{item.name}</td>
                                <td id="item">{this.formatDate(item.fulfill_date)}</td>
                                <td id="item">{item.acqFrom}</td>
                                <td id="item">{item.expired}<form><button onClick = {this.toggleExpired(item)}>Flip Expired</button></form></td>
                                <td id="item">{item.okToBuy}<form><button onClick = {this.toggleSell(item)}>Flip Ok to Sell</button></form></td>
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