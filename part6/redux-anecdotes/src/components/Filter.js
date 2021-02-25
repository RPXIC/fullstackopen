import React from 'react'
import { filterQuery } from '../reducers/filterReduceer'
import { connect } from 'react-redux'

const Filter = props => {
  const handleChange = e => {
    props.filterQuery(e.target.value)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterQuery,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter
