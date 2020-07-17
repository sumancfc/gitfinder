import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  state = {
    text: '',
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClears: PropTypes.bool.isRequired,
    showAlert: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.text);
    if (this.state.text === '') {
      this.props.showAlert('Please Enter Value', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    }
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { clearUsers, showClears } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            value={this.state.text}
            onChange={this.handleChange}
            placeholder='Search Here'
          />
          <button type='submit' className='btn btn-dark btn-block'>
            Search...
          </button>
        </form>
        {showClears && (
          <button
            className='btn btn-light btn-block mt-10'
            onClick={clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}
