import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout, userHasScopes } = this.props.auth;
    
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/public">Public</Link>
          </li>
          <li>
            {isAuthenticated() && <Link to="/private">Private</Link>}
          </li>
          <li>
            {isAuthenticated() && userHasScopes(["read:courses"]) && <Link to="/courses">Courses</Link>}
          </li>
          <li>
            <button onClick={isAuthenticated() ? logout : login}>{
              isAuthenticated() ? "Log out" : "Log In"
            }</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
