import React from 'react'

export class PinventSearch extends React.Component {
    state ={
        id: 0
    }

    render(){
        return (
            <div className = "conatiner mb-5">
                <label htmlFor = "search_id" className = "mt-2 mr-1"><h5>Search Drug By Id: </h5></label>
                <div className = "input-group">
                    <input type="text" id = "search_id" className = "form-control" onChange={e=> this.setState({id: e.target.value})} />
                    <button type = "button" className = "btn btn-info ml-1" onClick={() => this.props.onSearch(this.state.id)}>Search</button>
                </div>
            </div>
        )
    }
}