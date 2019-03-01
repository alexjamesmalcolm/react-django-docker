import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./home.css";

class App extends Component {
  render() {
    const { users } = this.props.user;
    return (
      <div className="home">
        {users.map((u, i) => (
          <div key={i}>{u.email}</div>
        ))}
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  dispatch => bindActionCreators({}, dispatch)
)(App);
