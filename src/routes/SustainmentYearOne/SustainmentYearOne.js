import React, { Component } from 'react'
import SustainmentItem from '../../components/SustainmentItem'
import SustainmentNav from '../../components/SustainmentNav'
import './SustainmentYearOne.css'


class SustainmentYearOne extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
      const YearOneList = this.context.sustainment.filter(study => {
        study.yr1_billed === null
      })
      this.setState({ 
          studies: YearOneList
      })
  }

  render() {
    return (
      <div className='YearOne'>
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

export default SustainmentYearOne