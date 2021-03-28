import React, { Component } from 'react';
import HelsingAPIService from '../../services/HelsingAPIService'
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat'
import './TMItem.css';

class TMItem extends Component {
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
        <ul className='tm-item-style'>
            <Link style={{ textDecoration: 'none' }}to={`/timeandmaterial/${this.props.tm_id}`}>
            <div className='tm-item'>
                <p>{dateFormat(this.props.date_added, "shortDate")}</p>
                <p>{this.props.association}</p>
                <p>{this.props.client_number}</p>
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

export default TMItem