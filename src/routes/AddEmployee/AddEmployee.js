import React, { Component } from 'react'
import HelsingAPIService from '../../services/HelsingAPIService'
import './AddEmployee.css'

class AddEmployee extends Component {

  static defaultProps = {
    match: { params: {} },
  }

  state = {
    employees: [],
    newEmployeeFirstName: null,
    newEmployeeLastName: null,
    newEmployeeEmail: null,
    submitted: false,
    deleted: false
  }

  componentDidMount() {
    HelsingAPIService.getAllEmployees()
        .then(employees => {
            this.setState({
                employees
            })
      })
}

  handleSubmit = (ev) => {
    ev.preventDefault()
    const { newEmployeeFirstName, newEmployeeLastName, newEmployeeEmail } = this.state
    const newEmployeeInfo = { newEmployeeFirstName, newEmployeeLastName, newEmployeeEmail }
    HelsingAPIService.addEmployee(newEmployeeInfo)
    this.setState({submitted: true})
  }

  handleDelete = (employeeId) => {
      HelsingAPIService.deleteEmployee(employeeId)
      this.setState({deleted: true})
  }

  componentWillUnmount() {
      this.setState({
        employees: [],
        newEmployeeFirstName: null,
        newEmployeeLastName: null,
        newEmployeeEmail: null,
        submitted: false,
        deleted: true
    })
  }

  render() {
    return (
        <div>
        {!(this.state.deleted) ?
          <ul>
              {this.state.employees.map(employee => {
                  return (
            <li className='employee'>
                <p>{employee.employee_firstname} {employee.employee_lastname}</p>
                <p>{employee.employee_email}</p>
                <button className='delete-employee' onClick={this.handleDelete(employee.e_id)}>DELETE</button>
            </li>)
          })}
          </ul>
            :
            <h4>
          The employee has been deleted. Please refresh the page to see the updated employee list. 
            </h4>
        }
        {(!this.state.submitted) ?  
        <form className='employee-form' onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Employee Info</legend>
          <label htmlFor='employee_firstname'>
                First Name
              </label>
           <input
                className='employee_firstname'
                value={this.state.employee_firstname}
                onChange={(e) => {this.setState({employee_firstname: e.target.value})}}
                type='text'
                id='employee_firstname'/>
            <label htmlFor='employee_lastname'>
                Last Name
              </label>
           <input
                className='employee_lastname'
                value={this.state.employee_lastname}
                onChange={(e) => {this.setState({employee_lastname: e.target.value})}}
                type='text'
                id='employee_lastname'/>
            <label htmlFor='employee_email'>
                Email
              </label>
           <input
                className='employee_email'
                value={this.state.employee_email}
                onChange={(e) => {this.setState({employee_email: e.target.value})}}
                type='text'
                id='employee_email'/>
        </fieldset>
        <button className="submit" type='submit'>
            SUBMIT
          </button>    
      </form> :
      <h4>
          The new employee has been added. Please refresh the page to see the updated employee list. 
      </h4>
      }
      </div>
    )
  }
}

export default AddEmployee