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
    isUserExisting: false,
    isDeletedList: false,
  };
  onListingUsers = text => {
    if (this.state.users.includes(text)) {
      console.log('girdi');
    }
  };
  async componentDidMount() {
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    this.setState({ loading: true, isUserExisting: false });
    try {
      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      // console.log(res.data.items);

      this.setState({ users: res.data, loading: false, isUserExisting: true });
      // console.log(this.state.users);
    } catch (error) {}
  }

  //Search Github users
  searchUsers = async text => {
    this.setState({ isDeletedList: false, loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // console.log(res.data.items);

    // console.log(login);
    this.searchUsers.propTypes = {
      searchUsers: PropTypes.func.isRequired,
    };
    if (res.data.items.length > 0) {
      this.setState({
        users: res.data.items,
        loading: false,
        isUserExisting: true,
      });
    } else {
      this.setState({
        users: [],
        isUserExisting: false,
      });
    }
  };
  clearSearch = () => {
    this.setState({ users: [], isUserExisting: false, isDeletedList: true });
  };

  onListingUsers = async text => {
    this.setState({ isDeletedList: false, loading: true });
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      // console.log(res.data.items);
      const { login } = res.data.items[0];

      console.log(login);
      this.searchUsers.propTypes = {
        searchUsers: PropTypes.func.isRequired,
      };
      if (res.data.items.length > 0) {
        if (login.includes(text)) {
          this.setState({
            users: res.data.items,
            loading: false,
            isUserExisting: true,
          });
        }
      } else {
        this.setState({
          users: [],
          isUserExisting: false,
          isDeletedList: false,
        });
      }
    } catch (error) {}
  };
  render() {
    return (
      <div className='App'>
        <Navbar
          icon='fab fa-github'
          title='Github Finder'
          searchUsers={this.searchUsers}
          clearSearch={this.clearSearch}
          onListingUsers={this.onListingUsers}
        />
        <div className='container'>
          <Users
            isLoading={this.state.loading}
            users={this.state.users}
            isExistingUser={this.state.isUserExisting}
            isDeletedList={this.state.isDeletedList}
          />
        </div>
      </div>
    );
  }
}

export default App;
