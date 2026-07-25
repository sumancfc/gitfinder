import React from 'react';
import { Link } from 'react-router-dom';
import { GithubUser } from '../../types';

interface Props {
  user: GithubUser;
}

const UserItem = ({ user: { login, avatar_url } }: Props) => {
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
        <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
