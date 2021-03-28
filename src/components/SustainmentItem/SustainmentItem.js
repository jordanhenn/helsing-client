import React, { Component } from 'react';
import HelsingAPIService from '../../services/HelsingAPIService'
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat'
import './SustainmentItem.css';

class SustainmentItem extends Component {
    state = { employee: null }
  
    static getDerivedStateFromError(error) {
      console.error(error)
      return { hasError: true }
    }
  
    componentDidMount() {
        if(this.props.assigned_to !== null) {
        HelsingAPIService.getEmployeeById(this.props.assigned_to)
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
            <Link style={{ textDecoration: 'none' }}to={`/sustainment/${this.props.s_id}`}>
            <div className='sustainment-item'>
                <p>{dateFormat(this.props.date_added, "shortDate")}</p>
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

export default SustainmentItem