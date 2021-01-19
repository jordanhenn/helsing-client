import React, { Component } from 'react'
import HelsingAPIService from '../../services/HelsingAPIService'
import { EmailShareButton } from 'react-share'
import './ReserveItemPage.css'

class ReserveItemPage extends Component {

  static defaultProps = {
    match: { params: {} },
  }

  state = {
    rs_id: null,
    association: null,
    manager_firstname: null,
    manager_email: null,
    assigned_to: null,
    date_added: null,
    fy_end: null,
    client_number: null,
    date_in_queue: null,
    total_price: null,
    csa: null,
    scope: null,
    retainer: null,
    ccrs: null,
    hoa_questionnaire: null,
    budget: null,
    site_plan: null,
    reserve_study: null,
    annual_review: null,
    income_statement: null,
    balance_sheet: null,
    draft_billed_date: null,
    final_billed_date: null,
    e_id: null,
    employee_firstname: null,
    employee_lastname: null,
    employee_email: null,
    employees: []
  }

  componentDidMount() {
    const { reservestudyId } = this.props.match.params
    HelsingAPIService.getRsById(reservestudyId)
      .then(study => {
        this.setState({
          ...study
        })
        HelsingAPIService.getEmployeeById(study.assigned_to)
        .then(employee => {
          this.setState({
          ...employee
      })
    })
    HelsingAPIService.getAllEmployees()
        .then(employees => {
            this.setState({
                employees
            })
        })
  })
}

  renderEmail() {

  }

  handleUpdate = () => {

  }

  render() {
    return (
        <form className='reserve-study'>
        <fieldset>
          <legend>Reserve Study Info</legend>
          <p>Added to job tracker on {this.state.date_added}</p>
          {this.state.date_in_queue && 
            <p>Added to active queue on {this.state.date_in_queue}</p>}
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
          <select defaultValue={this.state.e_id} name="assigned_to" id="assigned_to" onChange={(e) => this.setState({e_id: e.target.value})}>
              {this.state.employees.map(employee => {
                  return (
                      <option value={employee.e_id}>{employee.employee_firstname}</option>
                  )
              })}
          </select>
        </fieldset>
      </form>
    )
  }
}

export default ReserveItemPage