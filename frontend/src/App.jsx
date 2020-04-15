import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { Login } from "./components/login"
import { Register } from "./components/login"
import { PharmManager } from "./components/pages"
import { Manufacturer } from './components/pages/manufacturer';
import { Pharmacist } from './components/pages/pharmacist';
import { IncomingOrder, OutgoingOrder, ReceivedOrder, Prescription } from './components/pharmacistComps';
import { PharmacistIn } from './components/pharmacistComps';
import { Doctor } from './components/pages/doctor';
import { ViewCart } from './components/pharmManagerComps/viewCart';
import { YourPharmacy, Inventory, Sales, Request, CartInventory } from './components/pharmManagerComps';
import { Mansales, Maninventory, Manorders, Manfinancial } from './components/manufacturerComps';
import { Docorders, Docinventory } from './components/doctorComps';


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
        <Router>
          <Switch>
            <Route exact path="/" ><Login /></Route>
            <Route exact path="/login" ><Login /></Route>
            <Route exact path="/register"><Register /></Route>
            <Route exact path="/pharmManager/"><PharmManager /></Route>
                <Route exact path="/pharmManager/cart" ><ViewCart /></Route>
                  <Route exact path="/pharmManager/cart/inventory" ><CartInventory /></Route>
                <Route exact path="/pharmManager/yourPharmacy" ><YourPharmacy /></Route>
                <Route exact path="/pharmManager/inventory" ><Inventory /></Route>
                <Route exact path="/pharmManager/sales" ><Sales /></Route>
                <Route exact path="/pharmManager/request" ><Request /></Route>
            <Route exact path="/Manufacturer" ><Manufacturer /></Route>
                <Route exact path="/Manufacturer/mansales" ><Mansales /></Route>
                <Route exact path="/Manufacturer/maninventory" ><Maninventory /></Route>
                <Route exact path="/Manufacturer/manorders" ><Manorders /></Route>
                <Route exact path="/Manufacturer/manfinancial" ><Manfinancial /></Route>
            <Route exact path="/pharmacist" ><Pharmacist /></Route>
                <Route exact path="/pharmacist/IncomingOrder" ><IncomingOrder /></Route>
                <Route exact path="/pharmacist/OutgoingOrder" ><OutgoingOrder /></Route>
                <Route exact path="/pharmacist/ReceivedOrder" ><ReceivedOrder /></Route>
                <Route exact path="/pharmacist/Prescription" ><Prescription /></Route>
                <Route exact path="/pharmacist/PharmacistIn" ><PharmacistIn /></Route>

            <Route exact path="/Doctor" ><Doctor /></Route>
                <Route exact path="/doctor/docorders" ><Docorders /></Route>
                <Route exact path="/doctor/docinventory" ><Docinventory /></Route>
          </Switch>
        </Router>
      )
    }
}

export default App;
