import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { PharmManagerRepository } from "../../API";

export class Inventory extends React.Component {

    pharmManagerRepository = new PharmManagerRepository();

    username; 
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    drugs  = [{
        "name": "Symbyzide Parodafinil",
        "sell_price": 6,
        "quantity": 10,
        "exp_date" : "2/5/20"
    },
    {
        "name": "Ibuprofen",
        "sell_price": 8,
        "quantity": 11,
        "exp_date" : "2/5/20"
    }]


    onSort(event, sortKey){
        const drugs = this.drugs;
        drugs.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({drugs})
      }

    render() {
        return (
           <div className = "body">
                <nav>
                    <div className = "img" id = "logo">
                            <img src={Logo} alt="Logo"/>
                    </div>
                    <h1 className = "yourCart">
                            Inventory                  
                    </h1>
                </nav>
                <div className = "itemsTable">
                    <table>
                        <tr>
                        <th><button type = "button" id = "expDate">Item Name</button></th>
                            <th><button type = "button" id = "expDate">Units</button></th>
                            <th><button type = "button" id = "expDate" onClick={e => this.onSort(e, "sell_price")}>Cost per Unit</button></th>
                            <th><button type = "button" id = "expDate">Expiration Date</button></th>
                        </tr>
                            {this.drugs.map(item => (
                                <tr>
                                  <td id = "item">{item.name}
                                  </td>
                                  <td id = "item">
                                      {item.quantity}
                                    </td>

                                    <td id = "item">${item.sell_price}</td>
                                    <td id = "item">{item.exp_date}</td>
                                </tr>
                            ))}
                    </table>
                </div>
                <Link to="/pharmManager">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>         
        );
    }

    componentDidMount() {
        this.pharmManagerRepository.getInventory()
            .then(drugs => this.setState({ drugs }));
    }
}
