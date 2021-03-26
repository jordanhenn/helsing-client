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

      this.setState({ 
          studies: CompletedList
      })
  }

  render() {
    return (
      <div className='Completed'>
        <TMNav/>
        <h4>The following associations have had their time and material updates billed. It is 
            recommended that the completed studies are periodically deleted in order
            save memory in the database and ensure faster loading times. 
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
                  <TMItem key={study.tm_id} {...study}/>
              )
          })}
          </ul> :
          <ul>
          {this.state.studies.length && this.state.studies.map(study => {
              return (
                  <TMItem key={study.tm_id} {...study}/>
              )
          })}
          </ul>
          }
      </div>
    )
  }
}

export default TMCompleted