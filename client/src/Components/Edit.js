import React, { Component } from 'react'
import axios from 'axios';


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: {
        name: "",
        petType: "",
        description: "",
        skill1: "",
        skill2: "",
        skill3: ""
      },
      errors: {}
    }
}
componentDidMount = () => {
    console.log(this.props.match.params._id);
    axios.get(`http://localhost:8000/api/pets/${this.props.match.params._id}`)
        .then( res => {
            this.setState({pet: res.data.pet});
        })
        .catch( err => {
            console.log(err);
            
        });
}

  change = (key, e) => {
    let p = {...this.state.pet};
    p[key] = e.target.value;
    this.setState({pet: p});
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

  updatePet = (e) => {
    e.preventDefault();
    axios.put(`/api/pets/${this.state.pet._id}`, this.state.pet)
      .then( res => {
        if(res.data.errors){
          this.setState({errors: res.data.errors.errors})
        } else {
          this.props.history.push(`/pet/${this.state.pet._id}`);
        }
      });
  }


  render() {
    return (
      <>
      <h1>Pet Shelter</h1>
      <h3>Edit this pet</h3>
      <form onSubmit={this.updatePet}>
        <div className="form-group">
          <label>Pet name:</label><br></br>
          <input type="text" onChange={this.change.bind(this, "name")} value={this.state.pet.name} />
          {
            this.state.errors.name ?
            <p className="valerr">{this.state.errors.name.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Pet type:</label><br></br>
          <input type="text" onChange={this.change.bind(this, "petType")} value={this.state.pet.petType}/>
          {
            this.state.errors.petType ?
            <p className="valerr">{this.state.errors.petType.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Pet description:</label><br></br>
          <input type="text" onChange={this.change.bind(this, "description")} value={this.state.pet.description}/>
          {
            this.state.errors.description ?
            <p className="valerr">{this.state.errors.description.message}</p>:
            ""
          }
        </div>
        <>
        <h4>Skills:</h4>
        </>
        <div className="form-group">
          <label>Skill 1</label>
          <input type="text" onChange={this.change.bind(this, "skill1")} value={this.state.pet.skill1} />
        </div>

        <div className="form-group">
          <label>Skill 2</label>
          <input type="text" onChange={this.change.bind(this, "skill2")} value={this.state.pet.skill2}/>
        </div>

        <div className="form-group">
          <label>Skill 3</label>
          <input type="text" onChange={this.change.bind(this, "skill3")} value={this.state.pet.skill3}/>
        </div>

        <input type="submit" className="submit" value="Update" />
      
      </form>
      <button onClick={this.cancel}>Cancel</button>
      </>

    )
  }
}

export default Edit