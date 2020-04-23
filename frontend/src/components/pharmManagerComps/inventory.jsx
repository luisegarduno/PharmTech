import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { PharmManagerRepository } from "../../API";
import _ from 'lodash';

export class Inventory extends React.Component {

    pharmManagerRepository = new PharmManagerRepository();

    username; 
    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            sortDirection : 'desc',
            drugs : [{
                "id" : 1,
                "name": "Symbyzide Parodafinil",
                "sell_price": 6,
                "quantity": 10,
                "exp_date" : "2021-5-20"
            },
            {
                "id" : 2,
                "name": "Ibuprofen",
                "sell_price": 8,
                "quantity": 11,
                "exp_date" : "2021-5-19"
            },
            {
                "id" : 3,
                "name": "test",
                "sell_price": 12,
                "quantity": 10,
                "exp_date" : "2019-10-5"
            },
            ]
        }
    }


    sortBy(field) {        
        if (this.state.sortDirection == 'asc') {
            this.setState({sortDirection: 'desc'})
            this.setState({ 
                drugs: _.orderBy(this.state.drugs, field, this.state.sortDirection) 
            });
        }
        if (this.state.sortDirection == 'desc') {
            this.setState({sortDirection: 'asc'})
            this.setState({ 
                drugs: _.orderBy(this.state.drugs, field, this.state.sortDirection) 
            });
        }
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
                        <th><button type = "button" id = "expDate" onClick={this.sortBy.bind(this, 'name')}>Item Name</button></th>
                            <th><button type = "button" id = "expDate" onClick={this.sortBy.bind(this, 'quantity')}>Units</button></th>
                            <th><button type = "button" id = "expDate" onClick={this.sortBy.bind(this, 'sell_price')}>Cost per Unit</button></th>
                            <th><button type = "button" id = "expDate" onClick={this.sortBy.bind(this, 'exp_date')}>Expiration Date</button></th>
                        </tr>
                            {this.state.drugs.map(item => (
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

    // componentDidMount() {
    //     this.pharmManagerRepository.getInventory()
    //         .then(drugs => this.setState({ drugs }));
    // }
}
