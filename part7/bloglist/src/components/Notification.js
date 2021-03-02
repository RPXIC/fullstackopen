import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return notification.text ? (
    <p className={notification.type}>{notification.text}</p>
  ) : null
}

export default Notification
