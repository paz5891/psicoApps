import React from 'react'
import './Search.scss'

const Search = ({handleSearch, title}) => {
  return (
    <section className="">
      <input 
        className="search-input" 
        type="search" 
        placeholder={title}
        onChange={handleSearch} 
      />
    </section>
  )
}

export default Search