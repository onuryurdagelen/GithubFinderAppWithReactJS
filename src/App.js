import Navbar from './components/layouts/Navbar';
import React, { Component } from 'react';
import UserItem from './users/UserItem';
import PropTypes from 'prop-types';

import axios from 'axios';
import './App.css';
import Users from './users/Users';
class App extends Component {
  state = {
    users: [],
    loading: false,
    textValue: 'abcdne',
  };

  async componentDidMount() {
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // console.log(res.data.items);

    this.setState({ users: res.data, loading: false });
    // console.log(this.state.users);
  }

  //Search Github users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data.items);
    this.searchUsers.propTypes = {
      searchUsers: PropTypes.func.isRequired,
    };
    this.setState({ users: res.data.items, loading: false });
  };
  clearSearch = () => {
    this.setState({ users: [] });
  };
  render() {
    return (
      <div className='App'>
        <Navbar
          icon='fab fa-github'
          title='Github Finder'
          searchUsers={this.searchUsers}
          clearSearch={this.clearSearch}
        />
        <div className='container'>
          <Users isLoading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
