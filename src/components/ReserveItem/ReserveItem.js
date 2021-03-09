import React, { Component } from 'react';
import HelsingAPIService from '../../services/HelsingAPIService'
import { Link } from 'react-router-dom';
import './ReserveItem.css';

class ReserveItem extends Component {
    state = { employee: null }
  
    static getDerivedStateFromError(error) {
      console.error(error)
      return { hasError: true }
    }
  
    componentDidMount() {
        if(this.props.e_id !== null) {
            HelsingAPIService.getEmployeeById(this.props.e_id)
                .then(employee => {
                    this.setState({
                        employee
                    })
              })
            }
    }

    render() {
      return (
        <ul className='reserve-item-style'>
            <Link style={{ textDecoration: 'none' }}to={`/reservestudies/${this.props.rs_id}`}>
            <div className='reserve-item'>
                <p>{this.props.date_added}</p>
                <p>{this.props.association}</p>
                <p>{this.props.client_number}</p>
                <p>{this.props.total_price}</p>
                {(this.state.employee) ? 
                <p>Assigned to: {this.state.employee.employee_firstname}</p>
                : <p>Unassigned</p>
                }
            </div>
            </Link>
        </ul>
      )
  }
}

export default ReserveItem