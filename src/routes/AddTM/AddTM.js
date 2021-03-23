import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import HelsingAPIService from '../../services/HelsingAPIService'
import TMNav from '../../components/TMNav/TMNav'
import './AddTM.css'

class AddTM extends Component {

  static defaultProps = {
    match: { params: {} },
  }

  state = {
    association: null,
    manager_firstname: null,
    manager_email: null,
    fy_end: null,
    client_number: null,
    assigned_to: null,
    total_price: null,
    tm_contract: false,
    worksheets: false,
    additional_notes: null,
    e_id: null,
    employees: [],
    submitted: false
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
    const { association, manager_firstname, manager_email, fy_end, client_number, assigned_to, total_price, tm_contract, worksheets, additional_notes } = this.state
    const newTMInfo = { association, manager_firstname, manager_email, fy_end, client_number, assigned_to, total_price, tm_contract, worksheets, additional_notes }
    HelsingAPIService.addTM(newTMInfo)
    this.setState({submitted: true})
  }

  componentWillUnmount() {
      this.setState({submitted: false})
  }

  render() {
    return (
        <div>
        <TMNav/>
        {(!this.state.submitted) ?  
        <form className='time-and-material' onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>{'T&M'} Info</legend>
          <label htmlFor='association_name'>
                Association Name
              </label>
           <input
                className='association_name'
                value={this.state.association}
                onChange={(e) => {this.setState({association: e.target.value})}}
                type='text'
                id='association_name'/>
            <label htmlFor='client_number'>
                Client #
              </label>
           <input
                className='client_number'
                value={this.state.client_number}
                onChange={(e) => {this.setState({client_number: e.target.value})}}
                type='text'
                id='client_number'/>
            <label htmlFor='client_number'>
                FY End
              </label>
           <input
                className='fy_end'
                value={this.state.fy_end}
                onChange={(e) => {this.setState({fy_end: e.target.value})}}
                type='text'
                id='fy_end'/>
            <label htmlFor='total_price'>
                Total Price
              </label>
           <input
                className='total_price'
                value={this.state.total_price}
                onChange={(e) => {this.setState({total_price: e.target.value})}}
                type='text'
                id='total_price'/>
           <label htmlFor='manager_firstname'>
                Manager First Name
              </label>
           <input
                className='manager_firstname'
                value={this.state.manager_firstname}
                onChange={(e) => {this.setState({manager_firstname: e.target.value})}}
                type='text'
                id='manager_firstname'/>
          <label htmlFor='manager_email'>
                Manager Email
              </label>
           <input
                className='manager_email'
                value={this.state.manager_email}
                onChange={(e) => {this.setState({manager_email: e.target.value})}}
                type='text'
                id='manager_email'/>
          <label htmlFor="assigned_to">Assigned to:</label>
          <select defaultValue={this.state.assigned_to} className="assigned_to" id="assigned_to" onChange={(e) => this.setState({assigned_to: e.target.value})}>
          <option value={null}>Not Assigned</option>
              {this.state.employees.map(employee => {
                  return (
                      <option value={employee.e_id}>{employee.employee_firstname}</option>
                  )
              })}
          </select>
          <label htmlFor="contract">Contract</label>
          <select defaultValue={this.state.tm_contract} className="contract" id="contract" onChange={(e) => this.setState({tm_contract: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="worksheets">Worksheets</label>
          <select defaultValue={this.state.worksheets} className="worksheets" id="worksheets" onChange={(e) => this.setState({worksheets: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="additional_notes">Additional Notes:</label>
            <textarea value={this.state.additional_notes} id="additional_notes" className="additional_notes" rows="4" cols="50" onChange={(e) => this.setState({additional_notes: e.target.value})}/>
        </fieldset>
        <button className="submit" type='submit'>
            SUBMIT
          </button>    
      </form> :
      <h4>
          This study has been submitted. Please <Link to={'/'}>click here</Link> to go to the homepage.
      </h4>
      }
      </div>
    )
  }
}

export default AddTM