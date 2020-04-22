import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { PharmManagerRepository } from "../../API";
import CartService from "./cartService";

export class CartInventory extends React.Component {

    cartService = new CartService();

    pharmManagerRepository = new PharmManagerRepository();

    username; 
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    drugs = [{
        "id" : 1,
        "name": "Symbyzide Parodafinil",
        "cost": 6,
        "units": 10,
        "expire" : "2/5/20"
    },
    {
        "id" : 2,
        "name": "Ibuprofen",
        "cost": 8,
        "units": 11,
        "expire" : "2/5/20"
    },
    ]

    onSubmit(itemName) {
            this.pharmManagerRepository
            .addCartItem(itemName)
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
                            <th>Item</th>
                            <th>Cost Per Unit</th>
                        </tr>
                            {this.drugs.map(item => (
                                <tr key = {item.id}>
                                  <td id = "item">{item.name}
                                  <Link to="/pharmManager/cart"><button type = "button" id = "swap" onClick = {e => this.cartService.addToCart(item)}>Select</button></Link>
                                  </td>
                                    <td id = "item">${item.cost}</td>
                                </tr>
                            ))}
                    </table>
                </div>
                <Link to="/pharmManager/cart">
                    <button className = "return" id = "viewInventory">View Cart</button>
                    </Link> 
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
