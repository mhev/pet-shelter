import React, { Component } from 'react'
import axios from 'axios';

export class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pet: {},
            count: 0,
            show: true,
            disabled: false
        };
    }
    handleClick = (event) => {
        alert(`You liked ${this.state.pet.name}`);
        if (this.state.disabled) {
            return;
        }
        this.setState({disabled: true});
        this.setState({count: +1})
    }
    componentDidMount = () => {
        axios.get(`/api/pets/${this.props.match.params._id}`)
            .then( res => {
                this.setState({pet: res.data.pet});
            })
            .catch( err => {
                console.log(err);
                
            });
    }
    delete = (_id) => {
        alert(`Congratulations! You have adopted ${this.state.pet.name}`);
        axios.delete(`/api/pets/${this.props.match.params._id}`)
            .then( res => {
                this.props.history.push("/pets");
            })
      }
    cancel = (e) => {
    axios.get("/api/pets")
    .then( res => {
        this.props.history.push("/pets");
        console.log(res);
        this.setState({pets: res.data.pets});
    })
    .catch( err => {
        console.log(err);
    });

    }

    
    render() {
        return (
            <>
            <h1 className="homelink">Pet Shelter</h1><button className="homelink" onClick={this.cancel}>Home</button>
                <div key={this.state.pet._id} className="pet">
                    <h3 className ="bold">Details about {this.state.pet.name}</h3><br></br>
                    <h3><span className ="bold">Pet type:</span> {this.state.pet.petType}</h3>
                    <h3><span className ="bold">Description:</span> {this.state.pet.description}</h3>
                    <h3><span className ="bold">Skills:</span> <ul><li>{this.state.pet.skill1}</li><br></br>
                                <li>{this.state.pet.skill2}</li><br></br>
                                <li>{this.state.pet.skill3}</li>
                                </ul>
                                </h3>
                    <h3><span className ="bold">Likes: {this.state.count}</span></h3>
                    <button onClick={this.handleClick} disabled={this.state.disabled}>Like this pet</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.delete}>Adopt this pet!</button>
                </div>
            </>
        )
    }
}

export default Details