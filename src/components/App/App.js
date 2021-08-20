import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import HelsingContext from '../../contexts/HelsingContext'
import HelsingAPIService from '../../services/HelsingAPIService'
import SearchBar from '../SearchBar/SearchBar'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import LandingPage from '../../routes/LandingPage/LandingPage'
import ReserveItemPage from '../../routes/ReserveItemPage/ReserveItemPage'
import ItemsNeeded from '../../routes/ItemsNeeded/ItemsNeeded'
import Unassigned from '../../routes/Unassigned/Unassigned'
import Active from '../../routes/Active/Active'
import DraftBilled from '../../routes/DraftBilled/DraftBilled'
import Completed from '../../routes/Completed/Completed'
import AddReserveStudy from '../../routes/AddReserveStudy/AddReserveStudy'
import SustainmentItemPage from '../../routes/SustainmentItemPage/SustainmentItemPage'
import SustainmentYearOne from '../../routes/SustainmentYearOne/SustainmentYearOne'
import SustainmentYearTwo from '../../routes/SustainmentYearTwo/SustainmentYearTwo'
import SustainmentYearThree from '../../routes/SustainmentYearThree/SustainmentYearThree'
import SustainmentCompleted from '../../routes/SustainmentCompleted/SustainmentCompleted'
import AddSustainment from'../../routes/AddSustainment/AddSustainment'
import AddTM from '../../routes/AddTM/AddTM'
import AddEmployee from '../../routes/AddEmployee/AddEmployee'
import TMItemPage from '../../routes/TMItemPage/TMItemPage'
import TMQueue from '../../routes/TMQueue/TMQueue'
import TMCompleted from '../../routes/TMCompleted/TMCompleted'
import CreateReimbursable from '../../routes/CreateReimbursable/CreateReimbursable'
import MainNav from '../../components/MainNav/MainNav'
import './App.css'


class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  static contextType = HelsingContext
  
  componentDidMount() {
    HelsingAPIService.getAllStudies()
      .then(studies => {
        this.context.setStudies(studies)
      })

    HelsingAPIService.getAllSustainment()
      .then(sustainment => {
        this.context.setSustainment(sustainment)
      })

    HelsingAPIService.getAllTM()
      .then(timeAndMaterial => {
        this.context.setTimeAndMaterial(timeAndMaterial)
      })
  }

  render() {
    return (
      <div className='App'>
        <h1 className='no-mobile'>This app is not available on mobile devices.</h1>
        <div className='page'>
        <header className='App__header'>
          <div className='header-styling'>
          <div className='header-and-search'>
          <h1><Link style={{ textDecoration: 'none' }} to={'/'}>HG Job Tracker</Link></h1>
          <SearchBar/>
          </div>
          <MainNav/>
          </div>
        </header>
        <main className='App__main'>
          <div id="page-wrap">
          {this.state.hasError && <p className='red'>There was an error. Try reloading the page.</p>}
          <Switch>
            <Route
              exact
              path={'/'}
              component={LandingPage}
            />
            <Route
              path={'/reservestudies/itemsneeded'}
              component={ItemsNeeded}
            />
            <Route
              path={'/reservestudies/unassigned'}
              component={Unassigned}
            />
            <Route
              exact
              path={'/reservestudies/active'}
              component={Active}
            />
            <Route
              exact
              path={'/reservestudies/draftbilled'}
              component={DraftBilled}
            />
            <Route
              path={'/reservestudies/completed'}
              component={Completed}
            />
            <Route
              path={'/reservestudies/add'}
              component={AddReserveStudy}
            />
            <Route
              path={'/reservestudies/:reservestudyId'}
              component={ReserveItemPage}
            />
            <Route
              path={'/sustainment/year1'}
              component={SustainmentYearOne}
            />
            <Route
              path={'/sustainment/year2'}
              component={SustainmentYearTwo}
            />
            <Route
              path={'/sustainment/year3'}
              component={SustainmentYearThree}
            />
            <Route
              path={'/sustainment/complete'}
              component={SustainmentCompleted}
            />
            <Route
              path={'/sustainment/add'}
              component={AddSustainment}
            />
            <Route
              path={'/sustainment/:sustainmentId'}
              component={SustainmentItemPage}
            />
            <Route
              path={'/timeandmaterial/active'}
              component={TMQueue}
            />
            <Route
              path={'/timeandmaterial/completed'}
              component={TMCompleted}
            />
            <Route
              path={'/timeandmaterial/add'}
              component={AddTM}
            />
            <Route
              path={'/timeandmaterial/:tmId'}
              component={TMItemPage}
            />
            <Route
              path={'/employees'}
              component={AddEmployee}
            />
            <Route
              path={'/createreimbursable'}
              component={CreateReimbursable}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </div>
        </main>
        </div>
      </div>
    )
  }
}

export default App