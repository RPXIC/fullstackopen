import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleIsVisible } from 'reducers/isVisibleReducer'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const Togglable = ({ buttonLabel, children, element }) => {
  const isVisible = useSelector(state => state.isVisible[element])
  const dispatch = useDispatch()

  const hideWhenVisible = { display: isVisible ? 'none' : '' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant='success'
          onClick={() => dispatch(toggleIsVisible(element))}>
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {children}
        <Button
          variant='warning'
          onClick={() => dispatch(toggleIsVisible(element))}>
          cancel
        </Button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Togglable'

export default Togglable
