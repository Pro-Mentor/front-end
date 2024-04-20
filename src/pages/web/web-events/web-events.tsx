import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const WebEvents = () => {
	const navigate = useNavigate()

	return (
		<div className="page events-page">
			<Button className="create-btn" onClick={() => navigate('/create-event')}>
				Create Event
			</Button>
		</div>
	)
}

export default WebEvents
