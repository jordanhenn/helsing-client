import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem'
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

export default Completed