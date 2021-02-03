import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem'
import ReserveNav from '../../components/ReserveNav'
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
        study.assigned_to !== null &&
        study.draft_billed_date === null &&
        study.final_billed_date === null
      })

      if (this.context.searchQuery.length) {
        const FilteredActiveList = ActiveList.filter(study => {
          study.association.toLowerCase().includes(this.context.searchQuery.toLowerCase()) ||
          study.client_number.includes(this.context.searchQuery)
        })
        this.setState({
          studies: FilteredActiveList
        })
      }

      if(!this.context.searchQuery.length) {
      this.setState({ 
          studies: ActiveList
      })
    }
  }

  render() {
    return (
      <div className='Active'>
        <ReserveNav/>
          <ul>
          {this.state.studies.length && this.state.studies.map(study => {
              return (
                  <ReserveItem key={study.rsId} {...study}/>
              )
          })}
          </ul>
      </div>
    )
  }
}

export default Active