import Navbar from './components/layouts/Navbar';
import React, { Component } from 'react';
import UserItem from './users/UserItem';
import PropTypes from 'prop-types';
import Alert from './components/layouts/Alert';
import axios from 'axios';
import './App.css';
import Users from './users/Users';
class App extends Component {
  state = {
    users: [],
    loading: false,
    isUserExisting: false,
    isDeletedList: false,
    isEmpty: false,
    alert: null,
  };
  onExistingAlert = () => {
    this.setState({ isEmpty: true });
  };
  onRemoveAlert = () => {
    this.setState({ isEmpty: false, content: null });
  };
  async componentDidMount() {
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    this.setState({ loading: true, isUserExisting: false, isEmpty: false });

    try {
      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      // console.log(res.data.items);

      this.setState({
        users: res.data,
        loading: false,
        isUserExisting: true,
      });
      // console.log(this.state.users);
    } catch (error) {}
  }

  //Search Github users
  searchUsers = async text => {
    this.setState({ isDeletedList: false, loading: true, isEmpty: false });

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
  //Clear users from state
  clearSearch = () => {
    this.setState({ users: [], isUserExisting: false, isDeletedList: true });
  };
  //Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
  };
  //Listing all item when we enter a name to the input
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
    const { users, loading, isUserExisting, isDeletedList, alert } = this.state;
    return (
      <div className='App'>
        <Navbar
          icon='fab fa-github'
          title='Github Finder'
          searchUsers={this.searchUsers}
          clearSearch={this.clearSearch}
          onListingUsers={this.onListingUsers}
          showClear={users.length > 0 ? true : false}
          onExistingAlert={this.onExistingAlert}
          onRemoveAlert={this.onRemoveAlert}
          setAlert={this.setAlert}
        />
        <div className='container'>
          {this.state.isEmpty ? <Alert alert={alert} /> : ''}
          <Users
            isLoading={loading}
            users={users}
            isExistingUser={isUserExisting}
            isDeletedList={isDeletedList}
          />
        </div>
      </div>
    );
  }
}

export default App;
