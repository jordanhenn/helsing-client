import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SustainmentNav.css'

class SustainmentNav extends Component {
  render() {
  return (
    <nav className='SustainmentNav'>
    <div className='SustainmentNav-Style'>
    <ul className='Main-SustainmentNav'>
      <li className='SustainmentNav-link'>
      <Link style={{ textDecoration: 'none', backgroundColor: '#553D67' }} to={'/sustainment/year1'}>
        Year 1
      </Link>
      </li>
      <li className='SustainmentNav-link'>
      <Link style={{ textDecoration: 'none', backgroundColor: '#553D67' }} to={'/sustainment/year2'}>
        Year 2
      </Link>
      </li>
      <li className='SustainmentNav-link'>
      <Link
        style={{ textDecoration: 'none', backgroundColor: '#553D67' }}
        to={'/sustainment/year3'}>
        Year 3
      </Link>
      </li>
      <li className='SustainmentNav-link'>
      <Link
        style={{ textDecoration: 'none', backgroundColor: '#553D67' }}
        to={'/sustainment/complete'}>
        Completed
      </Link>
      </li>
      <li className='SustainmentNav-link'>
      <Link
        style={{ textDecoration: 'none', backgroundColor: '#553D67' }}
        to={'/sustainment/add'}>
        Add Sustainment
      </Link>
      </li>
      </ul>
    </div>
    </nav>
  );
  }
}

export default SustainmentNav