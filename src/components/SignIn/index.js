import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const signInStyles = {
  width: "700px",
  margin: "5% auto",
  boxShadow: "8px 8px 8px 8px rgba( 0, 0, 0, .2 )",
  borderRadius: ".5rem",
  padding: "2rem"
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: ""
    };
  }

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = event => {
    event.preventDefault();
    fetch("https://serene-refuge-15785.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
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
    const { onRouteChange } = this.props;
    return (
      <div style={signInStyles}>
        <h2>Sign In</h2>
        <Form>
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
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={this.onSubmitSignIn}
            style={{ marginRight: "10px" }}
          >
            Sign In
          </Button>
          <Button
            variant="success"
            type="submit"
            onClick={() => onRouteChange("register")}
          >
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignIn;
