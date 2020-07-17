import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './index.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // userSearch = async text
  userSearch = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data.items,
      loading: false,
    });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  showAlert = (msg, type) => {
    this.setState({
      alert: { msg, type },
    });

    setTimeout(
      () =>
        this.setState({
          alert: null,
        }),
      4000
    );
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.userSearch}
            clearUsers={this.clearUsers}
            showClears={this.state.users.length > 0 ? true : false}
            showAlert={this.showAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
