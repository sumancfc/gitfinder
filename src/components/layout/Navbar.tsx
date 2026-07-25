import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  icon?: string;
  title?: string;
}

const Navbar = ({ icon = 'fa fa-home', title = 'Gitfinder' }: Props) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon}></i>
          {title}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/gitfinder'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
