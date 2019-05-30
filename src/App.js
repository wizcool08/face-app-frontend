import React, { Component } from "react";
import Particles from "react-particles-js";

import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Rank from "./components/Rank";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

import "./App.css";

const particlesProperties = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
};

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signIn",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateFaceLocationBox = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBoundingBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onImageSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch("https://serene-refuge-15785.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://serene-refuge-15785.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(err => console.log(err));
        }
        this.displayFaceBoundingBox(this.calculateFaceLocationBox(response));
      })
      .catch(err => console.log("ERROR", err));
  };

  onRouteChange = route => {
    if (route === "signOut") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({
      route: route
    });
  };

  render() {
    const { box, route, isSignedIn, imageURL } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesProperties} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onImageSubmit={this.onImageSubmit}
            />
            <FaceRecognition box={box} imageURL={imageURL} />
          </div>
        ) : route === "signIn" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
