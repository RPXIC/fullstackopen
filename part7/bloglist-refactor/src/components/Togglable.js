import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleIsVisible } from 'reducers/isVisibleReducer'
import { useSelector } from 'react-redux'

const Togglable = ({ buttonLabel, children, element }) => {
  const isVisible = useSelector(state => state.isVisible[element])
  const dispatch = useDispatch()

  const hideWhenVisible = { display: isVisible ? 'none' : '' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          data-cy='togglable-button-show'
          onClick={() => dispatch(toggleIsVisible(element))}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {children}
        <button
          data-cy='togglable-button-hide'
          onClick={() => dispatch(toggleIsVisible(element))}>
          cancel
        </button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Togglable'

export default Togglable
