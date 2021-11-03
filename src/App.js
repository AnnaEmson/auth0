import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth"
import Callback from "./Callback";
import Private from './Private'
import Public from "./Public";
import Courses from "./Courses";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    const isAuthenticated = this.auth.isAuthenticated();
    return (
      <>
        <Nav auth={this.auth}/>
        <div className="body">
          <Route path="/" exact render={props => <Home auth={this.auth} {...props} />} />
          <Route path="/callback" render={props => <Callback auth={this.auth} {...props} />} />
          <Route
            path="/profile"
            render={props =>
              isAuthenticated ? (
                <Profile auth={this.auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/public" component={Public} />
          <Route path="/private" render={props => 
            isAuthenticated ?
              <Private auth={this.auth} {...props} />
              :
              this.auth.login()}
            />
          <Route path="/courses" render={props => 
            isAuthenticated && this.auth.userHasScopes(["read:courses"]) ? <Courses auth={this.auth} {...props} /> : this.auth.login()} />
        </div>
      </>
    );
  }
}

export default App;
