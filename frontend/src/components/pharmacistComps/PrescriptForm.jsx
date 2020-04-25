import React from "react";



class PrescriptForm extends React.Component {

    state = {
        title : "",
        patient : "",
        drugs : [],
        upper : [],
    }

    savedrugs() {
        var drugs = [...this.state.drugs];
        var combine = {name: this.newText1.value, unit: this.newText2.value}
        drugs.push(combine);
        this.setState({drugs});
    }



    handleAddDrug = (e) => {                            
        e.preventDefault();
        e.target.reset();
        this.setState({upper : this.state.drugs})

    }

    handleSubmit = (e) => {                            
        e.preventDefault();
        e.target.reset();
        this.setState({drugs : []})
    }

    render(){
        return(
            <div className = "container" style = {{width : "60%"}}>
                <div className = "card bg-light">
                    <div className = "card-header bg-secondary text-white">
                        <h3>Edit Prescription</h3>
                    </div>
                    <div className = "card-body">
                        <form  onSubmit={this.handleAddDrug.bind(this)}>
                            <div className = "form-group">
                                <div className = "row">
                                    <div className = "col-6">
                                        <label htmlFor = "newdrugs">Drugs</label>
                                    </div>
                                    <div className = "col-6">
                                        <label htmlFor = "newunits">Quantity</label>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className = "col-6">
                                        <div className="input-group">
                                            <input type="text" className = "form-control" ref={(ip) => {this.newText1 = ip}}/>
                                        </div>
                                    </div>
                                    <div className = "col-6">
                                        <input type="number" className = "form-control" ref={(ap) => {this.newText2 = ap}}/>
                                    </div>
                                </div>
                                <button className = "btn btn-info btn-block mt-3" onClick={this.savedrugs.bind(this)}>Add Drug</button>
                            </div>
                        </form>

                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className = "form-group">
                                <ul className="list-group mt-3">
                                    {
                                        this.state.drugs.map(function(drug, i) {
                                        return( <li className="list-group-item" key = {i}>{drug.name} with quantity {drug.unit}</li>)
                                    })}
                                </ul>
                                <div className = "row">
                                    <div className = "col-6">
                                        <label htmlFor = "newpatient">Patient</label>
                                    </div>
                                    <div className = "col-6">
                                        <label htmlFor = "newtitle">Title</label>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className = "col-6">
                                        <input type="text" className = "form-control" id="newpatient"/>
                                    </div>
                                    <div className = "col-6">
                                        <input type="text" className = "form-control" id="newtitle"/>
                                    </div>
                                </div>                      
                                <button className = "btn btn-warning btn-block mt-3 mb-3">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrescriptForm
