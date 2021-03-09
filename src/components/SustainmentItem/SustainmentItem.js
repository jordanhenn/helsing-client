import React, { Component } from 'react';
import HelsingAPIService from '../../services/HelsingAPIService'
import { Link } from 'react-router-dom';
import './SustainmentItem.css';

class SustainmentItem extends Component {
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
        <ul className='sustainment-item-style'>
            <Link style={{ textDecoration: 'none' }}to={`/sustainment/${props.s_id}`}>
            <div className='sustainment-item'>
                <p>{props.date_added}</p>
                <p>{props.association}</p>
                <p>{props.client_number}</p>
                <p>{props.total_price}</p>
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

export default SustainmentItem