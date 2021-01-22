import React, { Component } from 'react'
import HelsingAPIService from '../../services/HelsingAPIService'
import Mailto from 'reactv16-mailto'
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
    draft_billed: null,
    final_billed: null,
    draft_billed_date: null,
    final_billed_date: null,
    additional_notes: null,
    e_id: null,
    employee_firstname: null,
    employee_lastname: null,
    employee_email: null,
    employees: [],
    updated: false
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

  renderManagerEmailBody() {
    const items = ['csa', 'scope', 'retainer', 'ccrs', 'hoa_questionnaire', 'budget', 'site_plan', 'reserve_study', 'annual_review', 'income_statement', 'balance_sheet']
    const itemNames = {
        csa: 'Consulting Services Agreement',
        scope: 'Scope',
        retainer: 'Retainer',
        ccrs: 'CC&Rs',
        hoa_questionnaire: 'HOA Questionnaire',
        budget: 'HOA Budget',
        site_plan: 'Site Plan',
        reserve_study: 'Previous Reserve Study',
        annual_review: 'Annual Review/Year End Financials',
        income_statement: 'Income Statement',
        balance_sheet: 'Balance Sheet'
    }
    for (let i=0; i < items.length; i++) {
        if(!this.state[items[i]]) {
            items.splice[i, 1]
        }
    }

    if(items.length > 0) {
        let list = ''
        for (let i=0; i < items.length; i++) {
            if (i=0) {
                list += itemNames[items[i]]
            }
            else {
                list+= `, ${itemNames[items[i]]}`
            }
        }
        let body = `
        Hi ${this.state.manager_firstname},

        This email is in regards to ${this.state.association}. We are progressing on the reserve study report, however we are still waiting to receive the following items:

        ${list}

        Please let us know if any of the above items are available. 
    `
    return body
    }
    else {
        return null
    }
  }

  renderAnalystEmailBody() {
    if(!this.state.draft_billed) {
        let body = `
            Hi ${this.state.employee_firstname},

            Do you have a status update for ${this.state.association}? Are we ready to proceed with billing the draft?
        `
        return body
    }
    else if (this.state.draft_billed && !this.state.final_billed) {
        let body = `
            Hi ${this.state.employee_firstname},

            Do you have a status update for ${this.state.association}? Are we ready to proceed with final billing?
        `
        return body
    }
  }

  handleUpdate = () => {
    ev.preventDefault()
    const { rs_id, manager_firstname, manager_email, assigned_to, fy_end, client_number, total_price, csa, scope, retainer, ccrs, hoa_questionnaire, budget, site_plan, reserve_study, annual_review, income_statement, balance_sheet, draft_billed, final_billed, additional_notes } = this.state
    let date_in_queue = this.state.date_in_queue
    if (csa !== null && scope !== null && retainer !== null && ccrs !== null && hoa_questionnaire !== null && budget !== null && site_plan !==null && reserve_study !== null && annual_review !== null && income_statement !== null && balance_sheet !== null && date_in_queue === null) {
        date_in_queue = new Date()
    }
    const updatedInfo = { manager_firstname, manager_email, assigned_to, fy_end, client_number, total_price, csa, scope, retainer, ccrs, hoa_questionnaire, budget, site_plan, reserve_study, annual_review, income_statement, balance_sheet, draft_billed, final_billed, date_in_queue, additional_notes }
    HelsingAPIService.updateReserveStudy(rs_id, updatedInfo)
    this.setState({updated: true})
  }

  componentWillUnmount() {
      this.setState({updated: false})
  }

  render() {
    return (
        <div>
        {(!this.state.updated) ?  
        <form className='reserve-study' onSubmit={this.handleUpdate}>
        <fieldset>
          <legend>Reserve Study Info</legend>
          <p>Added to job tracker on {this.state.date_added}</p>
          {this.state.date_in_queue && 
            <p>Added to active queue on {this.state.date_in_queue}</p>}
          {this.state.draft_billed && 
            <p>Draft billed on {this.state.draft_billed_date}</p>}
          {this.state.final_billed && 
            <p>Final billed on {this.state.final_billed_date}</p>}
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
          <label htmlFor="additional_notes">Additional Notes:</label>
            <textarea defaultValue={this.state.additional_notes} id="additional_notes" className="additional_notes" rows="4" cols="50" onChange={(e) => this.setState({additional_notes: e.target.value})}/>
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

export default ReserveItemPage