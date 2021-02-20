import React from 'react'

const Message = ({ message, setMessage }) => {
  setTimeout(() => setMessage(null), 5000)
  return <p className={message.type}>{message.text}</p>
}

export default Message
