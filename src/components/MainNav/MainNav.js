import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainNav.css'

class MainNav extends Component {
  render() {
  return (
    <nav className='MainNav'>
    <div className='MainNav-Style'>
    <ul className='Main-MainNav'>
      <li className='MainNav-link'>
      <Link style={{ textDecoration: 'none', backgroundColor: '#553D67' }} to={'/'}>
        Home
      </Link>
      </li>
      <li className='MainNav-link'>
      <Link style={{ textDecoration: 'none', backgroundColor: '#553D67' }} to={'/reservestudies/active'}>
        Reserve Studies
      </Link>
      </li>
      <li className='MainNav-link'>
      <Link style={{ textDecoration: 'none', backgroundColor: '#553D67' }} to={'/sustainment/year3'}>
        Sustainment
      </Link>
      </li>
      <li className='MainNav-link'>
      <Link
        style={{ textDecoration: 'none', backgroundColor: '#553D67' }}
        to={'/timeandmaterial/active'}>
        {'T&M'}
      </Link>
      </li>
      <li className='MainNav-link'>
      <Link
        style={{ textDecoration: 'none', backgroundColor: '#553D67' }}
        to={'/employees'}>
        Employees
      </Link>
      </li>
      </ul>
    </div>
    </nav>
  );
  }
}

export default MainNav