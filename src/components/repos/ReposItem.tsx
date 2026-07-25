import React from 'react';
import { Repo } from '../../types';

interface Props {
  repo: Repo;
}

const ReposItem = ({ repo }: Props) => {
  return (
    <div className='card'>
      <h3>
        <a href={repo.html_url}>{repo.name}</a>
      </h3>
    </div>
  );
};

export default ReposItem;
