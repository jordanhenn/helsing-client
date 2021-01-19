import React, { Component } from 'react'
import SustainmentItem from '../../components/SustainmentItem'
import './SustainmentYearThree.css'


class SustainmentYearThree extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
      const YearThreeList = this.context.sustainment.filter(study => {
        study.yr1_billed !== null &&
        study.yr2_billed !== null &&
        study.yr3_billed === null
      })
      this.setState({ 
          studies: YearThreeList
      })
  }

  render() {
    return (
      <div className='YearThree'>
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

export default SustainmentYearThree