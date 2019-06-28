import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

import * as routes from "../constants/routes";
import { auth, db } from "../firebase";
import { Certificate } from "crypto";

const RSignUpPage = ({ history }) => (
  <div>
    <div className="div-flex">
      <div>
        <h1 className="centered">Register Your Resturant On Fast Foodies</h1>
        <SignUpForm history={history} />
      </div>
    </div>
  </div>
);

//################### Sign Up Form ###################
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  country: "",
  city:"",
  resturantname: "",
  certificates: "",
  password:"",
  confirmpassword:"",
  showingAlert: false
};

//A Higher order function with prop name as key and the value to be assigned to
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  //defining state
  state = {
    ...INITIAL_STATE
  };

  // onChange = (propName, value) => {
  //   this.setState({
  //     [propName]: value
  //   });
  // };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      //it the above functions resolves, reset the state to its initial state values, otherwise, set the error object
      .then(authUser => {
        //creating a user in the database after the sign up through Firebase auth API
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState({
              ...INITIAL_STATE
            });
            history.push(routes.HOME); //redirects to Home Page
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
            this.timer(); //show alert message for some seconds
          });
      })
      .catch(err => {
        this.setState(byPropKey("error", err));
        this.timer(); //show alert message for some seconds
      });

    event.preventDefault(); //prevents refreshing
  };

  timer = () => {
    this.setState({
      showingAlert: true
    });

    setTimeout(() => {
      this.setState({
        showingAlert: false
      });
    }, 4000);
  };

  render() {
    const {
      username,
      email,
      password,
      confirmpassword,
      error,
      country,
      city,
      resturantname,
      certificates,
      showingAlert
    } = this.state;
    //a boolen to perform validation
    const isInvalid =
      password !== confirmpassword ||
      password === "" ||
      email === "" ||
      username === "";

    return (
      <div>
          
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {error.message}
          </Alert>
        )}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="userName">Full Name</Label>
            <Input
              type="username"
              name="username"
              id="userName"
              placeholder="John Doe"
              value={username}
              onChange={e =>
                this.setState(byPropKey("username", e.target.value))
              }
            />
            
          </FormGroup>
          <FormGroup>
            <Label for="resturantname">Resturant Name</Label>
            <Input
              type="text"
              name="resturant-name"
              id="exampleEmail"
              placeholder="Foodistan"
              value={resturantname}
              onChange={e => this.setState(byPropKey("resturantname", e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Country">Country</Label>
            <Input
              type="text"
              name="country"
              id="exampleEmail"
              placeholder="Pakistan"
              value={country}
              onChange={e => this.setState(byPropKey("country", e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="exampleEmail"
              placeholder="Karachi"
              value={city}
              onChange={e => this.setState(byPropKey("city", e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="certificates">Certificates</Label>
            <Input
              type="text"
              name="certificates"
              id="exampleEmail"
              placeholder="certificates"
              value={certificates}
              onChange={e => this.setState(byPropKey("certificates", e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="user@gmail.com"
              value={email}
              onChange={e => this.setState(byPropKey("email", e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword1">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword1"
              placeholder="Password"
              value={password}
              onChange={e =>
                this.setState(byPropKey("password", e.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword2">Confirm Password</Label>
            <Input
              type="password"
              name="cpassword"
              id="examplePassword2"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={e =>
                this.setState(byPropKey("confirmpassword", e.target.value))
              }
            />
          </FormGroup>

          <div className="text-center">
            <Button disabled={isInvalid} type="submit">
              Register Now
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

//################### Sign Up Link ###################
//used in the sign in when the user don't have an account registered yet
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);


export default withRouter(RSignUpPage); //using a HoC to get access to history
export { SignUpForm, SignUpLink };


