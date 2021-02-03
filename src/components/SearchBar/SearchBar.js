import React, { Component } from 'react'
import HelsingContext from '../../contexts/HelsingContext'
import './SearchBar.css'

class SearchBar extends Component {

static contextType = HelsingContext


componentWillUnmount() {
    this.context.clearSearchQuery()
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
                value={this.context.searchQuery}
                onChange={(e) => {this.context.setSearchQuery(e.target.value)}}
                type='text'
                id='search-bar'/>
        </form>
      </div>
    )
  }
}

export default SearchBar