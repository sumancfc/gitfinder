import React from 'react';
import ReposItem from './ReposItem';
import { Repo } from '../../types';

interface Props {
  repos: Repo[];
}

const Repos = ({ repos }: Props) => {
  return (
    <>
      {repos.map((repo) => (
        <ReposItem key={repo.id} repo={repo} />
      ))}
    </>
  );
};

export default Repos;
