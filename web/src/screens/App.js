import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "./home/home";
import { getUsers } from "redux/actions/user.action";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.props.getUsers}>Login</button>
          <Home />
        </header>
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  dispatch => bindActionCreators({ getUsers }, dispatch)
)(App);
