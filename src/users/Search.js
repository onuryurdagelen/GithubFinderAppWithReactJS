import React, { Component } from 'react';
import classes from './Search.module.css';
export default class Search extends Component {
  state = {
    text: '',
    users: [],
  };

  submitHandler = e => {
    e.preventDefault();

    if (this.state.text !== '') {
      this.props.searchUsers(this.state.text);
    }
  };
  clearListHandler = () => {
    this.props.clearSearch();
    this.setState({ text: '' });
  };
  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });

    this.props.onListingUsers(e.target.value);
  };

  render() {
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
        </form>
        <button className='btn btn-light' onClick={this.clearListHandler}>
          Clear
        </button>
      </div>
    );
  }
}
