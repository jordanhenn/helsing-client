import React, { Component } from 'react'
import SustainmentItem from '../../components/SustainmentItem/SustainmentItem'
import SustainmentNav from '../../components/SustainmentNav/SustainmentNav'
import HelsingContext from '../../contexts/HelsingContext'
import './SustainmentCompleted.css'


class SustainmentCompleted extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  static contextType = HelsingContext

  componentDidMount() {
      const CompletedList = this.context.sustainment.filter(study => {
        if(study.yr1_billed !== null &&
        study.yr2_billed !== null &&
        study.yr3_billed !== null) {
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
        <SustainmentNav/>
          <ul>
          {this.state.studies.length && this.state.studies.map(study => {
              return (
                  <SustainmentItem key={study.s_id} {...study}/>
              )
          })}
          </ul>
      </div>
    )
  }
}

export default SustainmentCompleted