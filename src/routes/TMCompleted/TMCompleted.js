import React, { Component } from 'react'
import TMItem from '../../components/TMItem/TMItem'
import TMNav from '../../components/TMNav/TMNav'
import HelsingContext from '../../contexts/HelsingContext'
import './TMCompleted.css'


class TMCompleted extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  static contextType = HelsingContext

  componentDidMount() {
      const CompletedList = this.context.timeAndMaterial.filter(study => {
        if(study.billed_date !== null) {
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
        <TMNav/>
          <ul>
          {this.state.studies.length && this.state.studies.map(study => {
              return (
                  <TMItem key={study.tm_id} {...study}/>
              )
          })}
          </ul>
      </div>
    )
  }
}

export default TMCompleted