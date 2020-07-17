import React from 'react';
import PropTypes from 'prop-types'

const UserItem = ({ user: { login, git_url, avatar_url } }) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt='User Logo'
        className='round-img'
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>
      <div>
        <a
          href={git_url}
          className='btn btn-dark btn-sm my-1'
          target='_blank'
          rel='noopener noreferrer'
        >
          Read More
        </a>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
