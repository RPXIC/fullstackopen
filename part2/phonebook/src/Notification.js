const Notification = ({msg, setMsg}) => {
	setTimeout(() => setMsg(null), 5000)

	return <h1 className={msg.type}>{msg.text}</h1>
}

export default Notification
