import React, { Component } from 'react'
import SustainmentItem from '../../components/SustainmentItem/SustainmentItem'
import SustainmentNav from '../../components/SustainmentNav/SustainmentNav'
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
        if(study.yr1_billed !== null &&
        study.yr2_billed !== null &&
        study.yr3_billed === null) {
          return study
        }
      })

      if (this.context.searchQuery.length) {
        const FilteredYearThreeList = YearThreeList.filter(study => {
          if(study.association.toLowerCase().includes(this.context.searchQuery.toLowerCase()) ||
          study.client_number.includes(this.context.searchQuery)) {
            return study
          }
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
        <h4>The following are studies that are in year three of the sustainment program, or have not had their year three study billed.
          </h4>
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