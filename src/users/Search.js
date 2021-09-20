import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Search.module.css';
export default class Search extends Component {
  state = {
    text: '',
    users: [],
  };
  static propTypes = {
    showClear: PropTypes.bool.isRequired,
  };
  submitHandler = e => {
    e.preventDefault();

    if (this.state.text !== '') {
      this.props.searchUsers(this.state.text);
      this.props.onRemoveAlert();
    } else {
      this.props.onExistingAlert();
      this.props.setAlert('Please enter something', 'light');
    }
  };
  clearListHandler = () => {
    this.props.clearSearch();
    this.setState({ text: '' });
  };
  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.onRemoveAlert();

    this.props.onListingUsers(e.target.value);
  };

  render() {
    const { showClear } = this.props;
    return (
      <div className={classes.cnt_search}>
        <form
          onSubmit={this.submitHandler}
          action='#'
          className={`form ${classes.search_form}`}
        >
          <input
            placeholder='Search users...'
            type='text'
            name='text'
            className={classes.search_input}
            value={this.state.text}
            onChange={this.inputChangeHandler}
          />
          <input
            type='submit'
            value='Search'
            className={`btn btn-dark btn-block ${classes.input}`}
          />
          {showClear && (
            <button className='btn btn-light' onClick={this.clearListHandler}>
              Clear
            </button>
          )}
        </form>
      </div>
    );
  }
}
