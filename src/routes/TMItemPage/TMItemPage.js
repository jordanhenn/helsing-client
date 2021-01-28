import React, { Component } from 'react'
import HelsingAPIService from '../../services/HelsingAPIService'
import TMNav from '../../components/TMNav'
import Mailto from 'reactv16-mailto'
import './TMItemPage.css'

class TMItemPage extends Component {

  static defaultProps = {
    match: { params: {} },
  }

  state = {
    tm_id: null,
    association: null,
    manager_firstname: null,
    manager_email: null,
    date_added: null,
    fy_end: null,
    client_number: null,
    assigned_to: null,
    total_price: null,
    contract: null,
    worksheets: null,
    billed: null,
    billed_date: null,
    additional_notes: null,
    e_id: null,
    employee_firstname: null,
    employee_lastname: null,
    employee_email: null,
    employees: [],
    updated: false
  }

  componentDidMount() {
    const { tmId } = this.props.match.params
    HelsingAPIService.getTMById(tmId)
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

  renderManagerEmailBody() {
    const { worksheets, contract } = this.state
    if(!worksheets) {
        const body = `
            Hi ${manager_firstname},

            This email is in regards to ${association}. We have not yet received the completed funding update worksheets. Please let me know if you need them to be resent. 
        `
        return body
    }
    else {
        return null
    }
  }

  renderAnalystEmailBody() {
    if(!this.state.billed) {
        const body = `
            Hi ${this.state.employee_firstname},

            Do you have a status update for ${this.state.association}? Are we ready to bill?
        `
        return body
    }
    else {
        return null
    }
  }

  handleUpdate = () => {
    ev.preventDefault()
    const { tm_id, manager_firstname, manager_email, fy_end, client_number, assigned_to, total_price, contract, worksheets, billed, additional_notes } = this.state
    const updatedInfo = { manager_firstname, manager_email, fy_end, client_number, assigned_to, total_price, contract, worksheets, billed, additional_notes }
    HelsingAPIService.updateTM(tm_id, updatedInfo)
    this.setState({updated: true})
  }

  componentWillUnmount() {
      this.setState({updated: false})
  }

  render() {
    return (
        <div>
        <TMNav/>
        {(!this.state.updated) ?  
        <form className='time-and-material' onSubmit={this.handleUpdate}>
        <fieldset>
          <legend>{'T&M'} Info</legend>
          <p>Added to job tracker on {this.state.date_added}</p>
          {this.state.billed && 
            <p>Billed on {this.state.billed_date}</p>}
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
          <select defaultValue={this.state.e_id} className="assigned_to" id="assigned_to" onChange={(e) => this.setState({e_id: e.target.value})}>
              {this.state.employees.map(employee => {
                  return (
                      <option value={employee.e_id}>{employee.employee_firstname}</option>
                  )
              })}
          </select>
          <label htmlFor="contract">Contract</label>
          <select defaultValue={this.state.contract} className="contract" id="contract" onChange={(e) => this.setState({contract: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="worksheets">Worksheets</label>
          <select defaultValue={this.state.worksheets} className="worksheets" id="worksheets" onChange={(e) => this.setState({worksheets: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="billed">Billed?</label>
          <select defaultValue={this.state.billed} className="billed" id="billed" onChange={(e) => this.setState({billed: e.target.value})}>
                <option value={true}>True</option>
                <option value={false}>False</option>
          </select>
          <label htmlFor="additional_notes">Additional Notes:</label>
            <textarea value={this.state.additional_notes} id="additional_notes" className="additional_notes" rows="4" cols="50" onChange={(e) => this.setState({additional_notes: e.target.value})}/>
        </fieldset>
        <Mailto 
            email={this.state.manager_email}
            headers={{
                subject: `${this.state.association} - Items Needed`,
                body: this.renderManagerEmailBody()
            }}>
                Email Manager
            </Mailto>
        <Mailto 
            email={this.state.employee_email}
            headers={{
                subject: `${this.state.association} - Status Update`,
                body: this.renderAnalystEmailBody()
            }}>
                Email Analyst
            </Mailto>
        <button className="update" type='submit'>
            UPDATE
          </button>    
      </form> :
      <h4>
          This study has been updated. Please refresh the page to see the changes. 
      </h4>
      }
      </div>
    )
  }
}

export default TMItemPage