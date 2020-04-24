import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { PharmManagerRepository } from "../../API";
import CartService from "./cartService";


export class ViewCart extends React.Component {

    cartService = new CartService();
    pharmManagerRepository = new PharmManagerRepository();
    username;


    constructor(props) {
        super(props);
        this.username = localStorage['username']
        this.state = {
            cart: this.cartService.getCart(),
            total: 0,
            drugs: [{
                "name": "Symbyzide Parodafinil",
                "cost": 6,
                "quantity": 1
            },
            {
                "name": "Ibuprofen",
                "cost": 8,
                "quantity": 1
            },
            ]
        }
    }


    onDelete(i) {
        var index = ID
        if (index !== -1) {
          this.setState({cart: this.state.cart.splice(index, 1)});
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
                        Your Cart
                </h1>
                </nav>
                <div className = "itemsTable">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                            {this.state.cart.items.map((item, index) => (
                                <tr key = {item.product.id} value={item}>
                                  <td id = "item">{item.product.name}
                                  <Link to="cart/inventory"><button type = "button" id = "swap">Swap</button></Link>
                                  </td>
                                  <td id = "item">
                                <select id = "quantity">
                                    <option value = "1">1</option>
                                    <option value = "2">2</option>
                                    <option value = "3">3</option>
                                    <option value = "4">4</option>
                                    <option value = "5">5</option>
                                    <option value = "6">6</option>
                                    <option value = "7">7</option>
                                    <option value = "8">8</option>
                                    <option value = "9">9</option>
                                </select>
                                    <button type = "button" id = "delete" onClick={ () => this.onDelete(index) }>Delete</button>
                                    </td>

                                    <td id = "item">${item.cost}</td>
                                </tr>
                            ))}
                        <tr className = "lastRow">
                            <td>
                                <div className = "extraButtons">
                                <Link to="cart/inventory"><button type = "button" id = "addItems">Add Items</button></Link>
                                </div>
                            </td>
                            <td colSpan = "2"> 
                            <h3 id = "total">Total: ${this.state.cart.total}</h3> <br/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan = "3">
                                <div className = "extraButtons">
                                    <button type = "button" className = "placeOrder">Place Order</button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <Link to="/pharmManager">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}
