import React, { Component } from 'react'
import HelsingAPIService from '../../services/HelsingAPIService'
import Mailto from 'reactv16-mailto'
import './SustainmentItemPage.css'

class SustainmentItemPage extends Component {

  static defaultProps = {
    match: { params: {} },
  }

  state = {
    s_id: null,
    date_added: null,
    association: null,
    manager_firstname: null,
    manager_email: null,
    date_added: null,
    fy_end: null,
    client_number: null,
    assigned_to: null,
    total_price: null,
    contract: null,
    retainer: null,
    worksheets_yr1: null,
    worksheets_yr2: null,
    worksheets_yr3: null,
    yr1_billed: null,
    yr1_billed_date: null,
    yr2_billed: null,
    yr2_billed_date: null,
    yr3_billed: null,
    sustainment_letter: null,
    e_id: null,
    employee_firstname: null,
    employee_lastname: null,
    employee_email: null,
    employees: [],
    updated: false
  }

  componentDidMount() {
    const { sustainmentId } = this.props.match.params
    HelsingAPIService.getSustainmentById(sustainmentId)
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
    const { worksheets_yr1, yr1_billed, worksheets_yr2, yr2_billed, worksheets_yr3, yr3_billed, association, manager_firstname } = this.state
    if(!worksheets_yr1 && !yr1_billed) {
        const body = `
            Hi ${manager_firstname},

            This email is in regards to ${association}. We have not yet received the completed Yr. 1 funding update worksheets. Please let me know if you need them to be resent. 
        `
        return body
    }
    else if (yr1_billed && !yr2_billed && !worksheets_yr2 && !yr3_billed) {
        const body = `
            Hi ${manager_firstname},

            This email is in regards to ${association}. We have not yet received the completed Yr. 2 funding update worksheets. Please let me know if you need them to be resent. 
        `
        return body
    }
    else if (yr1_billed && yr2_billed && !yr3_billed && !worksheets_yr3) {
        const body = `
            Hi ${manager_firstname},

            This email is in regards to ${association}. We have not yet received the completed Yr. 3 reserve study worksheets. Please let me know if you need them to be resent. 
        `
        return body
    }
    else {
        return null
    }
  }

  renderAnalystEmailBody() {
    if(!this.state.yr1_billed && !this.state.yr2_billed && !this.state.yr3_billed) {
        const body = `
            Hi ${this.state.employee_firstname},

            Do you have a status update for ${this.state.association}? Are we ready to proceed with billing yr. 1?
        `
        return body
    }
    else if (this.state.yr1_billed && !this.state.yr2_billed && !this.state.yr3_billed) {
        const body = `
            Hi ${this.state.employee_firstname},

            Do you have a status update for ${this.state.association}? Are we ready to proceed with billing yr. 2?
        `
        return body
    }
    else if (this.state.yr1_billed && this.state.yr2_billed && !this.state.yr3_billed) {
        const body = `
            Hi ${this.state.employee_firstname},

            Do you have a status update for ${this.state.association}? Are we ready to proceed with billing yr. 3?
        `
        return body
    }
    else if (this.state.yr1_billed && this.state.yr2_billed && this.state.yr3_billed && !this.state.sustainment_letter) {
        const body = `
            Hi ${this.state.employee_firstname},

            I see that we've billed the third year reserve study for ${this.state.association}. Have you sent the manager a sustainment renewal letter?
        `
        return body
    }
    else {
        return null
    }
  }

  handleUpdate = () => {
    ev.preventDefault()
    const { s_id, manager_firstname, manager_email, fy_end, client_number, assigned_to, total_price, contract, retainer, worksheets_yr1, worksheets_yr2, worksheets_yr3, yr1_billed, yr2_billed, yr3_billed, sustainment_letter } = this.state
    const updatedInfo = { s_id, manager_firstname, manager_email, fy_end, client_number, assigned_to, total_price, contract, retainer, worksheets_yr1, worksheets_yr2, worksheets_yr3, yr1_billed, yr2_billed, yr3_billed, sustainment_letter }
    HelsingAPIService.updateSustainment(s_id, updatedInfo)
    this.setState({updated: true})
  }

  componentWillUnmount() {
      this.setState({updated: false})
  }

  render() {
    return (
        <div>
        {(!this.state.updated) ?  
        <form className='sustainment' onSubmit={this.handleUpdate}>
        <fieldset>
          <legend>Sustainment Info</legend>
          <p>Added to job tracker on {this.state.date_added}</p>
          {this.state.yr1_billed && 
            <p>Yr. 1 billed on {this.state.yr1_billed_date}</p>}
          {this.state.yr2_billed && 
            <p>Yr. 2 billed on {this.state.yr2_billed_date}</p>}
          {this.state.yr3_billed && 
            <p>Yr. 3 billed on {this.state.yr3_billed_date}</p>}
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
          <label htmlFor="retainer">Retainer</label>
          <select defaultValue={this.state.retainer} className="retainer" id="retainer" onChange={(e) => this.setState({retainer: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="yr1_worksheets">Yr. 1 Worksheets</label>
          <select defaultValue={this.state.yr1_worksheets} className="yr1_worksheets" id="yr1_worksheets" onChange={(e) => this.setState({yr1_worksheets: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="yr1_billed">HOA Questionnaire</label>
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
          <label htmlFor="draft_billed">Draft Billed?</label>
          <select defaultValue={this.state.draft_billed} className="draft_billed" id="draft_billed" onChange={(e) => this.setState({draft_billed: e.target.value})}>
                <option value={true}>True</option>
                <option value={false}>False</option>
          </select>
          <label htmlFor="final_billed">Final Billed?</label>
          <select defaultValue={this.state.final_billed} className="final_billed" id="final_billed" onChange={(e) => this.setState({final_billed: e.target.value})}>
                <option value={true}>True</option>
                <option value={false}>False</option>
          </select>
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

export default SustainmentItemPage