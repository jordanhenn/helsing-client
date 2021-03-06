import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem/ReserveItem'
import ReserveNav from '../../components/ReserveNav/ReserveNav'
import HelsingContext from '../../contexts/HelsingContext'
import './ItemsNeeded.css'


class ItemsNeeded extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  static contextType = HelsingContext

  componentDidMount() {
      const ItemsNeededList = this.context.studies.filter(study => {
        if(study.csa === false ||
        study.scope === false ||
        study.retainer === false ||
        study.ccrs === false ||
        study.questionnaire === false ||
        study.budget === false ||
        study.site_plan === false ||
        study.reserve_study === false ||
        study.annual_review === false ||
        study.income_statement === false ||
        study.balance_sheet === false) {
          return study
        }
      })

      if (this.context.searchQuery.length) {
        const FilteredItemsNeededList = ItemsNeededList.filter(study => {
          if(study.association.toLowerCase().includes(this.context.searchQuery.toLowerCase()) ||
          study.client_number.includes(this.context.searchQuery)) {
            return study
          }
        })
        this.setState({
          studies: FilteredItemsNeededList
        })
      }

      if(!this.context.searchQuery.length) {
      this.setState({ 
          studies: ItemsNeededList
      })
    }
  }

  render() {
    return (
      <div className='ItemsNeeded'>
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

export default ItemsNeeded