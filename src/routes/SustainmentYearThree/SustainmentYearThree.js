import React, { Component } from 'react'
import SustainmentItem from '../../components/SustainmentItem'
import SustainmentNav from '../../components/SustainmentNav'
import HelsingContext from '../../contexts/HelsingContext'
import './SustainmentYearThree.css'


class SustainmentYearThree extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  static contextType = HelsingContext

  componentDidMount() {
      const YearThreeList = this.context.sustainment.filter(study => {
        study.yr1_billed !== null &&
        study.yr2_billed !== null &&
        study.yr3_billed === null
      })

      if (this.context.searchQuery.length) {
        const FilteredYearThreeList = YearThreeList.filter(study => {
          study.association.toLowerCase().includes(this.context.searchQuery.toLowerCase()) ||
          study.client_number.includes(this.context.searchQuery)
        })
        this.setState({
          studies: FilteredYearThreeList
        })
      }

      if(!this.context.searchQuery.length) {
      this.setState({ 
          studies: YearThreeList
      })
    }
  }

  render() {
    return (
      <div className='YearThree'>
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

export default SustainmentYearThree