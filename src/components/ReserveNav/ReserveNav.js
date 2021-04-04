import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ReserveNav.css'

class ReserveNav extends Component {
  render() {
  return (
    <nav className='ReserveNav'>
    <div className='ReserveNav-Style'>
    <ul className='Main-ReserveNav'>
      <li className='ReserveNav-link'>
      <Link style={{ textDecoration: 'none', backgroundColor: '#553D67' }} to={'/reservestudies/active'}>
        Active
      </Link>
      </li>
      <li className='ReserveNav-link'>
      <Link style={{ textDecoration: 'none', backgroundColor: '#553D67'}} to={'/reservestudies/unassigned'}>
        Unassigned
      </Link>
      </li>
      <li className='ReserveNav-link'>
      <Link
        style={{ textDecoration: 'none', backgroundColor: '#553D67'}}
        to={'/reservestudies/itemsneeded'}>
        Items Needed
      </Link>
      </li>
      <li className='ReserveNav-link'>
      <Link
        style={{ textDecoration: 'none', backgroundColor: '#553D67'}}
        to={'/reservestudies/draftbilled'}>
        Draft Billed
      </Link>
      </li>
      <li className='ReserveNav-link'>
      <Link
        style={{ textDecoration: 'none', backgroundColor: '#553D67'}}
        to={'/reservestudies/completed'}>
        Completed
      </Link>
      </li>
      <li className='ReserveNav-link'>
      <Link
        style={{ textDecoration: 'none', backgroundColor: '#553D67'}}
        to={'/reservestudies/add'}>
        Add Study
      </Link>
      </li>
      </ul>
    </div>
    </nav>
  );
  }
}

export default ReserveNav