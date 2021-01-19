import React, { Component } from 'react'
import TMItem from '../../components/TMItem'
import './TMQueue.css'


class TMQueue extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
      const QueueList = this.context.timeAndMaterial.filter(study => {
        study.billed_date === null
      })
      this.setState({ 
          studies: QueueList
      })
  }

  render() {
    return (
      <div className='Queue'>
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

export default TMQueue