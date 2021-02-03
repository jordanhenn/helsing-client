import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem'
import ReserveNav from '../../components/ReserveNav'
import HelsingContext from '../../contexts/HelsingContext'
import './DraftBilled.css'


class DraftBilled extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  static contextType = HelsingContext

  componentDidMount() {
      const DraftBilledList = this.context.studies.filter(study => {
        study.draft_billed_date !== null &&
        study.final_billed_date === null
      })

      if (this.context.searchQuery.length) {
        const FilteredDraftBilledList = DraftBilledList.filter(study => {
          study.association.toLowerCase().includes(this.context.searchQuery.toLowerCase()) ||
          study.client_number.includes(this.context.searchQuery)
        })
        this.setState({
          studies: FilteredDraftBilledList
        })
      }

      if(!this.context.searchQuery.length) {
      this.setState({ 
          studies: DraftBilledList
      })
    }
  }

  render() {
    return (
      <div className='DraftBilled'>
        <ReserveNav/>
          <ul>
          {this.state.studies.length && this.state.studies.map(study => {
              return (
                  <ReserveItem key={study.rs_id} {...study}/>
              )
          })}
          </ul>
      </div>
    )
  }
}

export default DraftBilled