import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem'
import ReserveNav from '../../components/ReserveNav'
import './Unassigned.css'


class Unassigned extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
      const UnassignedList = this.context.studies.filter(study => {
        study.csa === true &&
        study.scope === true &&
        study.retainer === true &&
        study.ccrs === true &&
        study.questionnaire === true &&
        study.budget === true &&
        study.site_plan === true &&
        study.reserve_study === true &&
        study.annual_review === true &&
        study.income_statement === true &&
        study.balance_sheet === true &&
        study.assigned_to === null
      })
      this.setState({ 
          studies: UnassignedList
      })
  }

  render() {
    return (
      <div className='Unassigned'>
        <ReserveNav/>
          <ul>
          {this.state.studies.length && this.state.studies.map(study => {
              return (
                  <ReserveItem key={study.rs_id} {...study}/>
              )
          })}
          </ul>
      </div>
    )
  }
}

export default Unassigned