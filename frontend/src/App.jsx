import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import { Login } from "./components/login"
import { Register } from "./components/login"
import { PharmManager } from "./components/pages"
import { Manufacturer } from './components/pages/manufacturer';
import { Pharmacist } from './components/pages/pharmacist';
import { IncomingOrder, OutgoingOrder, ReceivedOrder, Prescription } from './components/pharmacistComps';
import { PharmacistIn } from './components/pharmacistComps';
import { Doctor } from './components/pages/doctor';
import { ViewCart } from './components/pharmManagerComps/viewCart';
// cartFix declared but never used (in import below)
import { YourPharmacy, Inventory, Sales, CartInventory, ViewOrders } from './components/pharmManagerComps';
import { Mansales, Maninventory, Manorders, Manfinancial } from './components/manufacturerComps';
import { Docorders, Docinventory } from './components/doctorComps';
import { Footer } from './Footer';

class App extends React.Component {
  username;
    
  constructor(props) {
    super(props);
    this.username = localStorage['username']
    this.state = {
    }
  }
    
  render () {
    return (
      <div className = "background">
        <div className = "layer">
          <Router>
            <Switch>
              <Route exact path="/" ><Login /></Route>
              <Route exact path="/login" ><Login /></Route>
              <Route exact path="/register"><Register /></Route>
              <Route exact path="/pharmManager/"><Footer/><PharmManager /></Route>
              <Route exact path="/pharmManager/cart" ><Footer/><ViewCart /></Route>
              <Route exact path="/redirect"><cartFix /></Route>
              <Route exact path="/pharmManager/cart/inventory" ><Footer/><CartInventory /></Route>
              <Route exact path="/pharmManager/yourPharmacy" ><Footer/><YourPharmacy /></Route>
              <Route exact path="/pharmManager/inventory" ><Footer/><Inventory /></Route>
              <Route exact path="/pharmManager/orders" ><Footer/><ViewOrders /></Route>
              <Route exact path="/pharmManager/sales" ><Footer/><Sales /></Route>
              <Route exact path="/Manufacturer" ><Footer/><Manufacturer /></Route>
              <Route exact path="/Manufacturer/mansales" ><Footer/><Mansales /></Route>
              <Route exact path="/Manufacturer/maninventory" ><Footer/><Maninventory /></Route>
              <Route exact path="/Manufacturer/manorders" ><Footer/><Manorders /></Route>
              <Route exact path="/Manufacturer/manfinancial" ><Footer/><Manfinancial /></Route>
              <Route exact path="/pharmacist" ><Footer/><Pharmacist /></Route>
              <Route exact path="/pharmacist/IncomingOrder" ><Footer/><IncomingOrder /></Route>
              <Route exact path="/pharmacist/OutgoingOrder" ><Footer/><OutgoingOrder /></Route>
              <Route exact path="/pharmacist/ReceivedOrder" ><Footer/><ReceivedOrder /></Route>
              <Route exact path="/pharmacist/Prescription" ><Footer/><Prescription /></Route>
              <Route exact path="/pharmacist/PharmacistIn" ><Footer/><PharmacistIn /></Route>
              <Route exact path="/Doctor" ><Footer/><Doctor /></Route>
              <Route exact path="/doctor/docorders" ><Footer/><Docorders /></Route>
              <Route exact path="/doctor/docinventory" ><Footer/><Docinventory /></Route>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default App;