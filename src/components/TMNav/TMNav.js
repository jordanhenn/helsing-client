import React, { Component } from 'react';
import { Link } from 'react-router-dom';f
import './TMNav.css'

class TMNav extends Component {
  render() {
  return (
    <nav className='TMNav'>
    <div className='TMNav-Style'>
    <ul className='Main-TMNav'>
      <li className='TMNav-link'>
      <Link style={{ textDecoration: 'none' }} to={'/timeandmaterial/active'}>
        Active
      </Link>
      </li>
      <li className='TMNav-link'>
      <Link style={{ textDecoration: 'none' }} to={'/timeandmaterial/completed'}>
        Completed
      </Link>
      </li>
      <li className='TMNav-link'>
      <Link
        style={{ textDecoration: 'none' }}
        to={'/timeandmaterial/add'}>
        Add {'T&M'}
      </Link>
      </li>
      </ul>
    </div>
    </nav>
  );
  }
}

export default TMNav