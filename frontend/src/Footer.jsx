import React from "react";
import './App.css';
import {Link} from "react-router-dom";

export class Footer extends React.Component {
        render() {
            return (
                <div className="foot">
                    <Link to ="/" className = "footText">Log Out</Link>
                </div>
            )
        }
}
