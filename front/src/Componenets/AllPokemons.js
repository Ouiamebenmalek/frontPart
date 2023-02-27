import { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "./../Comps/Pagination";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
export default class AllPokemons extends Component {
  state = {
    pokemons: [],
    loading: true,
    error: false,
    search: ""
  };
  async componentDidMount() {
    try {
      const response = await fetch("https://backendpokemon-production.up.railway.app/pokemons");
      const json = await response.json();
      this.setState(
        {
          pokemons: json,
          loading: false,
        },
        () => {
          console.log(json);
        }
      );
    } catch (error) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  Search() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        try {
          const response = await fetch(
            "https://backendpokemon-production.up.railway.app/" + this.state.search,
            { method: "GET" }
          );
          const json = await response.json();
          this.setState(
            {
              pokemons: json,
              loading: false,
            },
            () => {}
          );
        } catch (error) {
          this.setState({
            loading: false,
            error: true,
          });
        }
      }
    );
  }

  async handleClickDelete(id) { 
    this.setState({
      loading: true,

    },async ()=> {   try {
      const response = await fetch('https://backendpokemon-production.up.railway.app/pokemons/'+id, { method: 'DELETE' });
      const json = await response.json();
      this.setState({
        pokemons: json,
        loading: false,

       }, () => {
        console.log(json);
 
      })
    } catch (error) {
      this.setState({
        loading: false,
        error: true
      })
    }})
 
  
  }



  render() {
    const { pokemons, loading, error } = this.state;
    return (
      <div>
        <Alert key="info" variant="info">
          {" "}
          <h2> All Pokemons </h2>{" "}
        </Alert>

        <Navbar bg="light" expand="lg">
          <Container fluid>
            {loading ? null : (
              <Navbar.Brand href="#">nombre : {pokemons.length}</Navbar.Brand>
            )}
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                {" "}
              </Nav>
              <Form className="d-flex">
                {" "}
                <Form.Control
                  placeholder="Search"
                  value={this.state.search}
                  onChange={(e) => {
                    this.setState({ search: e.target.value }, () => {});
                  }}
                  type="search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button
                  onClick={this.Search.bind(this)}
                  variant="outline-success"
                >
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="container mt-5">
            {!loading && !error ? (
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th> Name</th>

                    <th>Hit Points</th>
                    <th>Attack</th>
                    <th>Defense</th>
                    <th>Special Attack</th>
                    <th>Special Defense</th>
                    <th>Speed</th>
                    <th>Type</th>
                    <th>Image</th>

                    <th> ######</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemons.map((pokemon) => (
                    <tr key={pokemon.id}>
                      <td> {pokemon.id}</td>

                      <td>{pokemon.name}</td>
                      <td>{pokemon.hp}</td>
                      <td>{pokemon.atk}</td>
                      <td>{pokemon.def}</td>
                      <td>{pokemon.atkspe}</td>
                      <td>{pokemon.defspe}</td>
                      <td>{pokemon.speed}</td>
                      <td>{pokemon.type}</td>
                      <td>
                        <div>
                          <img src={pokemon.image} alt="car" />
                        </div>
                      </td>

                      <td>
                        <Button variant="outline-info">Info</Button>{" "}
                        <Button variant="outline-success">Add</Button>{" "}
                        <Button  onClick={this.handleClickDelete.bind(this,pokemon.id)}  variant="outline-danger">Supp</Button>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div>%%%%%%%%%%%%%%%%%%%%</div>
            )}
            {error && <div>Error message</div>}

            <div className="row">
              <div className="col-md-4 col-md-offset-3"> </div>
              <div className="col-md-6 col-md-offset-3">
                <Pagination />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
