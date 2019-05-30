import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const registerStyles = {
  width: "700px",
  margin: "5% auto",
  boxShadow: "8px 8px 8px 8px rgba( 0, 0, 0, .2 )",
  borderRadius: ".5rem",
  padding: "2rem"
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = event => {
    event.preventDefault();
    fetch("https://serene-refuge-15785.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    return (
      <div style={registerStyles}>
        <h2>Register</h2>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              onChange={this.onNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.onEmailChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.onPasswordChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={this.onSubmitRegister}
          >
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
