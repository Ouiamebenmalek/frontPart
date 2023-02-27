import { Component, useState } from "react";
import Axios from "axios"
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const initialState = {
  trainers: [],
  loading: true,
  error: false,
  name: "",
  pkmName: "",
  img: "",
  hp: "",
  atk: "",
  def: "",
  atkSpe: "",
  defSpe: "",
  speed: "",
  type: "",
  chosen: false,
  setShowAlert: false
};

export default class AddPokemon extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = initialState;
    this.searchPKM = this.searchPKM.bind(this);
    this.addPKM = this.addPKM.bind(this);
  }

  resetState() {
    this.setState(initialState);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("okokok")
    fetch("https://backendpokemon-production.up.railway.app/pokemons",
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          mode: 'no-cors',
        },
        body: JSON.stringify({
          name: this.state.pkmName,
          hp: this.state.hp,
          atk: this.state.atk,
          def: this.state.def,
          atkspe: this.state.atkSpe,
          defspe: this.state.defSpe,
          speed: this.state.speed,
          type: this.state.type,
          image: this.state.img,
        })
      }
    )
      .then(response => {
        if (response.ok) {
          this.setState({ initialState }, () => {
            console.log(this.state);
            return response.json();
          });

        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .catch(error => this.setState({ error }, () => {
        console.log(error)
      }));
  };

  async componentDidMount() {
  }

  handleChange(event) {
    var nm = event.target.name;
    var v = event.target.value;
    if (nm == "name") {
      this.setState({ name: v }, () => {
        console.log(this.state);
      });
    }
    else if (nm == "ability") {
      this.setState({ ability: v }, () => {
        console.log(this.state);
      });
    }
    else if (nm == "force") {
      this.setState({ force: v }, () => {
        console.log(this.state);
      });
    }
  };

  searchPKM() {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`).then((response) => {
      this.setState({
        pkmName: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        atk: response.data.stats[1].base_stat,
        def: response.data.stats[2].base_stat,
        atkSpe: response.data.stats[3].base_stat,
        defSpe: response.data.stats[4].base_stat,
        speed: response.data.stats[5].base_stat,
        type: response.data.types[0].type.name,
        chosen: true
      })
    })
  };

  addPKM = async function (e) {
    fetch("https://backendpokemon-production.up.railway.app/pokemons",
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          mode: 'no-cors',
        },
        body: JSON.stringify({
          name: this.state.pkmName,
          hp: this.state.hp,
          atk: this.state.atk,
          def: this.state.def,
          atkspe: this.state.atkSpe,
          defspe: this.state.defSpe,
          speed: this.state.speed,
          type: this.state.type,
          image: this.state.img,
        })
      })
      .then(response => {
        if (response.ok) {
          alert("PKM successfully added!");
          this.setState(initialState, () => {
            console.log(this.state);
            return response.json();
          });

        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .catch(error => this.setState({ error }, () => {
        console.log(error)
      }));
  }

  render() {
    const { trainers, loading, error } = this.state;
    return (
      <>
        <Alert key="info" variant="info"><h2>Add Pokemon</h2></Alert>

        <div className="container mt-5 mb-5 d-flex justify-content-center">
          <div className="row">
            <div className="col d-flex align-items-stretch">
              <div className="card px-1 py-4 h-100">
                <form className="card-body d-flex flex-column">
                  <h3 className="card-title text-center"></h3>
                  <input name="name" onChange={(event => this.setState({ name: event.target.value }))} className="form-control" type="text" placeholder="Name" defaultValue={this.state.name} />
                  <div className=" d-flex flex-column text-center px-5 mt-3 mb-3">
                    <small className="agree-text">{" "}</small>
                    <a href="#" className="terms">{" "}</a>
                  </div>
                  <button className="btn btn-info btn-block confirm-button mt-auto" type="button" onClick={this.searchPKM}>Search</button>
                </form>
              </div>


              <div className="card px-1 py-4 h-100">
                <form className="card-body d-flex flex-column">
                  <div className="Display"> {
                    !this.state.chosen ? (
                      <h6>No PKM chosen</h6>
                    ) : (
                      <>
                        <h4 className="text-center">{capitalizeFirstLetter(this.state.pkmName)}</h4>
                        <img src={this.state.img} className="rounded mx-auto d-block img-fluid" />
                        <h6 className="text-center">HP: {(this.state.hp)}</h6>
                        <h6 className="text-center">ATK: {(this.state.atk)}</h6>
                        <h6 className="text-center">DEF: {(this.state.def)}</h6>
                        <h6 className="text-center">SP. ATK: {(this.state.atkSpe)}</h6>
                        <h6 className="text-center">SP. DEF: {(this.state.defSpe)}</h6>
                        <h6 className="text-center">SPEED: {(this.state.speed)}</h6>
                        <h6 className="text-center">TYPE: {capitalizeFirstLetter(this.state.type)}</h6>
                      </>
                    )
                  }
                  </div>
                  <button className="btn btn-info btn-block confirm-button" type="button" onClick={this.addPKM}>Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
