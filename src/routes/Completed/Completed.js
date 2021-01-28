import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem'
import ReserveNav from '../../components/ReserveNav'
import './Completed.css'


class Completed extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
      const CompletedList = this.context.studies.filter(study => {
        study.draft_billed_date !== null &&
        study.final_billed_date !== null
      })
      this.setState({ 
          studies: CompletedList
      })
  }

  render() {
    return (
      <div className='Completed'>
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

export default Completed