import React, { Component } from 'react'
import ReserveItem from '../../components/ReserveItem'
import './ItemsNeeded.css'


class ItemsNeeded extends Component {
  state = { studies: [] }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
      const ItemsNeededList = this.context.studies.filter(study => {
        study.csa === false ||
        study.scope === false ||
        study.retainer === false ||
        study.ccrs === false ||
        study.questionnaire === false ||
        study.budget === false ||
        study.site_plan === false ||
        study.reserve_study === false ||
        study.annual_review === false ||
        study.income_statement === false ||
        study.balance_sheet === false
      })
      this.setState({ 
          studies: ItemsNeededList
      })
  }

  render() {
    return (
      <div className='ItemsNeeded'>
          <ul>
          {this.state.studies.length && this.state.studies.map(study => {
              return (
                  <ReserveItem key={study.rsId} {...study}/>
              )
          })}
          </ul>
      </div>
    )
  }
}

export default ItemsNeeded