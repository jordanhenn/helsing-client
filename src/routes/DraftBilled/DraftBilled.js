import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem/ReserveItem'
import ReserveNav from '../../components/ReserveNav/ReserveNav'
import HelsingContext from '../../contexts/HelsingContext'
import './DraftBilled.css'


class DraftBilled extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  static contextType = HelsingContext

  componentDidMount() {
      const DraftBilledList = this.context.studies.filter(study => {
        if(study.draft_billed_date !== null &&
        study.final_billed_date === null) {
          return study
        }
      })

      this.setState({ 
          studies: DraftBilledList
      })
  }

  render() {
    return (
      <div className='DraftBilled'>
        <ReserveNav/>
        <h4>The following are studies for which the draft has been billed but not the final.
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

export default DraftBilled