import React, { Component } from 'react'
import SustainmentItem from '../../components/SustainmentItem'
import SustainmentNav from '../../components/SustainmentNav'
import HelsingContext from '../../contexts/HelsingContext'
import './SustainmentYearOne.css'


class SustainmentYearOne extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  static contextType = HelsingContext

  componentDidMount() {
      const YearOneList = this.context.sustainment.filter(study => {
        study.yr1_billed === null
      })

      if (this.context.searchQuery.length) {
        const FilteredYearOneList = YearOneList.filter(study => {
          study.association.toLowerCase().includes(this.context.searchQuery.toLowerCase()) ||
          study.client_number.includes(this.context.searchQuery)
        })
        this.setState({
          studies: FilteredYearOneList
        })
      }

      if(!this.context.searchQuery.length) {
      this.setState({ 
          studies: YearOneList
      })
    }
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