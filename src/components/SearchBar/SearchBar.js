import React, { Component } from 'react'
import HelsingContext from '../../contexts/HelsingContext'
import './SearchBar.css'

class SearchBar extends Component {

state = {
  searchQuery: ''
  }
static contextType = HelsingContext

setSearchQuery = (searchQuery) => {
  this.context.setSearchQuery(searchQuery)
  this.setState({searchQuery})
}


componentWillUnmount() {
    this.setState({searchQuery: ''})
    this.context.clearSearchQuery()
}

componentDidMount() {
  this.context.setSearchQuery(this.state.searchQuery)
}
  render() {
    return (
        <div>
        <form>
          <label htmlFor='search-bar'>
                Search
              </label>
           <input
                className='search-bar'
                value={this.state.searchQuery}
                onChange={(e) => this.setSearchQuery(e.target.value)}
                type='text'
                id='search-bar'/>
        </form>
      </div>
    )
  }
}

export default SearchBar