import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      pets: []
    };
    this.compareBy.bind(this);
    this.sortBy.bind(this);
  }
  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
  sortBy(key) {
    let arrayCopy = [...this.state.pets];
    arrayCopy.sort(this.compareBy(key));
    this.setState({pets: arrayCopy});
  }
  componentDidMount = () => {
    axios.get("/api/pets")
    .then( res => {
      this.setState({pets: res.data.pets});
    })
    .catch( err => {
      console.log(err);
    });
  }
  sortAscending = () => {
    const { petType } = this.state;
    petType.sort((a, b) => a - b)    
    this.setState({ petType })
  }

  render() {
    return (
      <> 
        <h1>Pet Shelter</h1>
        <h4>These pets are looking for a home!</h4>
        <Link to="/new">Add a pet to the shelter</Link>
        <button className="bigbutton" onClick={() => this.sortBy('petType')}>Sort</button>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
            {
              this.state.pets.map( pet => 
                <tr key={pet._id}>
                  <td>{pet.name}</td>
                  <td>{pet.petType}</td>
                  <td><Link to={`/pet/${pet._id}`}>Details</Link>&nbsp;&nbsp;&nbsp;<Link to={`/edit/${pet._id}`}>Edit</Link></td>
                </tr>)
            }
          </tbody>
        </table>
      </>
    )
  }
}

export default List