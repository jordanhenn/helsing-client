import React, { Component } from 'react'
import TMItem from '../../components/TMItem'
import './TMCompleted.css'


class TMCompleted extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
      const CompletedList = this.context.timeAndMaterial.filter(study => {
        study.billed_date !== null
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
                  <TMItem key={study.tm_id} {...study}/>
              )
          })}
          </ul>
      </div>
    )
  }
}

export default TMCompleted