import React, { Component } from 'react'
import HelsingAPIService from '../../services/HelsingAPIService'
import SustainmentNav from '../../components/SustainmentNav/SustainmentNav'
import Mailto from 'reactv16-mailto'
import dateFormat from 'dateformat'
import './SustainmentItemPage.css'

class SustainmentItemPage extends Component {

  static defaultProps = {
    match: { params: {} },
  }

  state = {
    s_id: null,
    association: null,
    manager_firstname: null,
    manager_email: null,
    date_added: null,
    fy_end: null,
    client_number: null,
    assigned_to: null,
    total_price: null,
    s_contract: null,
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
    additional_notes: null,
    e_id: null,
    employee_firstname: null,
    employee_lastname: null,
    employee_email: null,
    employees: [],
    updated: false,
    updatedType: null
  }

  componentDidMount() {
    const { sustainmentId } = this.props.match.params
    HelsingAPIService.getSustainmentById(sustainmentId)
      .then(study => {
        this.setState({
          ...study
        })
        if(study.assigned_to !== null) {
        HelsingAPIService.getEmployeeById(study.assigned_to)
        .then(employee => {
          this.setState({
          ...employee
      })
    })
  }
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
    console.log(this.state.worksheets_yr1, this.state.yr1_billed, worksheets_yr2, yr2_billed, worksheets_yr3, yr3_billed, association, manager_firstname)
    if(!worksheets_yr1 && !yr1_billed || worksheets_yr1 === null && yr1_billed === null) {
        const body = `
            Hi ${manager_firstname},

            This email is in regards to ${association}. We have not yet received the completed Yr. 1 funding update worksheets. Please let me know if you need them to be resent. 
        `
        return body
    }
    else if (yr1_billed && !yr2_billed && !worksheets_yr2 && !yr3_billed || yr1_billed && yr2_billed === null && worksheets_yr2 == null && yr3_billed === null) {
        const body = `
            Hi ${manager_firstname},

            This email is in regards to ${association}. We have not yet received the completed Yr. 2 funding update worksheets. Please let me know if you need them to be resent. 
        `
        return body
    }
    else if (yr1_billed && yr2_billed && !yr3_billed && !worksheets_yr3 || yr1_billed && yr2_billed && yr3_billed === null && !worksheets_yr3 === null) {
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

  handleUpdate = (ev) => {
    ev.preventDefault()
    const { s_id, association, manager_firstname, manager_email, fy_end, client_number, assigned_to, total_price, s_contract, retainer, worksheets_yr1, worksheets_yr2, worksheets_yr3, yr1_billed, yr2_billed, yr3_billed, sustainment_letter, additional_notes } = this.state
    const updatedInfo = { association, manager_firstname, manager_email, fy_end, client_number, assigned_to, total_price, s_contract, retainer, worksheets_yr1, worksheets_yr2, worksheets_yr3, yr1_billed, yr2_billed, yr3_billed, sustainment_letter, additional_notes }
    HelsingAPIService.updateSustainment(s_id, updatedInfo)
    this.setState({
      updated: true,
      updatedType: 'updated'
    })
  }

  handleDelete = () => {
    const { s_id } = this.state
    HelsingAPIService.deleteSustainment(s_id)
    this.setState({
      updated: true,
      updatedType: 'deleted'
    })
  }

  componentWillUnmount() {
    this.setState({
      updated: false,
      updatedType: null
    })
  }

  render() {
    return (
        <div>
        <SustainmentNav/>
        {(!this.state.updated) ?  
        <form className='sustainment' onSubmit={this.handleUpdate}>
        <fieldset>
          <legend>Sustainment Info</legend>
          <p>Added to job tracker on {dateFormat(this.state.date_added, "shortDate")}</p>
          {this.state.yr1_billed && 
            <p>Yr. 1 billed on {dateFormat(this.state.yr1_billed_date, "shortDate")}</p>}
          {this.state.yr2_billed && 
            <p>Yr. 2 billed on {dateFormat(this.state.yr2_billed_date, "shortDate")}</p>}
          {this.state.yr3_billed && 
            <p>Yr. 3 billed on {dateFormat(this.state.yr3_billed_date, "shortDate")}</p>}
          <div className='form-flex'>
          <div className='form-flex-section'>
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
          <select value={this.state.assigned_to} className="assigned_to" id="assigned_to" onChange={(e) => this.setState({assigned_to: e.target.value})}>
          <option value={null}>Not Assigned</option>
              {this.state.employees.map(employee => {
                  return (
                      <option value={employee.e_id}>{employee.employee_firstname}</option>
                  )
              })}
          </select>
          <label htmlFor="contract">Contract</label>
          <select value={(this.state.s_contract === null) ? false : this.state.s_contract} className="contract" id="contract" onChange={(e) => this.setState({s_contract: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          </div>
          <div className='form-flex-section'>
          <label htmlFor="retainer">Retainer</label>
          <select value={(this.state.retainer === null) ? false : this.state.retainer} className="retainer" id="retainer" onChange={(e) => this.setState({retainer: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="worksheets_yr1">Yr. 1 Worksheets</label>
          <select value={(this.state.worksheets_yr1 === null) ? false : this.state.worksheets_yr1} className="worksheets_yr1" id="worksheets_yr1" onChange={(e) => this.setState({worksheets_yr1: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="yr1_billed">Yr. 1 Billed?</label>
          <select value={(this.state.yr1_billed === null) ? false : this.state.yr1_billed} className="yr1_billed" id="yr1_billed" onChange={(e) => this.setState({yr1_billed: e.target.value})}>
                <option value={true}>True</option>
                <option value={false}>False</option>
          </select>
          <label htmlFor="worksheets_yr2">Yr. 2 Worksheets</label>
          <select value={(this.state.worksheets_yr2 === null) ? false : this.state.yr1_billed} className="worksheets_yr2" id="worksheets_yr2" onChange={(e) => this.setState({worksheets_yr2: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="yr2_billed">Yr. 2 Billed?</label>
          <select value={(this.state.yr2_billed === null) ? false : this.state.yr2_billed} className="yr2_billed" id="yr2_billed" onChange={(e) => this.setState({yr2_billed: e.target.value})}>
                <option value={true}>True</option>
                <option value={false}>False</option>
          </select>
          <label htmlFor="worksheets_yr3">Yr. 3 Worksheets</label>
          <select value={(this.state.worksheets_yr3 === null) ? false : this.state.worksheets_yr3} className="worksheets_yr3" id="worksheets_yr3" onChange={(e) => this.setState({worksheets_yr3: e.target.value})}>
                <option value={true}>Received</option>
                <option value={false}>Not Received</option>
          </select>
          <label htmlFor="yr3_billed">Yr. 3 Billed?</label>
          <select value={(this.state.yr3_billed === null) ? false : this.state.yr3_billed} className="yr3_billed" id="yr3_billed" onChange={(e) => this.setState({yr3_billed: e.target.value})}>
                <option value={true}>True</option>
                <option value={false}>False</option>
          </select>
          <label htmlFor="sustainment_letter">Sustainment Letter Sent?</label>
          <select value={(this.state.sustainment_letter === null) ? false : this.state.sustainment_letter} className="sustainment_letter" id="sustainment_letter" onChange={(e) => this.setState({sustainment_letter: e.target.value})}>
                <option value={true}>True</option>
                <option value={false}>False</option>
          </select>
          </div>
          </div>
          <div className='additional-notes-style'>
          <label htmlFor="additional_notes">Additional Notes:</label>
            <textarea value={this.state.additional_notes} id="additional_notes" className="additional_notes" rows="4" cols="50" onChange={(e) => this.setState({additional_notes: e.target.value})}/>
          </div>
        </fieldset>
        <div className='buttons'>
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
        <button className="delete" onClick={this.handleDelete}>
          DELETE
        </button>
        </div>    
      </form> :
      <h4>
          This study has been {this.state.updatedType}. Please refresh the page to see the changes. 
      </h4>
      }
      </div>
    )
  }
}

export default SustainmentItemPage