import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default class UpdateTrainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.show,
      name: this.props.trainer.name,
      gender: this.props.trainer.gender,
      showHideClassName: this.props.show,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleGenderChange(event) {
    this.setState({ gender: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.props.trainer.id);
    await fetch(`https://backendpokemon-production.up.railway.app/trainers/${this.props.trainer.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: this.state.name,
        gender: this.state.gender,
      }),
    }).then(async (response) => {
      if (response.ok) {
        this.props.handleHideModal();
        const json = await response.json();

        console.log(json);
      } else {
        throw new Error("Something went wrong ...");
      }
    });
  }

  render() {
    const { name, gender } = this.state;

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleHideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier le formateur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={this.handleNameChange}
                />
              </Form.Group>
              <Form.Group controlId="formGender">
                <Form.Label>Genre</Form.Label>
                <Form.Check
                  value="f"
                  type="radio"
                  aria-label="radio 1"
                  label="F"
                  onChange={this.handleGenderChange}
                  checked={gender === "f"}
                />
                <Form.Check
                  value="m"
                  type="radio"
                  aria-label="radio 2"
                  label="M"
                  onChange={this.handleGenderChange}
                  checked={gender === "m"}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Enregistrer
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}