import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return notification.text ? <div style={style}>{notification.text}</div> : null
}

export default Notification
