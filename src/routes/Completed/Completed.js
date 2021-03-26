import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem/ReserveItem'
import ReserveNav from '../../components/ReserveNav/ReserveNav'
import HelsingContext from '../../contexts/HelsingContext'
import './Completed.css'


class Completed extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  static contextType = HelsingContext

  componentDidMount() {
      const CompletedList = this.context.studies.filter(study => {
        if(study.draft_billed_date !== null &&
        study.final_billed_date !== null) {
          return study
        }
      })

      this.setState({ 
          studies: CompletedList
      })
  }

  render() {
    return (
      <div className='Completed'>
        <ReserveNav/>
        <h4>The following are studies that have had both the draft and final billed. It is recommended to periodically delete completed studies 
          in order to conserve memory in the database and ensure faster loading times. 
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

export default Completed