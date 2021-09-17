import React, { Component } from 'react';
import Loading from '../components/layouts/Loading';
import UserItem from './UserItem';
import PropTypes from 'prop-types';
class Users extends Component {
  render() {
    var content = '';
    if (!this.props.isLoading) {
      content = this.props.users.map(user => {
        return <UserItem key={user.id} user={user} />;
      });
    }
    if (this.props.isLoading) content = <Loading loading='loading' />;
    else if (this.props.users.length === 0) content = <h1>Users Not Found!</h1>;

    return <div className='card text-center'>{content}</div>;
  }
}
Users.propTypes = { users: PropTypes.array.isRequired };

export default Users;
