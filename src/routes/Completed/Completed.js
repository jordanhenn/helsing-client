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

      if (this.context.searchQuery.length) {
        const FilteredCompletedList = CompletedList.filter(study => {
          if(study.association.toLowerCase().includes(this.context.searchQuery.toLowerCase()) ||
          study.client_number.includes(this.context.searchQuery)) {
            return study
          }
        })
        this.setState({
          studies: FilteredCompletedList
        })
      }
      if(!this.context.searchQuery.length) {
      this.setState({ 
          studies: CompletedList
      })
    }
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