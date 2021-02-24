const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.query

    default:
      return state
  }
}

export const filterQuery = query => {
  return {
    type: 'FILTER',
    query,
  }
}

export default filterReducer
