import React, { Component } from 'react'
import axios from 'axios';


class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPet: {
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

  change = (key, e) => {
    let p = {...this.state.newPet};
    p[key] = e.target.value;
    this.setState({newPet: p});
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

  makePet = (e) => {
    e.preventDefault();
    axios.post("/api/pets", this.state.newPet)
      .then( res => {
        if(res.data.errors){
          this.setState({errors: res.data.errors.errors})
        } else {
          this.props.history.push("/pets");
        }
      });
  }


  render() {
    return (
      <>
      <h1>Pet Shelter</h1>
      <h3>Know of a pet needing a home?</h3>
      <form onSubmit={this.makePet}>
        <div className="form-group">
          <label>Pet name:</label><br></br>
          <input type="text" onChange={this.change.bind(this, "name")} />
          {
            this.state.errors.name ?
            <p className="valerr">{this.state.errors.name.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Pet type:</label><br></br>
          <input type="text" onChange={this.change.bind(this, "petType")} />
          {
            this.state.errors.petType ?
            <p className="valerr">{this.state.errors.petType.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Pet description:</label><br></br>
          <input type="text" onChange={this.change.bind(this, "description")} />
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
          <input type="text" onChange={this.change.bind(this, "skill1")} />
        </div>

        <div className="form-group">
          <label>Skill 2</label>
          <input type="text" onChange={this.change.bind(this, "skill2")} />
        </div>

        <div className="form-group">
          <label>Skill 3</label>
          <input type="text" onChange={this.change.bind(this, "skill3")} />
        </div>

        <input type="submit" className="submit" />
      
      </form>
      
      <button className="submit" onClick={this.cancel}>Cancel</button>
      </>

    )
  }
}

export default New