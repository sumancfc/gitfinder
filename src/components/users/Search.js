import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = ({ showAlert }) => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please Enter Value', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  const handleChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          value={text}
          onChange={handleChange}
          placeholder='Search Here'
        />
        <button type='submit' className='btn btn-dark btn-block'>
          Search...
        </button>
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block mt-10'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
