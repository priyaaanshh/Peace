import React from 'react'
import './searchBar.css'
import SearchIcon from '../../assets/svg/searchIcon'

const SearchBar = () => {
  return (
      <div className='searchbar-container'>
          <div className='searchbar'>
              <input placeholder='Search' className='searchbar-input' />
              <SearchIcon className='searchbar-icon'/>
          </div>
    </div>
  )
}

export default SearchBar