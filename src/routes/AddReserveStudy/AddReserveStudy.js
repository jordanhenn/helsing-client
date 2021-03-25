import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelsingAPIService from '../../services/HelsingAPIService'
import ReserveNav from '../../components/ReserveNav/ReserveNav'
import './AddReserveStudy.css'

class AddReserveStudy extends Component {

  static defaultProps = {
    match: { params: {} },
  }

  state = {
    association: null,
    manager_firstname: null,
    manager_email: null,
    assigned_to: null,
    fy_end: null,
    client_number: null,
    total_price: null,
    csa: false,
    scope: false,
    retainer: false,
    ccrs: false,
    hoa_questionnaire: false,
    budget: false,
    site_plan: false,
    reserve_study: false,
    annual_review: false,
    income_statement: false,
    balance_sheet: false,
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
    const { association, manager_firstname, manager_email, assigned_to, fy_end, client_number, total_price, csa, scope, retainer, ccrs, hoa_questionnaire, budget, site_plan, reserve_study, annual_review, income_statement, balance_sheet, additional_notes } = this.state
    const newRSInfo = { association, manager_firstname, manager_email, assigned_to, fy_end, client_number, total_price, csa, scope, retainer, ccrs, hoa_questionnaire, budget, site_plan, reserve_study, annual_review, income_statement, balance_sheet, additional_notes }
    newRSInfo.date_added = new Date()
    HelsingAPIService.addReserveStudy(newRSInfo)
    this.setState({submitted: true})
  }

  componentWillUnmount() {
      this.setState({
        association: null,
        manager_firstname: null,
        manager_email: null,
        assigned_to: null,
        fy_end: null,
        client_number: null,
        total_price: null,
        csa: false,
        scope: false,
        retainer: false,
        ccrs: false,
        hoa_questionnaire: false,
        budget: false,
        site_plan: false,
        reserve_study: false,
        annual_review: false,
        income_statement: false,
        balance_sheet: false,
        additional_notes: null,
        e_id: null,
        employees: [],
        submitted: false
    })
  }

  render() {
    return (
        <div>
        <ReserveNav/>
        {(!this.state.submitted) ?  
        <form className='reserve-study' onSubmit={this.handleSubmit}>
              <p>Fill out the information for the reserve study below, then hit submit.</p>
        <fieldset>
          <legend>Reserve Study Info</legend>
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
          <label htmlFor="csa">CSA</label>
          <select defaultValue={this.state.csa} className="csa" id="csa" onChange={(e) => this.setState({csa: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="scope">Scope</label>
          <select defaultValue={this.state.scope} className="scope" id="scope" onChange={(e) => this.setState({scope: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="retainer">Retainer</label>
          <select defaultValue={this.state.retainer} className="retainer" id="retainer" onChange={(e) => this.setState({retainer: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="ccrs">{'CC&Rs'}</label>
          <select defaultValue={this.state.ccrs} className="ccrs" id="ccrs" onChange={(e) => this.setState({ccrs: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="hoa_questionnaire">HOA Questionnaire</label>
          <select defaultValue={this.state.hoa_questionnaire} className="hoa_questionnaire" id="hoa_questionnaire" onChange={(e) => this.setState({hoa_questionnaire: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="budget">Budget</label>
          <select defaultValue={this.state.budget} className="budget" id="budget" onChange={(e) => this.setState({budget: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="site_plan">Site Plan</label>
          <select defaultValue={this.state.site_plan} className="site_plan" id="site_plan" onChange={(e) => this.setState({site_plan: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="reserve_study">Previous Reserve Studies</label>
          <select defaultValue={this.state.reserve_study} className="reserve_study" id="reserve_study" onChange={(e) => this.setState({reserve_study: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="annual_review">Annual Review</label>
          <select defaultValue={this.state.annual_review} className="annual_review" id="annual_review" onChange={(e) => this.setState({annual_review: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="income_statement">Income Statement</label>
          <select defaultValue={this.state.income_statement} className="income_statement" id="income_statement" onChange={(e) => this.setState({income_statement: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="balance_sheet">Balance Sheet</label>
          <select defaultValue={this.state.balance_sheet} className="balance_sheet" id="balance_sheet" onChange={(e) => this.setState({balance_sheet: e.target.value})}>
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

export default AddReserveStudy