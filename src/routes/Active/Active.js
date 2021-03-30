import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem/ReserveItem'
import ReserveNav from '../../components/ReserveNav/ReserveNav'
import HelsingContext from '../../contexts/HelsingContext'
import './Active.css'


class Active extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  static contextType = HelsingContext

  componentDidMount() {
      const ActiveList = this.context.studies.filter(study => {
        if(study.csa === true &&
        study.scope === true &&
        study.retainer === true &&
        study.ccrs === true &&
        study.hoa_questionnaire === true &&
        study.budget === true &&
        study.site_plan === true &&
        study.reserve_study === true &&
        study.annual_review === true &&
        study.income_statement === true &&
        study.balance_sheet === true &&
        study.assigned_to !== null &&
        study.draft_billed_date === null &&
        study.final_billed_date === null) {
          return study
        }
      })

      this.setState({ 
          studies: ActiveList
      })
  }

  render() {
    return (
      <div className='Active'>
        <ReserveNav/>
        <h4>The following are the active studies. All items have been recieved and the study has been assigned to an analyst.
          </h4>
          {(this.context.searchQuery.length) ?
          <ul>
          {this.state.studies.length && this.state.studies.filter(study => {
          if(study.association !== null && study.association.toLowerCase().includes(this.context.searchQuery.toLowerCase()) ||
          study.client_number !== null && study.client_number.includes(this.context.searchQuery)) {
            return study
          }
        }).map(study => {
              return (
                  <ReserveItem key={study.rs_id} {...study}/>
              )
          })}
          </ul> :
          <ul>
          {this.state.studies.length && this.state.studies.map(study => {
              return (
                  <ReserveItem key={study.rs_id} {...study}/>
              )
          })}
          </ul>
          }
      </div>
    )
  }
}

export default Active