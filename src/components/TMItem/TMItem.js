import React, { Component } from 'react';
import HelsingAPIService from '../../services/HelsingAPIService'
import { Link } from 'react-router-dom';
import './TMItem.css';

class TMItem extends Component {
    state = { employee: null }
  
    static getDerivedStateFromError(error) {
      console.error(error)
      return { hasError: true }
    }
  
    componentDidMount() {
        HelsingAPIService.getEmployeeById(this.props.e_id)
            .then(employee => {
                this.setState({
                    employee
                })
          })
    }

    render() {
      return (
        <ul className='tm-item-style'>
            <Link style={{ textDecoration: 'none' }}to={`/timeandmaterial/${this.props.tm_id}`}>
            <div className='tm-item'>
                <p>{this.props.date_added}</p>
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