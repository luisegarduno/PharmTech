import React from "react";
import Logo from "../../images/erpharmtechgrayer.png";
import Cart from "../../images/cart.png";
import { Link } from "react-router-dom";

export class PharmManager extends React.Component {

    username;
    
    constructor(props) {
        super(props);
        this.username = localStorage['username']
    }

    render() {
        return (
            <div className = "body">
                <div className = "navBar">
                    <nav>
                        <div className = "img" id = "logo">
                            <img src={Logo} alt="Logo"/>
                        </div>
                        <h1 className = "welcome">
                            Welcome back {this.username}!
                        </h1>
                        <Link to="/pharmManager/cart">
                            <button id = "cart" type="button">
                                View Cart
                                <img src={Cart} alt="Cart" id = "cartImg"/>
                            </button>
                        </Link> 
                    </nav>
               </div>

               <div className = "menu">
                    <Link to ="/pharmManager/inventory"><button type = "button" id = "menuButton">View<br/>Inventory</button></Link>
                    <Link to ="/pharmManager/sales"><button type = "button" id = "menuButton">View<br/>Sales</button></Link>  
                    <Link to ="/pharmManager/orders"><button type = "button" id = "menuButton">View<br />Orders</button></Link>             
                </div>
           </div>
        );
    }
}