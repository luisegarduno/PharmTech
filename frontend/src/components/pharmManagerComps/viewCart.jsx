import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import {Link} from "react-router-dom";
import { PharmManagerRepository } from "../../API";
import CartService from "./cartService";
import _ from 'lodash';


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
        this.onDelete = this.onDelete.bind(this);
        this.findQuantity = this.findQuantity.bind(this);
        this.submitOrder = this.submitOrder.bind(this)
    }

    findQuantity(e, i) {
        var newCart = this.state.cart
        var quantity = parseInt(e.target.value)
        newCart.items[i].quantity = quantity;
        newCart.items[i].sell_price = quantity * newCart.items[i].sell_price
        newCart.total = newCart.items.map(x => x.sell_price).reduce((x, y) => x + y);
        this.setState({cart: newCart})
    }

    onDelete(i) {
        var newCart = this.state.cart
        newCart.items.splice(i, 1)
        if(newCart.items.length === 0) {
            newCart.total = 0;
        }
        else {
            newCart.total = newCart.items.map(x => x.sell_price).reduce((x, y) => x + y);
        }
        this.setState({cart: newCart})
    }

    submitOrder() {
        var newCart = this.state.cart
        newCart.items.splice(0, newCart.items.length)
        newCart.total = 0;
        this.setState({cart: newCart})
        alert("Thank you for your order!")
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
                        <tbody>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                            {this.state.cart.items.map((item, index) => (
                                <tr key = {item.product.id} value={item}>
                                  <td id = "item">{item.product.name}
                                  <Link to="cart/inventory"><button type = "button" id = "swap" onClick={ () => this.onDelete(index) }>Swap</button></Link>
                                  </td>
                                  <td id = "item">
                                <select id = "quantity" placeholder={item.quantity} onChange={(e) => {this.findQuantity(e, index)}}>
                                    <option value = "default" selected disabled>{item.quantity}</option>
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

                                    <td id = "item">${item.sell_price}</td>
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
                                    <button type = "button" className = "placeOrder" onClick={ () => this.submitOrder() }>Place Order</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Link to="/pharmManager">
                    <button className = "return">Return to Homepage</button>
                    </Link> 
           </div>
        );
    }
}
