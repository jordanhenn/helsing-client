import React, { Component } from 'react'

const HelsingContext = React.createContext({
  searchQuery: '',
  studies: [],
  sustainment: [],
  timeAndMaterial: [],
  setSearchQuery: () => {},
  clearSearchQuery: () => {},
  setStudies: () => {},
  setSustainment: () => {},
  setTimeAndMaterial: () => {}
})

export default HelsingContext

export class HelsingProvider extends Component {
  constructor(props) {
    super(props);
    this.state = 
      props.testState || {
        searchQuery: '',
        studies: [],
        sustainment: [],
        timeAndMaterial: []
    }; 
  }

  setSearchQuery = searchQuery => {
    this.setState({ searchQuery })
  }

  clearSearchQuery = () => {
    this.setState({ searchQuery: null })
  }

  setStudies = studies => {
    this.setState({ studies })
  }

  setSustainment = sustainment => {
    this.setState({ sustainment })
  }

  setTimeAndMaterial = timeAndMaterial => {
    this.setState({ timeAndMaterial })
  }

  render() {
    const value = {
      searchQuery: this.state.searchQuery,
      studies: this.state.studies,
      sustainment: this.state.sustainment,
      timeAndMaterial: this.state.timeAndMaterial,
      setSearchQuery: this.setSearchQuery,
      clearSearchQuery: this.clearSearchQuery,
      setStudies: this.setStudies,
      setSustainment: this.setSustainment,
      setTimeAndMaterial: this.setTimeAndMaterial
    }

    return (
      <HelsingContext.Provider value={value}>
        {this.props.children}
      </HelsingContext.Provider>
    )
  }
}