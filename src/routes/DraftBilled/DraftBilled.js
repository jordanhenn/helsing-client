import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem'
import './DraftBilled.css'


class DraftBilled extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
      const DraftBilledList = this.context.studies.filter(study => {
        study.draft_billed_date !== null &&
        study.final_billed_date === null
      })
      this.setState({ 
          studies: DraftBilledList
      })
  }

  render() {
    return (
      <div className='DraftBilled'>
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

export default DraftBilled